import React from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { api, fetchProfile, handleForm, onSuccess } from "../redux/thunks";
import { useSelector } from "react-redux";

const SignIn = () => {
  const navigate = useNavigate();
  const login = useSelector((s) => s?.user?.loggedIn);

  React.useEffect(() => {
    console.log("login", login);
    if (login) {
      const thePath = localStorage.getItem("path");
      if (thePath) {
        localStorage.removeItem("path");
        navigate(thePath, { replace: true });
      } else {
        navigate("/homepage", { replace: true });
      }
    }
  }, [login, navigate]);

  return (
    <div className=" flex h-screen justify-center items-center">
      <div className=" flex ">
        {/* Account container */}
        <div className=" w-1/2 bg-bestosblue p-10 grid justify-center">
          <div className="w-[400px] h-auto space-y-5">
            <p className=" text-center text-bestoswhite text-[24px] font-bold">
              {" "}
              SIGN IN
            </p>
            <form
              action=""
              className=" grid justify-center items-center space-y-3"
              onSubmit={(e) =>
                onSuccess(api("POST", "user/login/", handleForm(e)), (data) => {
                  fetchProfile(true);
                  // window.location.href = "/homepage";
                  const r = data["data"];
                  console.log("data", r);
                  localStorage.setItem("token", r["token"]);
                  navigate("/homepage");
                })
              }
            >
              <div className="flex justify-center items-center relative right-[-8px] ">
                <FaRegUser className=" relative z-20 text-bestoswhite right-[-5px]" />
                <input
                  className=" bg-gray-300 outline-none px-7 py-3 relative left-[-17px] "
                  placeholder="Username"
                  name="username"
                  type="text"
                />
              </div>

              <div className="flex justify-center items-center relative right-[-8px] ">
                <RiLockPasswordLine className=" relative z-20 text-bestoswhite right-[-5px]" />
                <input
                  className="bg-gray-300 outline-none px-7 py-3 relative left-[-17px]"
                  placeholder="Password"
                  name="password"
                  type="text"
                />
              </div>

              <div className="flex items-center justify-center px-2 pt-5 space-x-7">
                <button
                  type="submit"
                  className=" px-5 py-1  bg-bestoswhite hover:bg-bestosyellow hover:text-bestoswhite transition-transform duration-500 transform hover:scale-105 rounded-3xl font-bold text-bestosblue "
                >
                  SIGN IN{" "}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* image container */}
        <div className=" w-1/2 bg-bestosyellow">
          <div
            className="flex
           justify-center items-center h-full"
          >
            <img
              className="w-[200px] h-[300px]"
              src="https://cdn.wallpapersafari.com/91/6/3NHvze.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
