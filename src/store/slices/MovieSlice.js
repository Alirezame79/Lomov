import { createSlice } from '@reduxjs/toolkit';

const selectedMovie = createSlice({
    name: "movie",
    initialState: {},
    reducers: {
        setMovie(state, action) {
            return action.payload;
        }
    }
})

export { selectedMovie };
export const { setMovie } = selectedMovie.actions;