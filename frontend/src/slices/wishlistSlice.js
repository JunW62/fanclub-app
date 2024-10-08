import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import apiUrl from "../config";

// Thunk to fetch the wishlist for the logged-in user
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`${apiUrl}/api/wishlist`, config);
      return response.data.wishlist;
    } catch (err) {
      if (err.response && err.response.data.message === "jwt expired") {
        console.error("Token expired. Please log in again.");
      }
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Thunk to add a product to the wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${apiUrl}/api/wishlist/add`,
        { productId },
        config
      );

      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk to remove a product from the wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.delete(
        `${apiUrl}/api/wishlist/remove/${productId}`,
        config
      );
      console.log("API response:", response.data);
      return response.data.wishlist;
    } catch (err) {
      if (err.response && err.response.data.message === "jwt expired") {
        console.error("Token expired. Please log in again.");
      }
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggleItem",
  async (productId, { getState }) => {
    const { user } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.post(
      `${apiUrl}/api/wishlist/toggle`,
      { productId },
      config
    );
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        console.log("Received wishlist after removal:", action.payload);
        state.items = state.items.filter((item) =>
          action.payload.includes(typeof item === "string" ? item : item._id)
        );
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload.wishlist)
          ? action.payload.wishlist
          : [];
        state.status = "succeeded";
      });
  },
});

export default wishlistSlice.reducer;
