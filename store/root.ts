import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, userReducer, categoryReducer } from "./slices";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    category: categoryReducer,
  },
});
