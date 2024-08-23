import { createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./orderSlice";

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    updateCartQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item._id === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state of placing an order
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      // Handle the fulfilled state of placing an order
      .addCase(placeOrder.fulfilled, (state) => {
        state.items = []; // Clear the cart after successful order placement
        state.status = "succeeded";
        localStorage.removeItem("cart"); // Clear cart from localStorage
      })
      // Handle the rejected state of placing an order
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
