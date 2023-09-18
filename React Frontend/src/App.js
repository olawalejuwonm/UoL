import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import ChatPage from "./components/pages/ChatPage";
import HomePage from "./components/pages/HomePage";
import AddFriends from "./components/FriendsPage/AddFriends";
import { Provider, useSelector } from "react-redux";
import { baseLink, fetchProfile } from "./redux/thunks";
import { useEffect } from "react";
import { store } from "./redux/store";
import axios from "axios";
import { SetAuthToken } from "./redux/timelineReducer";
import Users from "./components/FriendsPage/Users";

axios.defaults.baseURL = baseLink;
if (localStorage.getItem("token")) {
	SetAuthToken(localStorage.getItem("token"));
}

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

function MainApp() {
  // const nav = useNavigate();
  // navigationRef = nav;
 const login = useSelector((s) => s?.user?.loggedIn);
 const openPaths = ["/", "/signin"];

  const tryToLogin = async () => {
    try {
      const r = await fetchProfile();
      console.log("r", r);
      if (!r?.success) {
        console.log('window.location.pathname', window.location.pathname)
        if (!openPaths.includes(window.location.pathname)) {
          window.location.href = "/signin";
        }
      
      }
      // else {
      //   if (openPaths.includes(window.location.pathname)) {
      //     window.location.href = "/homepage";
      //   }
      // }

    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    tryToLogin();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route exact path="/" Component={LoginPage} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/friends" Component={AddFriends} />
        <Route path="/users" Component={Users} />
        <Route path="/homepage" Component={HomePage} />
        <Route path="/chat" Component={ChatPage} />
        <Route path="/chat/:chatId" Component={ChatPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
