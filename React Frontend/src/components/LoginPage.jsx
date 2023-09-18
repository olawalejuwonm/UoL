import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { api, handleForm, onSuccess } from "../redux/thunks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
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
    <div className=" flex h-screen justify-center items-center" >
      <div className=" flex ">
        {/* Account container */}
        <div className=" w-1/2 bg-bestosblue p-10 grid justify-center">
          <div className="w-[400px] h-auto space-y-5">
            <p className=" text-center text-bestoswhite text-[24px] font-bold">
              {" "}
              Create Account
            </p>
            <form
              action=""
              className=" grid justify-center items-center space-y-3"
              onSubmit={
                e => {
                  console.log("data", handleForm(e))
                  onSuccess(api("POST", "user/register/", handleForm(e)), () => {
                    // navigate to signin page
                    // window.location.href = "/signin"
                    navigate("/signin")
                  })
                }
              }
            >
              <div className="flex justify-center items-center relative right-[-8px] ">
                <FaRegUser className=" relative z-20 text-bestoswhite right-[-5px]" />
                <input
                  className=" bg-gray-300 outline-none px-7 py-3 relative left-[-17px] "
                  placeholder="Name"
                  name="name"
                  type="text"
                  required={true}
                />
              </div>
              <div className="flex justify-center items-center relative right-[-8px] ">
                <FaRegUser className=" relative z-20 text-bestoswhite right-[-5px]" />
                <input
                  className=" bg-gray-300 outline-none px-7 py-3 relative left-[-17px] "
                  placeholder="Username"
                  name="username"
                  type="text"
                  required={true}
                />
              </div>

              <div className="flex justify-center items-center relative right-[-8px]  ">
                <FaRegEnvelope className=" relative z-20 text-bestoswhite right-[-5px]" />
                <input
                  className="bg-gray-300 outline-none px-7 py-3 relative left-[-17px]"
                  placeholder="Email"
                  name="email"
                  type="text"
                  required={true}
                />
              </div>

              <div className="flex justify-center items-center relative right-[-8px] ">
                <RiLockPasswordLine className=" relative z-20 text-bestoswhite right-[-5px]" />
                <input
                  className="bg-gray-300 outline-none px-7 py-3 relative left-[-17px]"
                  placeholder="Password"
                  name="password"
                  type="text"
                  required={true}
                />
              </div>

              <div className="flex px-2 justify-center items-center pt-5 space-x-7">
                {/* <Link to="/signin"> */}
                  <button type="submit" className=" px-5 py-1 rounded-3xl transition-transform duration-500 transform hover:border-bestosyellow hover:text-bestoswhite  hover:bg-bestosyellow hover:scale-105  font-bold border-bestoswhite text-bestoswhite border-2 ">
                    SIGN UP
                  </button>
                {/* </Link> */}
              </div>
            </form>

            <div className="flex justify-center items-center text-bestoswhite space-x-2">
              <p>Already have an account ? </p>
              <Link
                to="/signin"
                className=" text-bestosyellow font-bold hover:text-bestoswhite"
              >
                Sign In
              </Link>
            </div>
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

export default LoginPage;
