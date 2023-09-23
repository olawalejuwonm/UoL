// I wrote this code
import { overwriteStore, signIn, signOut } from "./ActionCreators";
import { store } from "./store";

import { toast } from "react-toastify";

export const baseLink =
  process.env.REACT_APP_BASE_URL ||
  "https://social-be-6dee029da670.herokuapp.com/";
//export const baseLink = "https://social-be-6dee029da670.herokuapp.com/";
// process.env.REACT_APP_BASE_URL || process.env.REACT_APP_USE_URL;
export const WebSocketLink =
  process.env.REACT_APP_WEBSOCKET_URL ||
  "ws://social-be-6dee029da670.herokuapp.com/";
// export const WebSocketLink = "127.0.0.1:8000/";

const newtorkErrorAccrossBrowsers = [
  "Failed to fetch", // Chrome, Firefox, Safari
  "NetworkError when attempting to fetch resource", // Microsoft Edge, Internet Explorer
];

export const loadPage = (load = true) => {
  if (load) {
    document.body.classList.add("loading-indicator");
  } else {
    document.body.classList.remove("loading-indicator");
  }
};

export const api = (
  method,
  path,
  data,
  configs = {
    load: true,
    showMsg: true,
  }
) => {
  let bodyFormData;
  if (method?.toLowerCase() === "get") {
    //if method is get, append all data to path
    if (data) {
      // path += "?";
      // for (let key in data) {
      //   path += key + "=" + data[key] + "&";
      // }
      // Delete last character of path
      // path = path.slice(0, -1);
      configs = data;
      // Delete data
      data = undefined;
    }
  }
  if (data) {
    bodyFormData = new FormData();
    for (let key in data) {
      console.log(key, data[key]);
      const value = data[key];
      //if value is array of objects, stringify it
      if (Array.isArray(value)) {
        bodyFormData.append(key, JSON.stringify(value));
      }
      //check if value is a file
      else if (value instanceof File) {
        bodyFormData.append(key, value);
      }
      //if value is object, stringify it
      else if (typeof value === "object") {
        bodyFormData.append(key, JSON.stringify(value));
      } else {
        bodyFormData.append(key, value);
      }
    }
  }
  //append all data to bodyFormData

  const dofetch = async () => {
    try {
      let token = localStorage.getItem("token");
      // console.log(token)
      if (configs.load) {
        document.body.classList.add("loading-indicator");
      }

      let error = true;
      // let message = "An error occured";

      const r = await fetch(baseLink + path, {
        method,
        headers: {
          Authorization: "Bearer " + token,
          // "Content-Type": "multipart/form-data",
        },
        body: bodyFormData,
      });
      // console.log(r);
      if (configs.load) document.body.classList.remove("loading-indicator");

      const result = await r.json();

      const successStatusCodes = [200, 201, 204];

      if (!successStatusCodes.includes(r.status)) {
        console.warn(result, "not 200s status codes");
        error = true;
        if (result.message) {
          // throw new Error(result.message);
          if (configs.showMsg) {
            toast.error(result.message);
          }
        } else if (result.error) {
          //determine if result.error is String
          if (typeof result.error === "string") {
            // throw new Error(result.error);
            toast.error(result.error);
          }
          if (result.error[Object.keys(result.error)[0]]) {
            // throw new Error(result.error[Object.keys(result.error)[0]]);
            toast.error(result.error[Object.keys(result.error)[0]]);
          }
          // else {
          //   throw new Error("An error occured");
          // }
        }

        // console.log("here")

        // throw new Error(r.statusText);
        else {
          if (configs.showMsg) {
            toast.error(r.statusText);
          }
        }
      }
      // if (result.pdf_file) {
      //   downloadPDF(result.pdf_file, result.filename);
      // }
      else {
        error = false;
        if (method?.toLowerCase() !== "get") {
          requiredDatas();
        }
        if (configs.showMsg) {
          toast.success(result.message);
        }
      }

      return { data: result, success: !error };
    } catch (e) {
      // console.log(e);
      if (configs.load) document.body.classList.remove("loading-indicator");

      if (configs.showMsg) {
        toast.error(e.message);
      }

      if (
        e.name === "TypeError" &&
        newtorkErrorAccrossBrowsers.includes(e.message)
      ) {
        // throw new Error("There is a problem with your internet connection");
        toast.error("There is a problem with your internet connection");
      }
      // throw e;
    }
  };

  return dofetch();
};

