import { createSlice } from '@reduxjs/toolkit';

const searchResult = createSlice({
    name: "result",
    initialState: [],
    reducers: {
        updateList(state, action) {
            return action.payload;
        },
        resetList(state, action) {
            return [];
        },
    }
})


export { searchResult };
export const { updateList, resetList } = searchResult.actions;