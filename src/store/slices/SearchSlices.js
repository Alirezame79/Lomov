import { createSlice } from '@reduxjs/toolkit';

const searchResult = createSlice({
    name: "result",
    initialState: [],
    reducers: {
        updateList(state, action) {
            // console.log(action.payload);
            return action.payload;
        },
    }
})


export { searchResult };
export const { updateList } = searchResult.actions;