export const onSuccess = (func, actionFunc, data) => {
  func.then((res) => {
    console.log(res, "res");
    if (res?.success === true) {
      // store.dispatch(actionFunc(data));
      // actionFunc(data);
      actionFunc(res?.data || res);
    }
  });
};

export const handleForm = (e, includeBlankFields = false) => {
  e?.preventDefault && e.preventDefault();
  // should not prevent default form validation but should prevent default form reload

  const elem = e?.target?.elements;
  console.log(elem, "elem", e);
  if (!elem) {
    return;
  }
  const formData = new FormData();
  let alldata = {};
  try {
    //get all input elements
    const inputElements = e.target.getElementsByTagName("input");
    //add the values from the input elements to the alldata object
    for (let i = 0; i < inputElements.length; i++) {
      if (inputElements[i].type === "checkbox") {
        if (inputElements[i].checked) {
          const value = inputElements[i].value;
          if (value === "on") {
            //Convert "on" to true
            alldata[inputElements[i].name] = true;
          } else {
            alldata[inputElements[i].name] = value;
          }
        } else {
          alldata[inputElements[i].name] = false;
        }
      } else {
        alldata[inputElements[i].name] = inputElements[i].value;
      }
    }
    //get all select elements
    const selectElements = e.target.getElementsByTagName("select");
    //add the values from the select elements to the alldata object
    for (let i = 0; i < selectElements.length; i++) {
      alldata[selectElements[i].name] = selectElements[i].value;
    }
  } catch (e) {
    console.warn(e, "No input elements found");
  }
  console.log(elem, "elem", e);
  function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    //ERROR HERE iLEn
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }
  //return an array of multiple select values
  const Tlength = elem?.length || 0;
  for (let i = 0; i < Tlength; i++) {
    // console.log(elem[i].type);
    if (elem[i].type === "file") {
      if (elem[i].files.length > 0) {
        formData.append(elem[i].name, elem[i].files[0]);
      }
    } else if (elem[i].type === "select-multiple") {
      // console.log("elem[i].name", elem[i].name, elem[i], getSelectValues(elem[i]));
      // formData.append(elem[i].name, getSelectValues(elem[i]));
      alldata[elem[i].name] = getSelectValues(elem[i]);
    } else if (elem[i].type === "radio") {
      if (elem[i].checked) {
        formData.append(elem[i].name, elem[i].value);
      }
    } else if (elem[i].type !== "checkbox") {
      if (elem[i].value) {
        formData.append(elem[i].name, elem[i].value);
      }
    }
  }

  for (var key of formData.entries()) {
    alldata[key[0]] = key[1];
  }

  // for (var key of formData.entries()) {
  //   console.log(key[0], ":", key[1]);
  // }

  console.log(alldata, "      AllData beginssss checkbox    ");

  const checkBoxData = {};
  for (let i = 0; i < Tlength; i++) {
    if (elem[i].type === "checkbox") {
      console.log(elem[i].name, elem[i].checked);
      // formData.append(elem[i].name, elem[i].value);
      if (elem[i].checked) {
        if (checkBoxData[elem[i].name]) {
          checkBoxData[elem[i].name].push(elem[i].value);
        } else {
          checkBoxData[elem[i].name] = [elem[i].value];
        }
      }
    }
  }

  console.log(checkBoxData, "checkBoxData");

  // iterate through checkBoxData and append to formData
  // for (let key in checkBoxData) {
  //   console.log(key, checkBoxData[key], "checkBoxData");
  //   formData.append(key, JSON.stringify(checkBoxData[key]));
  // }

  //delete empty string values from formData
  for (let key of formData.entries()) {
    // console.log(key, "key");
    if (key[1] === "") {
      formData.delete(key[0]);
    }
    //remove those with empty keys
    if (key[0] === "") {
      formData.delete(key[0]);
    }
  }

  // console.log(formData.entries(), "formData");
  for (var keyl of formData.entries()) {
    alldata[keyl[0]] = keyl[1];
  }

  // for (var key of formData.entries()) {
  //   console.log(key[0], ":", key[1]);
  // }

  // console.log(alldata, "      AllData --       ");
  if (includeBlankFields) {
    return alldata;
  }
  //check if there are empty fields
  for (let key in alldata) {
    if (alldata[key] === "") {
      delete alldata[key];
    }
  }
  return alldata;
};
export const searchStore = (storeName, value, search) => {
  const state = store?.getState()?.store;
  const theStore = state[storeName];
  let rValue = null;
  // console.log(theStore, "theStore");

  if (Array.isArray(theStore)) {
    theStore.map((v) => {
      if (typeof v === "object") {
        if (v[search] === value) {
          rValue = v;
        }
      } else {
        if (v === value) {
          rValue = v;
        }
      }
      return v;
    });
  }

  //do for object here

  // if (typeof theStore)

  return rValue;
};

