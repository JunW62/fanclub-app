import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import NewsAndEventsPage from "./pages/NewsAndEventsPage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EditProductPage from "./pages/EditProductPage";
import GalleryPage from "./pages/GalleryPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} /> {/* Public StorePage */}
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* Public CartPage */}
        <Route path="/wishlist" element={<WishlistPage />} />{" "}
        {/* Public WishlistPage */}
        <Route path="/news-events" element={<NewsAndEventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        {/* Protected Routes */}
        <Route
          path="/store"
          element={
            <PrivateRoute>
              <StorePage />
            </PrivateRoute>
          }
        />{" "}
        {/* Combined StorePage Route */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />{" "}
        {/* Combined CartPage Route */}
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <WishlistPage />
            </PrivateRoute>
          }
        />{" "}
        {/* Combined WishlistPage Route */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<HomePage />} /> {/* Fallback route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
