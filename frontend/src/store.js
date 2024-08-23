import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});

export default store;
