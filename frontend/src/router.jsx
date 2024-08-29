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
import ManageProductsPage from "./pages/ManageProductsPage";
import AddProductPage from "./pages/AddProductPage";
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
        {/* Public Page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/wishlist" element={<WishlistPage />} />{" "} */}
        <Route path="/news-events" element={<NewsAndEventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderPage />} />
        {/* <Route path="/manage-products" element={<ManageProductsPage />} /> */}
        {/* <Route path="/edit-product/:id" element={<EditProductPage />} /> */}
        <Route path="/add-product" element={<AddProductPage />} />
        {/* Protected Routes */}
        <Route
          path="/manage-products"
          element={
            <PrivateRoute>
              <ManageProductsPage />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/edit-product/:id"
          element={
            <PrivateRoute>
              <EditProductPage />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <WishlistPage />
            </PrivateRoute>
          }
        />{" "}
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
