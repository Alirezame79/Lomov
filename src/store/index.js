import { configureStore } from "@reduxjs/toolkit";
import { searchResult, updateList } from './slices/SearchSlices';
import { selectedMovie, setMovie } from './slices/MovieSlice'

const store = configureStore({
    reducer: {
        result: searchResult.reducer,
        movie: selectedMovie.reducer
    }
});

export { store, updateList, setMovie };