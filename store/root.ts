import { configureStore } from "@reduxjs/toolkit";
import {
  todoReducer,
  userReducer,
  categoryReducer,
  postReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    category: categoryReducer,
    post: postReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
