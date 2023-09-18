import React from "react";
import { GoHomeFill } from "react-icons/go";
import { BsEnvelope } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { PiDropboxLogoThin } from "react-icons/pi";
import { BsChatDots } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";

export const SidebarData = [
	{
		title: "Home",
		path: "/homepage",
		icon: <GoHomeFill size={22} />,
		cName: "nav-text",
	},
	{
		title: "Chats",
		path: "/chat",
		icon: <BsChatDots size={22} />,
		cName: "nav-text",
	},
	{
		title: "Users",
		path: "/users",
		icon: <FaUserGroup size={22} />,
		cName: "nav-text",
	},
	{
		title: "Friends",
		path: "/friends",
		icon: <PiDropboxLogoThin size={22} />,
		cName: "nav-text",
	},
];
