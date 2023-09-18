import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { DeleteData, EditData } from "./timelineReducer";

const initialState = {
	data: [],
	isAdded: false,
	loading: false,
	isUpdated: false,
	isDeleted: null,
	my: [],
};

export const friendsSlice = createSlice({
	name: "friends",
	initialState,
	reducers: {
		getSearchFriends: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		resetFriendSearch: state => {
			state.mainSearch = null;
			state.isFound = false;
		},
		addFriends: (state, { payload }) => {
			state.isAdded = true;
			state.data = [payload?.data || payload, ...state?.data];
		},
		updateFriends: (state, { payload }) => {
			state.isUpdated = true;
			state.data = EditData(state?.data, payload?.data || payload);
		},
		deleteFriends: (state, { payload }) => {
			state.isDeleted = true;
			state.data = DeleteData(state?.data, payload?.data || payload);
		},
		getFriends: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getMyFriends: (state, { payload }) => {
			state.my = payload?.data || payload;
		},
		failFriends: state => {
			state.loading = false;
			state.isAdded = false;
			state.isUpdated = false;
			state.isDeleted = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addFriends,
	updateFriends,
	deleteFriends,
	getFriends,
	failFriends,
	getMyFriends,
	getSearchFriends,
	resetFriendSearch,
} = friendsSlice.actions;

export default friendsSlice.reducer;

export const manageFriends = (type, data) => async dispatch => {
	try {
		let res;
		if (type === "get") {
			res = await axios.get(
				`/friends/ 
        ${data?.search || ""}
        ${data?.limit ? `${data?.search ? "&" : "?"}_limit=${data?.limit}` : ""}
        `
			);
			dispatch(
				data?.search ? getSearchFriends(res?.data) : getFriends(res?.data)
			);
		}
		// if (type === "post") {
		// 	res = await axios.post(`/friends`, { ...data });
		// 	dispatch(addFriends(res?.data));
		// }
		// if (type === "put") {
		// 	res = await axios.put(`/friends/${data?._id}`, {
		// 		...data,
		// 	});
		// 	dispatch(updateFriends(res?.data));
		// }
		// if (type === "delete") {
		// 	res = await axios.delete(`/friends/${data?._id}`);
		// 	dispatch(deleteFriends(data));
		// }
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(failFriends());
		if (type && type !== "get") {
			let error = err.response?.data?.error;
			if (error) {
				error?.forEach(item => toast.error(item));
			} else {
				toast.error(err?.response?.data?.message);
			}
		}
	}
};
