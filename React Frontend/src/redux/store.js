import { configureStore } from "@reduxjs/toolkit";
import { user, theStore } from "./reducers";
import timelineReducer from "./timelineReducer";
import friendsReducer from "./friendsReducer";

export const store = configureStore({
	reducer: {
		user,
		store: theStore,
		timeline: timelineReducer,
        friends: friendsReducer
		// students
	},
});
