import { createSlice } from '@reduxjs/toolkit';

const showMovieDetails = createSlice({
    name: "modal",
    initialState: false,
    reducers: {
        visibility(state, action) {
            return action.payload;
        }
    }
})

export { showMovieDetails };
export const { visibility } = showMovieDetails.actions;