import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTodosFn } from "../services";
import { getId } from "../utils";
import { CategoryType, PostType } from "@/types";
import { useHttp } from "@/hooks/httpHook";
import { IUser } from "@/mongodb/models/UserModel";

interface InitialStateProps {
  postItems: Array<PostType> | null;
  status: "init" | "loading" | "error" | "success";
}

const initialState: InitialStateProps = {
  postItems: null,
  status: "init",
};

// export const registerUser = createAsyncThunk(
//   "category/registercategory",
//   async (state: FormData) => {
//     const { request } = useHttp();
//     return await request("/api/auth/", "POST", state);
//   }
// );
export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const { request } = useHttp();
  return await request(`/api/post/`);
});

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // createUser(state, action: PayloadAction<AuthUserType>) {
    //   state.authUser = action.payload;
    //   localStorage.setItem("user", JSON.stringify(action.payload));
    //   console.log(action.payload);
    // },
    // getAuthUser(state, action: PayloadAction<AuthUserType>) {
    //   state.authUser = action.payload;
    //   localStorage.setItem("user", JSON.stringify(action.payload));
    //   console.log(action.payload);
    // },
    // leaveUser(state) {
    //   state.authUser = null;
    //   console.log("leave work");
    // },
    // deleteUser(state, action: PayloadAction<{ id: number }>) {
    // },
  },

  // ERROR! using custom thunks with createAsyncThunk
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        console.log("fetch posts: ", action.payload.data);
        state.postItems = action.payload.data;
      })
      .addCase(getPosts.rejected, (state) => {
        state.status = "error";
      }),
});

// export const loadTodosThunk = createAsyncThunk("todo/get", () => {
//   return loadTodosFn();
// });

// ERROR! todo correct export of hole actions, not only one action!
export const { reducer: postReducer, actions: postActions } = slice;
// export const todoReducer = slice.reducer;
// export const { addTodo, toggleTodoDone, deleteTodo } = slice.actions;
