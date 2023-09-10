import { configureStore } from "@reduxjs/toolkit";
import {
  todoReducer,
  userReducer,
  categoryReducer,
  postReducer,
  notesReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    category: categoryReducer,
    post: postReducer,
    notes: notesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
