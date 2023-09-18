import { createAction } from "@reduxjs/toolkit";

export const signIn = createAction("user/add", (status) => {
  if (status.success) {
    // status.user[0].session = status.session;
    // console.log("this is status", status)
    return { payload: { user: status.user, login: true } };
  }
  return { payload: { login: false } };
});

export const signOut = createAction("user/logout", (status) => {
  // console.log(status.success)
  if (status.success) {
    return { payload: false };
  }
  return { payload: true };
});

export const updUser = createAction("user", (addition) => {
  if (addition) {
    return { payload: addition };
  }
  return { payload: false };
});

export const updStore = createAction("theStore/update", (addition) => {
  if (addition) {
    //addition should be {name: "events", value: []}
    console.log("this is addition", addition);

    return { payload: addition };
  }
  return { payload: false };
});

export const overwriteStore = createAction("theStore/overwrite", (newdata) => {
  //newdata should be {name: "events", value: []}

  if (newdata) {
    return { payload: newdata };
  }
  return { payload: false };
});

export const storeError = createAction("theStore/error", (message) => {
  if (message) {
    return { payload: message };
  }

  return { payload: false };
});

export const signOutGurd = createAction("guardian/logout", (status) => {
  // console.log(status.success)
  if (status.success) {
    return { payload: false };
  }
  return { payload: true };
});
