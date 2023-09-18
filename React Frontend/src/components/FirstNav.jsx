import React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import { api } from "../redux/thunks";
import { signOut } from "../redux/ActionCreators";

const FirstNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = useSelector((state) => state.user?.user);
  // const store = useSelector(state => state?.store);
  const [showProfile, setShowProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleViewProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <>
      <div className=" mx-auto">
        <nav className=" flex z-20 lg:justify-between justify-between fixed top-0 left-0 right-0 h-16 items-center lg:px-16 md:px-16 px-7 bg-bestosblue text-bestoswhite ">
          {/* Company Name */}
          <div>
            <p className="lg:text-[24px] md:text-[12px] text-[12px ]font-bold">
              Social
            </p>
          </div>

          {/* Notification & Profile */}
          <div className=" flex justify-center space-x-10 items-center">
            {isDropdownOpen && (
              <div
                className={`overflow-hidden relative top-40 lg:right-[-320px] md:right-[-220px] right-[-200px] bg-bestosblue lg:w-52 w-32 text-bestoswhite transition-max-height duration-300 ${
                  isDropdownOpen ? "max-h-40" : "max-h-0"
                } `}
              >
                <Link
                  onClick={() => toggleEditProfile()}
                  to=""
                  className="block w-full px-4 py-2 text-left p-3"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => toggleViewProfile()}
                  to=""
                  className="block w-full px-4 py-2 text-left p-3"
                >
                  Profile
                </Link>
                <button
                  to=""
                  onClick={() => {
                    api("POST", "user/logout/");
                    signOut(true);
                    window.location.href = "/";
                  }}
                  className="block text-bestosyellow font-bold w-full px-4 py-2 text-left p-3"
                >
                  Sign Out
                </button>
              </div>
            )}

            <div className=" flex space-x-3 justify-center items-center">
              <img
                className=" w-8 h-8 rounded-3xl"
                src={
                  user?.avatar ||
                  "https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg"
                }
                alt=""
              />

              <div
                className=" users flex justify-center items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                <div>{user?.name || user?.usernmae}</div>
                <IoIosArrowDown
                  className={`mt-2 transition-transform transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Profile
        title="User Profile"
        isShow={showProfile}
        closeModal={toggleViewProfile}
        // data={participantData}
      />

      <EditProfile
        title="Update Profile"
        isShow={editProfile}
        closeModal={toggleEditProfile}
        // data={participantData}
      />
    </>
  );
};

export default FirstNav;
