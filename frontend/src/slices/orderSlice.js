import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3000";

// Thunk to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token; // Retrieve token from user state
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
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
        // Handle token expiration (e.g., refresh token or redirect to login)
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
      const token = getState().user.token; // Retrieve token from user state
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
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

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
    currentOrder: null, // Store the current order after placing it
  },
  reducers: {},
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
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Store the fetched orders
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
