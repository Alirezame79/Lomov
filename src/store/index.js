import { configureStore } from "@reduxjs/toolkit";
import { movieSlice, setMovie } from "./slices/MovieSlice";
import { modalSlice, visibility } from "./slices/ModalSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export { store, setMovie, modalSlice, visibility };
