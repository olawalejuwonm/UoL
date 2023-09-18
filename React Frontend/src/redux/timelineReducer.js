import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  isAdded: false,
  loading: false,
  isUpdated: false,
  isDeleted: null,
  my: [],
};

export const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    addTimeline: (state, { payload }) => {
      state.isAdded = true;
      state.data = [payload?.data || payload, ...state?.data];
    },
    updateTimeline: (state, { payload }) => {
      state.isUpdated = true;
      state.data = EditData(state?.data, payload?.data || payload);
    },
    deleteTimeline: (state, { payload }) => {
      state.isDeleted = true;
      state.data = DeleteData(state?.data, payload?.data || payload);
    },
    getTimeline: (state, { payload }) => {
      state.data = payload?.data || payload;
    },
    getMyTimeline: (state, { payload }) => {
      state.my = payload?.data || payload;
    },
    failTimeline: (state) => {
      state.loading = false;
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTimeline,
  updateTimeline,
  deleteTimeline,
  getTimeline,
  failTimeline,
  getMyTimeline,
} = timelineSlice.actions;

export default timelineSlice.reducer;

export const EditData = (data, payload) => {
  let updatateData =
    data?.length > 0
      ? data.map((item) => (item._id !== payload._id ? item : payload))
      : data;
  return updatateData;
};

export const DeleteData = (data, payload) => {
  let filterItem =
    data?.length > 0
      ? [...data.filter((item) => item._id !== payload._id)]
      : [];
  return filterItem;
};

export const manageTimeline = (type, data, me) => async (dispatch) => {
  try {
    let res;
    if (type === "get") {
			res = await axios.get(
				`/timeline${me ? "" : "/"}${me || ""}${
					data?.limit ? `?_limit=${data?.limit}` : ""
				}`
			);
			dispatch(me ? getMyTimeline(res?.data) : getTimeline(res?.data));
		}
		if (type === "post") {
			res = await axios.post(`/timeline/`, { ...data });
			dispatch(addTimeline(res?.data));
		}
		if (type === "put") {
			res = await axios.put(`/timeline/${data?._id}/`, {
				...data,
			});
			dispatch(updateTimeline(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(`/timeline/${data?._id}/`);
			dispatch(deleteTimeline(data));
		}
    if (type !== "get") toast.success(res?.data?.message);
  } catch (err) {
    if (err) console.log({ error: err.response?.data, err });
    if (err?.response?.status === 429) toast.error(err?.response?.data);
    dispatch(failTimeline());
    if (type && type !== "get") {
      let error = err.response?.data?.error;
      if (error) {
        error?.forEach((item) => toast.error(item));
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }
};

export const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
