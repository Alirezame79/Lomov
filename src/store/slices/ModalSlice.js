import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    visibility(state, action) {
      return action.payload;
    },
  },
});

export { modalSlice };
export const { visibility } = modalSlice.actions;
