import React from "react";
import { FaSearch } from "react-icons/fa";
import SideBar from "./sidebar/SideBar";
import { BsChatDots } from "react-icons/bs";

const SecNav = () => {
  return (
		<div className=" mt-16 z-20 mx-auto fixed right-0 left-[-50px] top-[-5px]">
			<nav className=" flex bg-transparent lg:px-16 md:px-16 px-7 justify-between items-center">
				<div className=""></div>
			</nav>
			<SideBar />
		</div>
	);
};

export default SecNav;
