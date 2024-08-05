import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./AllDataSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;