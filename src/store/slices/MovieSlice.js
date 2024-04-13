import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {},
  reducers: {
    setMovie(state, action) {
      return action.payload;
    },
  },
});

export { movieSlice };
export const { setMovie } = movieSlice.actions;
