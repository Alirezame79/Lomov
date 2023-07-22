import { configureStore } from "@reduxjs/toolkit";
import { searchResult, updateList, resetList } from './slices/SearchSlice';
import { selectedMovie, setMovie } from './slices/MovieSlice'
import { showMovieDetails, visibility } from './slices/MovieDetailSlice'

const store = configureStore({
    reducer: {
        result: searchResult.reducer,
        movie: selectedMovie.reducer,
        modal: showMovieDetails.reducer
    }
});

export { store, updateList, setMovie, resetList, showMovieDetails, visibility };