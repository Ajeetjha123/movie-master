import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../feature/themeSlice";

const store = configureStore({
  reducer: { theme: themeReducer },
});

export default store;
