import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Thunk to handle login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/login", credentials);
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      return { ...user, token };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const loadUserFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const userInfo = jwtDecode(token); // Decode the token to get user info
      return { userInfo, token };
    } catch (error) {
      console.error("Failed to decode token:", error.message);
      return { userInfo: null, token: null };
    }
  }
  return { userInfo: null, token: null };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    ...loadUserFromLocalStorage(), // Load user from local storage
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload; // Store user info on successful login
        state.token = action.payload.token; // Store the authentication token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
