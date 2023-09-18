import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShow, closeModal, children, className }) => {
  // const close = (e) => {
  //     e.preventDefault()
  //     closeModal()
  // }

  return ReactDOM.createPortal(
    <div
      className={`h-screen  inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center w-full z-9999 transition ease-in-out delay-300 duration-300  ${
        isShow === true ? "fixed" : "hidden"
      }`}
    >
      <div
        className={`absolute w-full flex justify-center z-9999 transition ease-in-out delay-150 duration-300 `}
      >
        {children}
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
};

export default Modal;
