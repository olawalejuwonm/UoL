import { useEffect, useRef, useState } from "react";
import React from "react";
import FirstNav from "../FirstNav";
import SecNav from "../SecNav";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { WebSocketLink, api, fetchFriends, loadPage } from "../../redux/thunks";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  let navigate = useNavigate(),
    { chatId } = useParams();
  // Function to handle user card click
  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate("/chat/chat-section");
  };

  const [userData, setUserData] = useState([]);

  const store = useSelector((state) => state.store);

  React.useEffect(() => {
    try {
      setUserData(
        (store?.friends || [])?.filter((u) => u?.friend?.id !== store?.user?.id)
      );
    } catch (error) {
      console.log("error", error);
    }
  }, [store?.friends, store?.user?.id]);

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div>
      <div>
        <FirstNav />
        <SecNav />
      </div>
      <div className="bg-beentoslightblue mx-auto relative text-bestoswhite h-full py-10 lg:px-16 md:px-16 px-7 min-h-full">
        <div className=" w-full absolute text-black mx-auto p-10 flex">
          <div
            className={` bg-gray-300 grid h-screen  ${
              chatId ? "hidden md:block md:w-2/5" : "w-full md:w-2/5"
            }`}
          >
            <div className=" card shadow-md flex justify-between text-bestosblue font-bold items-center p-3">
              <button className=" p-2 hover:text-bestosyellow">CHAT</button>

              <div className="flex justify-center items-center p-2 hover:text-bestosyellow space-x-1">
                {/* <FaSearch /> */}
                <input
                  type="text"
                  className="w-[300px] px-4 py-1.5 rounded-md"
                  placeholder="search"
                />
              </div>
            </div>
            {/* List of users */}
            <div
              className="bg-bestoswhite text-bestosblue h-screen p-3 overflow-y-auto pb-28"
              style={{
                // make the content scrollable
                overflowY: "auto",
                // make it responsive to display all it's content
                whiteSpace: "nowrap",
              }}
            >
              <div className="h-auto cursor-pointer">
                {userData.map((f) => {
                  const user = f?.friend;
                  return (
                    <div
                      key={user.id}
                      className="shadow-sm p-4 flex flex-col"
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                          />
                        </div>

                        <div className="grid">
                          <h2 className="text-lg font-semibold">{user.name}</h2>
                          <p className="text-gray-600 text-sm mb-2">
                            {user.lastMessage}
                          </p>
                          <small className="text-gray-400 text-xs">
                            {moment(f.created_at).format("hh:mm A")}{" "}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {chatId ? (
            <>
              <MainChatSection selectedUser={selectedUser} />
            </>
          ) : (
            <div
              className=" overflow-y-auto hidden md:block w-3/5 bg-beentoslightblue"
              style={{
                color: "#fff",
                fontSize: "24px",
                // align text to center
                textAlign: "center",
                // Align to center vertically
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Click on any user to start a chat
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const constructMessage = (messages, userId) => {
  const myMessages = [];
  const otherMessages = [];
  // try {
  //   (messages || []).forEach((message) => {
  //     if (message.sender === userId) {
  //       myMessages.push(message);
  //     } else {
  //       otherMessages.push(message);
  //     }
  //   });
  // } catch (error) {
  //   console.log("error", error);
  // }
  return { myMessages, otherMessages, messages: messages || [] };
};

const connectSocket = (user_id, friend, composeMessage, onConnect) => {
  const newSocket = new WebSocket(
    `${WebSocketLink}/ws/chat/${user_id}/${friend.id}/`
  );

  newSocket.addEventListener("open", () => {
    console.log("connected", newSocket);
    if (onConnect) {
      onConnect(newSocket);
    }
    toast.info(`Connected to ${friend.name} realtime chat`);
  });

  newSocket.addEventListener("message", (event) => {
    console.log("event", event);
    composeMessage();
    // const message = JSON.parse(event.data);
    // setMessages((prevMessages) => [...prevMessages, message]);
  });

  newSocket.addEventListener("close", () => {
    console.log("disconnected");
    // toast.info(`Disconnected from ${user.name} realtime chat`);
    // socketRef.current = null;
  });
};

const fetchChatMessages = async (friendId) => {
  const response = await api("GET", `chat/messages/?friend_id=${friendId}`, {
    showMsg: false,
  });
  if (response?.success) {
    console.log("response", response);
    return response?.data?.data;
  }
  return [];
};

//  Users detail when clicking on any user to chart with.
const UserDetail = ({ user }) => {
  const [messageInput, setMessageInput] = useState("");
  const [secondMap, setSecondMap] = useState([]);
  let navigate = useNavigate(),
    { chatId } = useParams();

  const store = useSelector((state) => state.store);

  console.log("user_id", user.id);

  const socketRef = useRef(null);

  const composeMessage = () => {
    loadPage(true);
    fetchChatMessages(user.id)
      .then((data) => {
        const theMessages = constructMessage(data, store?.user?.id);
        // setMyMessages(theMessages.myMessages);
        // setOtherMessages(theMessages.otherMessages);

        const messages = theMessages.messages.map((m) => {
          if (m.sender === store?.user?.id) {
            console.log("firstMap", m);
            return (
              <div className="ml-auto w-fit">
                <div className="bg-gray-300 px-7 py-2 mb-2 rounded-tr-3xl rounded-bl-xl">
                  <p className="text-sm font-medium">{m.message}</p>
                  <p className="text-xs text-white text-end">
                    {moment(m.created_at).format("hh:mm A")}{" "}
                  </p>
                </div>
              </div>
            );
          }
          console.log("secondMap", m);
          return (
            <div className="mb-4 w-fit">
              <div className="bg-gray-300 px-7 py-2 mb-2 rounded-bl-3xl rounded-tr-xl">
                <p className="text-sm font-medium">{m.message} </p>
                <p className="text-xs text-white text-end">
                  {moment(m.created_at).format("hh:mm A")}{" "}
                </p>
              </div>
            </div>
          );
        });

        setSecondMap(messages);
        loadPage(false);
      })
      .catch((err) => {
        loadPage(false);
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${store?.user?.id}/${user.id}/`
      );

      socketRef.current.addEventListener("open", () => {
        console.log("connected");
        toast.info(`Connected to ${user.name} realtime chat`);
      });

      socketRef.current.addEventListener("message", (event) => {
        console.log("event", event);
        composeMessage();
        // const message = JSON.parse(event.data);
        // setMessages((prevMessages) => [...prevMessages, message]);
      });

      socketRef.current.addEventListener("close", () => {
        console.log("disconnected");
        // toast.info(`Disconnected from ${user.name} realtime chat`);
        socketRef.current = null;
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [user.id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      // Create a new message object
      const message = {
        message: messageInput,
        sender_id: store?.user?.id,
      };
      console.log("messageInput", messageInput, socketRef.current);
      if (!socketRef.current) {
        connectSocket(store?.user?.id, user, composeMessage, (socket) => {
          socket.send(JSON.stringify(message));
        });
      }

      socketRef.current?.send(JSON.stringify(message));

      // Update the user's messages array
      //   user.messages.push(newMessage);

      // Clear the message input field
      setMessageInput("");
    }
  };

  return (
    <div className="grid">
      <div className=" bg-bestoswhite text-bestosblue font-bold  border rounded-sm p-2 md:p-4 shadow-md flex space-x-4 items-center">
        {chatId && (
          <BsChevronDoubleLeft
            onClick={() => navigate(-1)}
            className="md:hidden"
          />
        )}
        <div>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="my-4">
          <h2 className="text-xl font-semibold">{user.name}</h2>
        </div>
      </div>

      {/* the user recive and send messages */}

      <div className="flex-grow h-auto px-2">
        {/* {(messages || []).map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message?.sender === "user" ? "text-right" : "text-left"
            }`}
          > */}
        {/* <div className="bg-blue-200 p-2 rounded-md inline-block">
							{message?.text}

							<small className="text-xs block">
								{moment(message?.timestamp).format("hh:mm A")}
							</small>
						</div> */}

        <div className="mt-4 px-4">
          {/* <div className="mb-4 w-fit">{firstMap}</div> */}
          {/* <div className="ml-auto w-fit">{secondMap}</div> */}
          {secondMap}
        </div>
        {/* <div className="mt-4 px-4">
          <div className="mb-4 w-fit">{firstMap}</div>
          <div className="ml-auto w-fit">{secondMap}</div>
        </div> */}
        {/* </div>
        ))} */}
      </div>

      {/* the user text input and send button */}
      {/* <div className="mt-4   top-0 left-0 h-auto  fixed bg-red-600 w-full flex justify-between items-center bottom-[-80px] "> */}
      <form className="w-[90%] md:w-[55%] mx-auto right-5 md:right-10 bottom-1 flex gap-4 fixed z-10 px-2">
        <input
          type="text"
          placeholder="Type your message?..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="border rounded-md p-2 w-8/12 max-h-32 overflow-y-auto"
          style={{ wordWrap: "break-word" }}
        />

        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 w-3/12 rounded-md border-bestoswhite outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;

export const MainChatSection = ({ selectedUser }) => {
  return (
    <>
      <div className=" overflow-y-auto w-full md:w-3/5 h-screen">
        <div className="w-full grid overflow-y-auto">
          <div className=" w-full">
            {selectedUser && <UserDetail user={selectedUser} />}
            {/* Render UserDetail if a user is selected */}
          </div>
        </div>
      </div>
    </>
  );
};
