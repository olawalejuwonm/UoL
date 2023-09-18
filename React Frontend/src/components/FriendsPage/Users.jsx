import React, { useState, useEffect } from "react";
import FirstNav from "../FirstNav";
import SecNav from "../SecNav";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api, fetchUsers, onSuccess } from "../../redux/thunks";

const Users = () => {
  const [searchList, setSearchList] = useState([]);
  const store = useSelector((state) => state.store);
  console.log("store", store);

  // Sample array of friends with their information

  // let dispatch = useDispatch();

  useEffect(() => {
    // dispatch(manageFriends("get"));
    setSearchList((store?.users || []).filter((u) => u.id !== store?.user?.id));
  }, [store?.user?.id, store?.users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <FirstNav />
      <SecNav />

      <div className="bg-beentoslightblue mx-auto text-bestoswhite h-full mt-[122px] py-10 lg:px-16 md:px-16 px-7 min-h-screen">
        <div className="">
          <div className="flex">
            <div className="font-bold text-3xl pr-8 py-1">Users</div>
            <input
              onChange={(e) => {
                onSuccess(
                  api(
                    "GET",
                    "friends/search_users/?keyword=" + e.target.value,
                    {
                      load: false,
                      showMsg: false,
                    }
                  ),
                  (d) => {
                    setSearchList(d || []);
                  }
                );
              }}
              type="text"
              className="w-[400px] ml-auto rounded-md px-4 text-black text-lg"
              placeholder="Search user"
            />
          </div>

          <div className="mt-10 space-y-5">
            {/* Display the friend list only when showFriendList is true */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Map through the friends array and render each friend */}
              {(searchList.length > 0 || searchList.length === 0) &&
                searchList.map((s, index) => (
                  <div
                    key={index}
                    className="friend-item my-5 space-y-4 shadow-sm p-3"
                  >
                    <div className=" flex items-center space-x-5">
                      <img
                        src={s.avatar}
                        alt={s?.name || s?.username}
                        className="profile-picture w-12 h-12 rounded-full object-cover"
                      />
                      <div className="friend-name font-bold text-[24px]">
                        {s.name}
                      </div>
                    </div>

                    {/* friends Button */}
                    <button
                      onClick={() =>
                        api("POST", "friends/", {
                          friend: s.id,
                        })
                      }
                      className=" bg-bestosblue z-0 rounded-md text-white font-bold w-28 hover:bg-bestosyellow hover:text-bestosblue  transition-transform duration-500 transform hover:scale-105 px-3 py-1"
                    >
                      Add friend
                      {/* <button className=" bg-bestoswhite z-0 rounded-md text-bestosblue w-28 font-bold transition-transform duration-500 transform hover:scale-105 px-3 py-1">
												Remove
											</button> */}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
