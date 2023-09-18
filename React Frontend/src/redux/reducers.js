import { createReducer, current } from "@reduxjs/toolkit";
import {
  signIn,
  signOut,
  updUser,
  updStore,
  overwriteStore,
  storeError,
} from "./ActionCreators";
const iState = { loading: false, message: "" };

export const user = createReducer(
  { ...iState, loggedIn: false, user: {} },
  {
    [signIn]: (state, action) => {
      // console.log(action.payload, "in redu", current(state))
      return {
        ...current(state),
        loggedIn: action.payload.login,
        user: { ...current(state.user), ...action.payload.user },
      };
    },
    [signOut]: (state, action) => {
      return {
        ...state,
        loggedIn: action.payload,
        user: {},
      };
    },
    [updUser]: (s, a) => {
      if (a.payload) {
        // console.log(s.user, "action")

        return {
          ...s,
          user: [{ ...s.user, ...a.payload }],
        };
      }

      return s;
    },
  }
);

export const theStore = createReducer(
  { ...iState, error: false },
  {
    [updStore]: (s, a) => {
      const newS = { ...current(s), error: false };
      if (a.payload) {
        const existStore = newS[a.payload.name];

        console.log(
          "existing store ooo",
          existStore,
          "value oo",
          a.payload.value
        );

        if (existStore) {
          if (Array.isArray(existStore)) {
            console.log("it;s array");
            if (Array.isArray(a.payload.value)) {
              return {
                ...newS,
                [a.payload.name]: [...existStore, ...a.payload.value],
              };
            } else if (typeof a.payload.value === "object") {
              let presArr = [];

              for (const key in a.payload.value) {
                if (Object.hasOwnProperty.call(a.payload.value, key)) {
                  const element = a.payload.value[key];
                  presArr.push({ [key]: element });
                }
              }

              return {
                ...newS,
                [a.payload.name]: [...existStore, ...presArr],
              };
            }

            console.warn(
              "You are trying to merge an array with something not array and object"
            );
            return {
              ...newS,
              [a.payload.name]: [...existStore, a.payload.value],
            };
          } else if (typeof existStore === "object") {
            if (Array.isArray(a.payload.value)) {
              console.warn(
                "You are merging an object with array, it might destort your data to make keys as an integer"
              );
            }
            return {
              ...newS,
              [a.payload.name]: { ...existStore, ...a.payload.value },
            };
          }

          console.warn(
            "There is a prob, existing store is not object and not array"
          );
          return {
            ...newS,
            [a.payload.name]: a.payload.value,
          };
        }

        return {
          ...newS,
          [a.payload.name]: a.payload.value,
        };
      }

      console.warn("oops no payload was returned");

      return newS;
    },
    [overwriteStore]: (s, a) => {
      if (a.payload) {
        return {
          ...current(s),
          [a.payload.name]: a.payload.value,
        };
      }

      return s;
    },
    [storeError]: (s, a) => {
      if (a.payload) {
        return {
          ...current(s),
          error: true,
          message: a.payload,
        };
      }
      console.warn("oops no payload was returned in store");
      return s;
    },
  }
);
