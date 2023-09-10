import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTodosFn } from "../services";
import { getId } from "../utils";
import { CategoryType } from "@/types";
import { useHttp } from "@/hooks/httpHook";
import { IUser } from "@/mongodb/models/UserModel";

interface InitialStateProps {
  categoryItems: Array<CategoryType> | null;
  status: "init" | "loading" | "error" | "success";
}

const initialState: InitialStateProps = {
  categoryItems: null,
  status: "init",
};

// export const registerUser = createAsyncThunk(
//   "category/registercategory",
//   async (state: FormData) => {
//     const { request } = useHttp();
//     return await request("/api/auth/", "POST", state);
//   }
// );
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const { request } = useHttp();
    return await request(`/api/category/`);
  }
);

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  // ERROR! using custom thunks with createAsyncThunk
  extraReducers: (builder) =>
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categoryItems = action.payload.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "error";
      }),
});

// export const loadTodosThunk = createAsyncThunk("todo/get", () => {
//   return loadTodosFn();
// });

// ERROR! todo correct export of hole actions, not only one action!
export const { reducer: categoryReducer, actions: categoryActions } = slice;
// export const todoReducer = slice.reducer;
// export const { addTodo, toggleTodoDone, deleteTodo } = slice.actions;
