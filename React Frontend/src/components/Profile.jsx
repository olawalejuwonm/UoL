import React  from "react";
// import Axios from "axios";
import Modal from "./Modal";
import { GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = ({ closeModal, isShow, title, data }) => {

  const close = () => {
    closeModal();
  };

  const store = useSelector((state) => state?.store);

  return (
    <Modal isShow={isShow}>
      <div className={`bg-white rounded-lg w-[350px] px-6`}>
        <div className={`justify-between py-2 flex mb-4`}>
          <span
            className={` block text-black text-xl capitalize font-semibold`}
          >
            {title}
          </span>
          <Link
            to={""}
            onClick={close}
            className="link-round sm bg-brand-lpurple text-purple"
          >
            <GrFormClose className="text-2xl" />
          </Link>
        </div>

        <div className=" mb-8 flex items-center w-full">
          <div
            className="w-[80px] h-[80px] rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dybryo15k/image/upload/v1692797963/cld-sample.jpg"`,
            }}
          ></div>

          <div className="pl-4">
            <p className="text-lg">Name: {store?.user?.name}</p>
            <p className="text-lg">Username: {store?.user?.username}</p>
          </div>
        </div>

        <div className="flex justify-center rounded-xl mb-7 cursor-pointer">
          <Link
            to=""
            onClick={() => {}}
            className="flex items-center bg-beentoslightblue border-0 py-2 justify-center rounded-md text-white px-5 w-6/12"
          >
            Close
          </Link>
          <div className="mx-1"></div>
        </div>
      </div>
    </Modal>
  );
};

export default Profile;
