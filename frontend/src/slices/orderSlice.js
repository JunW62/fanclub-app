import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUril = "http://localhost:3000";

// Thunk to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUril}/api/orders`, orderData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Thunk to fetch orders for a user
export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchOrdersByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUril}/api/orders/user/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
