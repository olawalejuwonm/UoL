import React, { useEffect } from "react";
// import Axios from "axios";
import Modal from "./Modal";
import { GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { api, fetchProfile, handleForm } from "../redux/thunks";

const EditProfile = ({ closeModal, isShow, title, data }) => {
  // useEffect(() => {}, []);
  const store = useSelector((state) => state?.store);
  console.log(store?.user?.avatar, "avatar", store.user);
  const close = () => {
    closeModal();
  };

  return (
    <Modal isShow={isShow}>
      <div className={`bg-white rounded-lg w-[430px] pt-2 px-6`}>
        <div className={`justify-between py-2 flex mb-4`}>
          <span
            className={` block text-black text-xl capitalize font-semibold`}
          >
            {title}
          </span>
          <Link
            to=""
            onClick={close}
            className="link-round sm bg-brand-lpurple text-purple"
          >
            <GrFormClose className="text-2xl" />
          </Link>
        </div>

        <form
          onSubmit={(e) => {
            api("PUT", "user/profile/", handleForm(e));
            fetchProfile(true);
          }}
          className=" mb-12 flex flex-col items-center w-full px-6"
        >
          <div className="mb-6">
            <div
              className=" w-[80px] h-[80px] rounded-full bg-cover bg-center"
              style={{
                // backgroundImage: `url("https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg"`,
                backgroundImage: `url(${
                  store?.user?.avatar ||
                  "https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg"
                })`,
              }}
            ></div>
          </div>

          <div className=" w-full">
            <div className="flex justify-between w-full">
              <label htmlFor="name" className="text-md block pr-3">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="border-b outline-none border-slate-200 w-[230px]"
              />
            </div>

            <div className="mt-3 flex justify-between w-full">
              <label htmlFor="name" className="text-md  pr-3">
                Username:
              </label>
              <input
                type="text"
                name="username"
                className="border-b outline-none border-slate-200  w-[230px]"
              />
            </div>

            <div className=" mt-3 flex justify-between w-full">
              <label htmlFor="name" className="text-md mb-2">
                Photo:
              </label>
              <input type="file" name="avatar" className=" py-1  w-[230px]" />
            </div>
          </div>
          <div className="flex justify-center rounded-xl mb-7 cursor-pointer">
            <button
              type="submit"
              className="flex items-center bg-beentoslightblue border-0 py-2 justify-center rounded-md text-white px-5 w-6/12"
            >
              Update
            </button>
            <div className="mx-5"></div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfile;
