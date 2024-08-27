import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toggleWishlistItem } from "../slices/wishlistSlice";
import { FaHeart } from "react-icons/fa";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items) || [];
  const isInWishlist =
    Array.isArray(wishlistItems) &&
    wishlistItems.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlistItem(product._id));
  };

  return (
    <div className="product-item">
      <img
        src={product.imgUrls[0]?.url}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">$ {product.price?.toFixed(2)} USD</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button
        className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
        onClick={handleToggleWishlist}
      >
        <FaHeart />
      </button>
    </div>
  );
};

export default ProductItem;
