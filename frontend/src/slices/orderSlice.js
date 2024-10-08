import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import apiUrl from "../config";

// Thunk to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${apiUrl}/api/orders`,
        orderData,
        config
      );
      console.log(token);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data.message === "jwt expired") {
        // Handle token expiration
        console.error("Token expired. Please log in again.");
      }
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Thunk to fetch orders for a user
export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchOrdersByUser",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${apiUrl}/api/orders/user/${userId}`,
        config
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().user;
      if (!token) {
        throw new Error("No token found. User might not be logged in.");
      }

      console.log("Fetching orders for user:", userId);
      console.log("Using token:", token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${apiUrl}/api/orders/user/${userId}`,
        config
      );

      console.log("Response received:", response);

      // Data in response.data, no need to access .data again
      return response.data;
    } catch (error) {
      console.error("Error in fetchUserOrders:", error);
      return rejectWithValue(
        error.response?.data || {
          message: error.message || "Failed to fetch orders",
        }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
    currentOrder: null, // Store the current order after placing it
  },
  reducers: {
    resetOrderStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload; // Store the newly placed order
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Store the fetched orders
        state.error = null;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch orders";
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Store the fetched orders
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "An unknown error occurred";
      });
  },
});

export const { resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
