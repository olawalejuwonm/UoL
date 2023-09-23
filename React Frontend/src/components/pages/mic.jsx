import { useState } from "react";
import React from "react";
import FirstNav from "../FirstNav";
import SecNav from "../SecNav";
import { FaSearch } from "react-icons/fa";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronDoubleLeft } from "react-icons/bs";

const ChatPage = () => {
	const [selectedUser, setSelectedUser] = useState(null);

	let navigate = useNavigate(),
		{ chatId } = useParams();
	// Function to handle user card click
	const handleUserClick = user => {
		setSelectedUser(user);
		navigate("/chat/chat-section");
	};

	const userData = [
		{
			id: 1,
			name: "Semuel Peace",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				// if more messages as needed
			],
		},
		{
			id: 2,
			name: "Semuel Lara",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				// if more messages as needed
			],
		},
		{
			id: 3,
			name: "Joe Peace",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				// if more messages as needed
			],
		},
		{
			id: 4,
			name: "Semuel Peace",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				// if more messages as needed
			],
		},
		{
			id: 5,
			name: "Semuel Peace",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				//if more messages as needed
			],
		},
		{
			id: 6,
			name: "Semuel Peace",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				// if more messages as needed
			],
		},
		{
			id: 7,
			name: "Semuel Peace",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				//if more messages as needed
			],
		},
		{
			id: 8,
			name: "Semuel Peace",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				//if more messages as needed
			],
		},
		{
			id: 9,
			name: "Semuel Peace",
			image:
				"https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg",
			lastMessage: "Good morning, sir......",
			timestamp: "2023-09-14T12:30:00", // UTC timestamp
			messages: [
				{ text: " ", timestamp: "2023-09-14T12:30:00" },
				//if more messages as needed
			],
		},
	];



	return (
		<div>
			<div>
				<FirstNav />
				<SecNav />
			</div>

			<div className="bg-beentoslightblue mx-auto relative text-bestoswhite h-full py-10 lg:px-16 md:px-16 px-7 min-h-full">
				<div className=" w-full absolute text-black mx-auto p-10 flex">
					<div
						className={` bg-gray-300 grid h-screen  ${chatId ? "hidden md:block md:w-2/5" : "w-full md:w-2/5"
							}`}>
						<div className=" card shadow-md flex justify-between text-bestosblue font-bold items-center p-3">
							<button className=" p-2 hover:text-bestosyellow">CHAT</button>

							<div className="flex justify-center items-center p-2 hover:text-bestosyellow space-x-1">
								{/* <FaSearch /> */}
								<input type="text" className='w-[300px] px-4 py-1.5 rounded-md' placeholder="search" />
							</div>
						</div>
						{/* List of users */}
						<div className=" bg-bestoswhite text-bestosblue h-screen p-3 overflow-y-auto">
							<div className="h-auto cursor-pointer  ">
								{userData.map(user => (
									<div
										key={user.id}
										className="shadow-sm p-4 flex flex-col"
										onClick={() => handleUserClick(user)}>
										<div className="flex items-center space-x-4">
											<div>
												<img
													src={user.image}
													alt={user.name}
													className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
												/>
											</div>

											<div className=" grid">
												<h2 className="text-lg font-semibold">{user.name}</h2>
												<p className="text-gray-600 text-sm mb-2">
													{user.lastMessage}
												</p>
												<small className="text-gray-400 text-xs">
													{moment(user.timestamp).format("hh:mm A")}{" "}
												</small>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					{chatId ? (
						<>
							<MainChatSection selectedUser={selectedUser} />
						</>
					) : (
						<div className=" overflow-y-auto hidden md:block w-3/5 bg-beentoslightblue"></div>
					)}
				</div>
			</div>
		</div>
	);
};

//  Users detail when clicking on any user to chart with.
const UserDetail = ({ user }) => {

	const chats = [

		{
			first: [{ text: 'Hi there!', time: '3:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},

		{
			first: [{ text: 'Hi there!', time: '4:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},
		{
			first: [{ text: 'Hi there!', time: '3:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},

		{
			first: [{ text: 'Hi there!', time: '4:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},
		{
			first: [{ text: 'Hi there!', time: '3:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},

		{
			first: [{ text: 'Hi there!', time: '4:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},
		{
			first: [{ text: 'Hi there!', time: '3:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},

		{
			first: [{ text: 'Hi there!', time: '4:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},
		{
			first: [{ text: 'Hi there!', time: '3:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},

		{
			first: [{ text: 'Hi there!', time: '4:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},
		{
			first: [{ text: 'Hi there!', time: '3:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},

		{
			first: [{ text: 'Hi there!', time: '4:04pm' }],
			second: [{ text: 'Hello there!', time: '5:04pm' }]
		},


	]
	const [messageInput, setMessageInput] = useState("");
	let navigate = useNavigate(),
		{ chatId } = useParams();

	const handleSendMessage = e => {
		e.preventDefault();
		if (messageInput.trim() !== "") {
			// Create a new message object
			const newMessage = {
				text: messageInput,
				timestamp: new Date().toISOString(),
				sender: "user", // Assuming the user is the sender
			};

			// Update the user's messages array
			user.messages.push(newMessage);

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
						src={user.image}
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
				{user?.messages.map((message, index) => (
					<div
						key={index}
						className={`mb-2 ${message?.sender === "user" ? "text-right" : "text-left"
							}`}>
						{/* <div className="bg-blue-200 p-2 rounded-md inline-block">
							{message?.text}

							<small className="text-xs block">
								{moment(message?.timestamp).format("hh:mm A")}
							</small>
						</div> */}

						{
							chats.map((c, index) => {
								const firstMap = c.first.map((f) => (
									<div key={index}>
										<div className="bg-gray-300 px-7 py-2 mb-2 rounded-tr-3xl rounded-bl-xl">
											<p className="text-sm font-medium">{f.text}</p>
										</div>
										<p className="text-xs text-white text-end">{f.time}</p>
									</div>

								))
								const secondMap = c.second.map((s) => (
									<div key={index}>
										<div className="bg-gray-300 px-7 py-2 mb-2 rounded-bl-3xl rounded-tr-xl">
											<p className="text-sm font-medium">{s.text}</p>
										</div>
										<p className="text-xs text-white text-end">{s.time}</p>
									</div>

								))

								return (
									<div key={index} className="mt-4 px-4">
										<div className="mb-4 w-fit">
											{firstMap}
										</div>
										<div className="ml-auto w-fit">
											{secondMap}
										</div>
									</div>
								)
							})
						}


					</div>
				))}
			</div>

			{/* the user text input and send button */}
			{/* <div className="mt-4   top-0 left-0 h-auto  fixed bg-red-600 w-full flex justify-between items-center bottom-[-80px] "> */}
			<form className="w-full mx-auto right-5 md:right-10 bottom-1 flex gap-4  z-10 px-8">
				<input
					type="text"
					placeholder="Type your message?..."
					value={messageInput}
					onChange={e => setMessageInput(e.target.value)}
					className="border rounded-md p-2 w-full max-h-32 overflow-y-auto"
					style={{ wordWrap: "break-word" }}
				/>

				<button
					onClick={handleSendMessage}
					className="bg-blue-500 text-white p-2 w-3/12 rounded-md border-bestoswhite outline-none">
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
