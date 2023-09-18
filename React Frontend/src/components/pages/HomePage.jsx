import React, { useEffect, useState } from "react";
import FirstNav from "../FirstNav";
import SecNav from "../SecNav";
import UpdateStatusModal from "./UpdateStatusModal";
import { useSelector } from "react-redux";
import moment from "moment";
import { fetchMyTimeline, fetchTimeline } from "../../redux/thunks";
// import { manageTimeline } from "../../redux/timelineReducer";

const HomePage = () => {

  const [cardData, setCardData] = useState([]);
  const [statusItems, setStatusItems] = useState([]);

  const store = useSelector((state) => state.store);

  useEffect(() => {
    console.log(store.mytimeline, "timeli");
    setCardData(store.timeline || []);
    setStatusItems(store.mytimeline || []);
  }, [store.timeline, store.mytimeline]);

  useEffect(() => {
    fetchMyTimeline();
    fetchTimeline();
  }, []);

  const [updateStatus, setUpdateStatus] = useState(false);
  // const [commentCounts, setCommentCounts] = useState(
  //   cardData.map((card) => card.commentCount)
  // );

  const handleUpdateStatus = () => {
    setUpdateStatus(!updateStatus);
  };

  // let dispatch = useDispatch();

  // useEffect(() => {
  // 	dispatch(manageTimeline("get"));
  // 	dispatch(manageTimeline("get", null, "/me"));
  // }, [dispatch]);

  return (
    <>
      <div>
        <FirstNav />
        <SecNav />
      </div>

      <div className="bg-beentoslightblue fixed top-0 w-full text-bestoswhite h-full pt-[122px] mx-auto lg:px-16 md:px-16 px-7 min-h-screen">
        <div className=" overflow-scroll overflow-x-hidden h-full pb-12 noScroll">
          <p className="font-bold text-[24px]">My Status</p>
          <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-5 py-4 noScroll">
            {/* Map through the status items */}
            {Array.isArray(statusItems) &&
              statusItems?.map((item) => (
                <div key={item.id} className="flex-shrink-0">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={item.media}
                    alt={item.user}
                  />
                  <p className="text-center">{item.text}</p>
                </div>
              ))}
          </div>

          {/* posts */}
          <div className="w-full mb-6">
            <button
              onClick={() => handleUpdateStatus()}
              className="text-black bg-white w-[200px] flex justify-center text-center  rounded-md font-bold ml-auto py-4 shadow-md"
            >
              Add Status
            </button>
          </div>
          <div className=" grid grid-cols-2 gap-5 bg-bestoswhite py-2 md:py-10 px-1 md:px-20">
            {Array.isArray(cardData) &&
              cardData?.map((card, index) => (
                <div
                  key={card.id}
                  className="card grid  bg-bestoswhite text-bestosblue shadow-md px-2 md:px-10 my-5 md:my-10 pb-3 md:pb-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <img
                        className="w-12 md:w-16 h-12 md:h-16 rounded-full object-cover"
                        src={card?.user?.avatar}
                        alt={`Profile of ${card?.user?.username}`}
                      />
                      <div className="grid">
                        <p className="font-bold my-0">
                          {card?.user?.name || card?.user?.username}
                        </p>
                        <small className="">
                          {/* {card.postDateTime} */}
                          {moment(card.created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </small>
                      </div>
                    </div>

                    {/* <div>
                    <BsThreeDotsVertical />
                  </div> */}
                  </div>
                  {/* Image or video */}
                  {card.media && (
                    <div className="grid py-3">
                      <img
                        className="w-full h-72 md:h-96 object-cover rounded shadow"
                        src={card.media}
                        alt="Posted media"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-5">
                    {/* Likes */}
                  </div>
                  {/* Comment Section */}
                  {card.text && (
                    <div className="flex justify-center items-center cursor-pointer">
                      {/* <AiOutlineComment className="font-bold text-3xl" /> */}
                      <span>{card.text}</span>
                      {/* <small>members comment</small> */}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <UpdateStatusModal
        title="Add Status"
        isShow={updateStatus}
        closeModal={handleUpdateStatus}
        // data={participantData}
      />
    </>
  );
};

export default HomePage;
