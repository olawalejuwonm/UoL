import React, { useState, useEffect } from "react";
import FirstNav from "../FirstNav";
import SecNav from "../SecNav";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api, fetchFriends, onSuccess } from "../../redux/thunks";

const AddFriends = () => {
  const [friends, setFriends] = useState([]);
  // Sample array of friends with their information

  const store = useSelector((state) => state.store);

  // let dispatch = useDispatch();

  useEffect(() => {
    // dispatch(manageFriends("get"));
    console.log("store", store.friends);
    setFriends((store?.friends || []).filter((u) => u.id !== store?.user?.id));
  }, [store?.friends, store?.user?.id]);

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div>
      <FirstNav />
      <SecNav />

      <div className="bg-beentoslightblue mx-auto text-bestoswhite h-full mt-[122px] py-10 lg:px-16 md:px-16 px-7 min-h-screen">
        <div className="">
          <div className="flex">
            <div className="font-bold text-3xl pr-8 py-1">Friends</div>
          </div>

          {/* <div className="mt-10 space-y-5"> */}
          {/* Display the friend list only when showFriendList is true */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Map through the friends array and render each friend */}

            {friends.length > 0 &&
              friends.map((f, index) => {
                const friend = f?.friend;
                return (
                  <div
                    key={index}
                    className="friend-item my-5 space-y-4 shadow-sm p-3"
                  >
                    <div className=" flex items-center space-x-5">
                      <img
                        src={friend?.avatar}
                        alt={friend?.name}
                        className="profile-picture w-12 h-12 rounded-full object-cover"
                      />
                      <div className="friend-name font-bold text-[24px]">
                        {friend?.name}
                      </div>
                    </div>

                    {/* friends Button */}
                    <div className=" space-x-3 z-0">
                      <Link
                        to="/chat"
                        className=" bg-bestosblue z-0 rounded-md text-white font-bold w-28 hover:bg-bestosyellow hover:text-bestosblue  transition-transform duration-500 transform hover:scale-105 px-3 py-1"
                      >
                        Message
                      </Link>
                      {/* <button className=" bg-bestoswhite z-0 rounded-md text-bestosblue w-28 font-bold transition-transform duration-500 transform hover:scale-105 px-3 py-1">
												Remove
											</button> */}
                    </div>
                  </div>
                );
              })}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
