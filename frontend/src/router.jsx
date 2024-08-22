import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import NewsAndEventsPage from "./pages/NewsAndEventsPage";
import AboutPage from "./pages/AboutPage";
import LoginSignupPage from "./pages/LoginSignupPage";
import EditProductPage from "./pages/EditProductPage";
import GalleryPage from "./pages/GalleryPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/news-events" element={<NewsAndEventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login-signup" element={<LoginSignupPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="*" element={<HomePage />} /> {/* Fallback route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
