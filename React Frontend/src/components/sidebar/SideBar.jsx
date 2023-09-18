import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

const SideBar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<div>
					<Link to="#" className="menu-bars">
						<FaBars
							onClick={showSidebar}
							className=" relative top-[-35px] right-[-80px] text-bestoswhite text"
						/>
					</Link>
				</div>
				<nav
					className={`${
						sidebar ? "translate-x-0" : "-translate-x-full"
					} fixed top-0 left-0 h-full w-56 bg-bestosblue text-bestoswhite transition-transform duration-300 ease-in-out transform z-50`}>
					<ul className="p-4" onClick={showSidebar}>
						<li className="mb-2">
							<Link
								to="#"
								className="text-bestoswhite hover:text-gray-300"
								onClick={showSidebar}>
								<AiOutlineClose size={20} />
							</Link>
						</li>
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={`mb-2 ${item.cName} py-3`}>
									<Link
										to={item.path}
										className="flex items-center text-bestoswhite hover:text-gray-300"
										onClick={showSidebar}>
										<span className="me-2">{item.icon}</span>
										{item.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
};

export default SideBar;
