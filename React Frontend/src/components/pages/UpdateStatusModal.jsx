import React, { useEffect, useState } from "react";
// import Axios from "axios";
import Modal from "../Modal";
import { GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  api,
  fetchMyTimeline,
  fetchTimeline,
  handleForm,
} from "../../redux/thunks";

const UpdateStatusModal = ({ closeModal, isShow, title, data }) => {
  useEffect(() => {}, []);

  const close = () => {
    closeModal();
  };

  let handleSubmit = async (e) => {
      // e?.preventDefault();
      // if (!media || !text) return;
      // setLoading(true);
      // await dispatch(manageTimeline("post", { media, text }));
      //   setLoading(false);
      closeModal();
      //   setSubmit(true);
      // const data = handleForm(e)
      // console.log(data, "data")

      api("POST", "timeline/", handleForm(e));
      fetchTimeline();
      fetchMyTimeline();
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
          onSubmit={handleSubmit}
          className=" mb-12 flex flex-col items-center w-full px-6"
        >
          <div className=" w-full">
            <div className="flex flex-col mb-5 w-full ">
              <label htmlFor="email" className=" text-slate-600 text-md text">
                {" "}
                Description
              </label>
              <textarea
                name="text"
                id=""
                cols="20"
                rows="3"
                required={true}
                placeholder=""
                className="border-gray-color border px-4 py-2 rounded-xl"
                defaultValue={""}
                // onChange={e => setText(e.target.value)}
              ></textarea>
            </div>

            <div className=" mt-3 flex flex-col w-full">
              <label htmlFor="name" className="text-md mb-2">
                Media:
              </label>
              <input
                title="Upload file"
                type="file"
                name="media"
                id="file"
                accept="image/*"
                required={true}
                className="cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                // onChange={e => setMedia(e.target.value)}
                // value={media}
              />
            </div>
            {/* <div className=" mt-3 flex flex-col w-full">
							<label htmlFor="name" className="text-md mb-2">
								Photo:
							</label>
							<input
								title="Upload file"
								type="file"
								name="file"
								id="file"
								className="cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
								accept="image/*,.pdf"
								onChange={handleChangeImage}
							/>
						</div> */}
          </div>
          <div className="flex justify-center rounded-xl mb-7 cursor-pointer">
          {/* <Link
						to=""
						onClick={() => {}}
						className="flex items-center bg-beentoslightblue border-0 py-2 justify-center rounded-md text-white px-5 w-6/12">
						Submit
					</Link> */}
          <Button
            // buttonType={"primary"}
            title={"Submit"}
            type="submit"
            width={
              "w-fit flex items-center bg-beentoslightblue border-0 py-2 justify-center rounded-md text-white px-5 w-6/12"
            }
          />
          <div className="mx-1"></div>
        </div>
        </form>

        
      </div>
    </Modal>
  );
};

export default UpdateStatusModal;

const BUTTON_TYPES = {
  primary: "bg-black text-white",
  primaryOutline: "border-2 border-[#2A72A8] text-main",
  secondary: "bg-[#F72585] text-white",
  tetiary: "border-2 border-main text-main",
};

export const Button = ({
  children,
  loading,
  buttonType,
  width,
  style,
  title,
  loadCss,
  disabled,
  icon,
  type,
  ...restProps
}) => {
  return (
    <div>
      <button
        type={type || "button"}
        disabled={loading || disabled}
        className={`text-sm p-2 px-8 rounded-lg flex items-center gap-2 ${
          width || "w-52"
        } ${style || ""} ${BUTTON_TYPES[buttonType]}`}
        {...restProps}
      >
        {icon && <span>{icon}</span>}
        {children}
        <span className={loading ? "me-2" : ""}>
          {loading ? "Loading..." : title || "submit"}
        </span>
      </button>
    </div>
  );
};
