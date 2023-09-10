import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTodosFn } from "../services";
import { getId } from "../utils";
import { CategoryType, PostType } from "@/types";
import { useHttp } from "@/hooks/httpHook";
import { IUser } from "@/mongodb/models/UserModel";
import { postActions } from "./post";

interface InitialStateProps {
  notesItems: Array<string> | [];
  status: "init" | "loading" | "error" | "success";
}

const initialState: InitialStateProps = {
  notesItems: [],
  status: "init",
};
export const getNotes = createAsyncThunk("notes/getNotes", async () => {
  const { request } = useHttp();
  return await request(`/api/notes`);
});
export const createNotes = createAsyncThunk(
  "notes/createNotes",
  async (state: string) => {
    const { request } = useHttp();
    return await request(`/api/notes?postId=${state}`, "POST");
  }
);
export const removeNotes = createAsyncThunk(
  "notes/removeNotes",
  async (state: string) => {
    const { request } = useHttp();
    return await request(`/api/notes?postId=${state}`, "DELETE");
  }
);
const slice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notesItems = action.payload.data;
      })
      //-----CREATE NODES-------------------------------------------------------------
      .addCase(createNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notesItems = [...state.notesItems, action.payload.data];
      })
      .addCase(removeNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notesItems = state.notesItems.filter(
          (el) => el !== action.payload.data
        );
      }),
});
export const { reducer: notesReducer, actions: notesActions } = slice;
