import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTodosFn } from "../services";
import { getId } from "../utils";
import { AuthUserType } from "@/types";
import { useHttp } from "@/hooks/httpHook";
import { IUser } from "@/mongodb/models/UserModel";

interface InitialStateProps {
  url: string;
  authUser: AuthUserType | null;
  loginStatus: "init" | "loading" | "error" | "success";
  registerStatus: "init" | "loading" | "error" | "success";
  loginErrorMessage: string;
  registerErrorMessage: string;
  // errMessage: string;
}

const initialState: InitialStateProps = {
  url: "/api",
  authUser: null,
  loginErrorMessage: "",
  registerErrorMessage: "",
  loginStatus: "init",
  registerStatus: "init",
  // errMessage: "",
};

// export const registerUser = createAsyncThunk("user/registerUser", async () => {
//   async (state: AuthUserType) => {
//     const { request } = useHttp();
//     return await request(
//       `${initialState.url}/auth`,
//       "POST",
//       JSON.stringify(state),
//       { "Content-Type": "application/json" }
//     );
//   };
// });
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (state: FormData) => {
    const { request } = useHttp();
    return await request("/api/auth/", "POST", state);
  }
);
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id: string) => {
    const { request } = useHttp();
    return await request(`/api/auth/${id}`);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (state: any) => {
    const { request } = useHttp();
    const { email, password } = state;
    return await request(
      `/api/auth?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`
    );
  }
);
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // createUser(state, action: PayloadAction<AuthUserType>) {
    //   state.authUser = action.payload;

    //   localStorage.setItem("user", JSON.stringify(action.payload));
    //   console.log(action.payload);
    // },
    getAuthUserId(state) {
      const storedUser = localStorage.getItem("user");
      return JSON.parse(storedUser || "");
    },
    leaveUser(state) {
      state.authUser = null;
      localStorage.removeItem("user");
      console.log("leave work");
    },
    // deleteUser(state, action: PayloadAction<{ id: number }>) {
    // },
  },

  // ERROR! using custom thunks with createAsyncThunk
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.registerErrorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "error";
        console.log("action", action);
        state.registerErrorMessage = action.error?.message || "";
      })
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.loginErrorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "success";
        state.authUser = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user._id));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "error";
        state.loginErrorMessage = action.error?.message || "";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        console.log("getUserById success");
        console.log("getUserById user", action.payload.data);
        state.authUser = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        console.log("getUserById error");

        localStorage.removeItem("user");
      }),
});

// export const loadTodosThunk = createAsyncThunk("todo/get", () => {
//   return loadTodosFn();
// });

// ERROR! todo correct export of hole actions, not only one action!
export const { reducer: userReducer, actions: userActions } = slice;
// export const todoReducer = slice.reducer;
// export const { addTodo, toggleTodoDone, deleteTodo } = slice.actions;