export const searchStoreHooks = (store, value, search) => {
  // const state = store;
  const theStore = store;
  let rValue = null;
  console.log(theStore, "theStore");

  if (Array.isArray(theStore)) {
    theStore.map((v) => {
      if (typeof v === "object") {
        if (v[search] === value) {
          rValue = v;
        }
      } else {
        if (v === value) {
          rValue = v;
        }
      }
      return v;
    });
  }

  //do for object here

  // if (typeof theStore)

  return rValue;
};

const requiredDatas = async () => {
  fetchUsers();
  fetchFriends();
  fetchTimeline();
  fetchMyTimeline();
};

export const registerUSer = async (data) => {
  try {
    const r = await api("post", "signup", data);
    return r;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (data) => {
  try {
    const r = await api("post", "login", data);
    console.log(
      "micheal ~ file: thunks.js ~ line 276 ~ loginUser ~ r",
      r,
      r["auth_token "]
    );
    localStorage.setItem("token", r["auth_token "]);
    requiredDatas();
    store.dispatch(signIn({ success: true, user: r }));
    return r;
  } catch (e) {
    throw e;
  }
};

export const requestPasswordReset = async (data) => {
  try {
    const r = await api("post", "recover/code", data);
    return r;
  } catch (e) {
    throw e;
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("token");
    store.dispatch(signOut({ success: true }));
  } catch (e) {
    throw e;
  }
};

export async function fetchProfile() {
  try {
    const r = await api("get", "user/profile/", {
      load: false,
      showMsg: false,
    });
    // if (noRequired === false) {
    // }
    console.log(r, "r.message");
    if (r?.success) {
      requiredDatas();

      store.dispatch(signIn({ success: true, user: r.data?.data }));
      store.dispatch(
        overwriteStore({
          name: "user",
          value: r.data?.data,
        })
      );
    }
    return r;
  } catch (e) {
    throw e;
  }
}

export async function fetchUsers() {
  try {
    const r = await api("get", "user/", {
      load: false,
      showMsg: false,
    });
    if (r?.success) {
      store.dispatch(
        overwriteStore({
          name: "users",
          value: r.data,
        })
      );
    }
    return r;
  } catch (e) {
    throw e;
  }
}

// fetch friends
export async function fetchFriends() {
  try {
    const r = await api("get", "friends/", {
      load: false,
      showMsg: false,
    });
    if (r?.success) {
      console.log(r, "r.message");
      store.dispatch(
        overwriteStore({
          name: "friends",
          value: r.data,
        })
      );
    }
    return r;
  } catch (e) {
    throw e;
  }
}

// fetch timeline
export async function fetchTimeline() {
  try {
    const r = await api("get", "timeline/", {
      load: false,
      showMsg: false,
    });
    if (r?.success) {
      console.log(r, "r.message");
      store.dispatch(
        overwriteStore({
          name: "timeline",
          value: r.data,
        })
      );
    }
    return r;
  } catch (e) {
    throw e;
  }
}

// fetch my timeline
export async function fetchMyTimeline() {
  try {
    const r = await api("get", "timeline/me/", {
      load: true,
      showMsg: false,
    });
    if (r?.success) {
      console.log(r, "r.message");
      store.dispatch(
        overwriteStore({
          name: "mytimeline",
          value: r.data,
        })
      );
    }
    return r;
  } catch (e) {
    throw e;
  }
}
