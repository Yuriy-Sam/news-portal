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
  userStatus: "init" | "loading" | "error" | "success";
  loginErrorMessage: string;
  registerErrorMessage: string;
  isAuthUser: boolean;
  // errMessage: string;
}

const initialState: InitialStateProps = {
  url: "/api",
  authUser: null,
  loginErrorMessage: "",
  registerErrorMessage: "",
  loginStatus: "init",
  userStatus: "init",
  registerStatus: "init",
  isAuthUser: false,
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
export const leaveUser = createAsyncThunk("user/leaveUser", async () => {
  const { request } = useHttp();
  return await request("/api/auth/", "DELETE");
});
// export const createNotes = createAsyncThunk(
//   "user/createNotes",
//   async (state: any) => {
//     const { request } = useHttp();
//     const { userId, postId } = state;
//     return await request(
//       `/api/notes?userId=${userId}&postId=${postId}`,
//       "POST"
//     );
//   }
// );

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id: string) => {
    const { request } = useHttp();
    return await request(`/api/auth/user/${id}`);
  }
);
export const getAuthUser = createAsyncThunk("user/getAuthUser", async () => {
  const { request } = useHttp();
  return await request(`/api/user/`);
});
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
    createUser(state, action: PayloadAction<AuthUserType>) {
      state.authUser = action.payload;
    },
    getAuthUserId(state) {
      const storedUser = localStorage.getItem("user");
      return JSON.parse(storedUser || "");
    },
    // deleteUser(state, action: PayloadAction<{ id: number }>) {
    // },
  },

  // ERROR! using custom thunks with createAsyncThunk
  extraReducers: (builder) =>
    builder
      //-----REGISTER-------------------------------------------------------------
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.registerErrorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "error";
        state.registerErrorMessage = action.error?.message || "";
      })

      //-----LOGIN-------------------------------------------------------------
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.loginErrorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("getAuthUser success");
        state.loginStatus = "success";
        state.authUser = action.payload.user;
        state.isAuthUser = true;
        state.userStatus = "success";

        localStorage.setItem("user", JSON.stringify(action.payload.user._id));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthUser = false;

        state.loginStatus = "error";
        state.loginErrorMessage = action.error?.message || "";
      })

      //-----GET ONE USER-------------------------------------------------------------
      .addCase(getUserById.fulfilled, (state, action) => {
        console.log("getUserById success");
        state.authUser = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        console.error("getUserById error");

        localStorage.removeItem("user");
      })
      .addCase(getAuthUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        console.log("getAuthUser success");
        state.authUser = action.payload.data;
        state.isAuthUser = true;
        state.userStatus = "success";
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        console.error("getUserById error");
        localStorage.removeItem("user");
        state.authUser = null;
        state.isAuthUser = false;
        state.userStatus = "error";
      })

      //-----LEAVE USER-------------------------------------------------------------
      .addCase(leaveUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(leaveUser.fulfilled, (state) => {
        console.log("leaveUser success");
        state.authUser = null;
        state.isAuthUser = false;
        state.userStatus = "error";

        localStorage.removeItem("user");
      })
      .addCase(leaveUser.rejected, () => {
        console.error("leaveUser error");
      }),
});
export const { reducer: userReducer, actions: userActions } = slice;
