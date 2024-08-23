import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.find((item) => item.id === product.id)) {
        state.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
