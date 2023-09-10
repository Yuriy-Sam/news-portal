import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTodosFn } from "../services";
import { getId } from "../utils";
import { CategoryType, PostType } from "@/types";
import { useHttp } from "@/hooks/httpHook";
import { IUser } from "@/mongodb/models/UserModel";

interface InitialStateProps {
  newPostItems: Array<PostType> | null | undefined;
  postItems: Array<PostType> | null | undefined;
  nodesPostItems: Array<PostType> | null | undefined;
  singlePost: PostType | null;
  status: "init" | "loading" | "error" | "success";
  singleStatus: "init" | "loading" | "error" | "success";
  notesStatus: "init" | "loading" | "error" | "success";
  lastReadingPost: PostType | null;
}

const initialState: InitialStateProps = {
  newPostItems: null,
  postItems: null,
  nodesPostItems: null,
  singlePost: null,
  lastReadingPost: null,
  status: "init",
  singleStatus: "init",
  notesStatus: "init",
};

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (searchParam: string) => {
    const { request } = useHttp();
    return await request(`/api/post?${searchParam}`);
  }
);
export const getNotesPosts = createAsyncThunk(
  "post/getNotesPosts",
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
    updateNotes(state, action: PayloadAction<{ id: String }>) {
      // state.status = "init";
      state.postItems = state.postItems?.map((el) => {
        if (el._id === action.payload.id) {
          if (state.singlePost && state.singlePost._id === el._id) {
            state.singlePost = { ...el, isNotes: !el.isNotes };
          }
          if (state.lastReadingPost && state.lastReadingPost._id === el._id) {
            state.lastReadingPost = {
              ...state.lastReadingPost,
              isNotes: !state.lastReadingPost?.isNotes,
            };
          }
          return { ...el, isNotes: !el.isNotes };
        }
        return el;
      });
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.postItems = action.payload.data;
        state.newPostItems = action.payload.data;
      })
      .addCase(getPosts.rejected, (state) => {
        state.status = "error";
      })
      .addCase(getNotesPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotesPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.nodesPostItems = action.payload.data;
      })
      .addCase(getNotesPosts.rejected, (state) => {
        state.status = "error";
      })
      .addCase(getSinglePost.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.singlePost = action.payload.post;
      })
      .addCase(getSinglePost.rejected, (state) => {
        state.singleStatus = "error";
      }),
});

export const { reducer: postReducer, actions: postActions } = slice;
// export const todoReducer = slice.reducer;
// export const { addTodo, toggleTodoDone, deleteTodo } = slice.actions;
