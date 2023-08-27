import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTodosFn } from "../services";
import { getId } from "../utils";
import { CategoryType, PostType } from "@/types";
import { useHttp } from "@/hooks/httpHook";
import { IUser } from "@/mongodb/models/UserModel";

interface InitialStateProps {
  postItems: Array<PostType> | null;
  singlePost: PostType | null;
  status: "init" | "loading" | "error" | "success";
  singleStatus: "init" | "loading" | "error" | "success";
  lastReadingPost: PostType | null;
}

const initialState: InitialStateProps = {
  postItems: null,
  singlePost: null,
  lastReadingPost: null,
  status: "init",
  singleStatus: "init",
};
// export const registerUser = createAsyncThunk(
//   "category/registercategory",
//   async (state: FormData) => {
//     const { request } = useHttp();
//     return await request("/api/auth/", "POST", state);
//   }
// );

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (searchParam: string) => {
    const { request } = useHttp();
    return await request(`/api/post?${searchParam}`);
  }
);
export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (id: string) => {
    const { request } = useHttp();
    return await request(`/api/post/${id}`);
  }
);
export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData: FormData) => {
    const { request } = useHttp();
    return await request(`/api/post`, "POST", formData);
  }
);
export const updateViews = createAsyncThunk(
  "post/updateViews",
  async (id: string) => {
    const { request } = useHttp();
    return await request(`/api/views?id=${id}`);
  }
);

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createLastPost(state, action: PayloadAction<PostType>) {
      state.lastReadingPost = action.payload;
    },
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
      })
      .addCase(getSinglePost.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.singleStatus = "success";
        // console.log("fetch post: ", action.payload.post);
        state.singlePost = action.payload.post;
      })
      .addCase(getSinglePost.rejected, (state) => {
        state.singleStatus = "error";
      }),
});

// export const loadTodosThunk = createAsyncThunk("todo/get", () => {
//   return loadTodosFn();
// });

// ERROR! todo correct export of hole actions, not only one action!
export const { reducer: postReducer, actions: postActions } = slice;
// export const todoReducer = slice.reducer;
// export const { addTodo, toggleTodoDone, deleteTodo } = slice.actions;
