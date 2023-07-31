import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, userReducer } from "./slices";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
  },
});
