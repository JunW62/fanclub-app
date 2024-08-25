import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3000";

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
      return response.data;
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
  async (productId, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${apiUrl}/api/wishlist`,
        { productId },
        config
      );
      if (response.status === 200) {
        // Handling the "already in wishlist" case
        return rejectWithValue(response.data.message); // Optionally handle this as a non-error status
      }
      return response.data;
    } catch (err) {
      if (err.response && err.response.data.message === "jwt expired") {
        console.error("Token expired. Please log in again.");
      }
      return rejectWithValue(err.response ? err.response.data : err.message);
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
        `${apiUrl}/api/wishlist/${productId}`,
        config
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data.message === "jwt expired") {
        console.error("Token expired. Please log in again.");
      }
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    message: null,
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
        if (action.payload.message !== "Product already in wishlist") {
          state.items = action.payload;
        }
        state.message = action.payload.message;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.product !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;
