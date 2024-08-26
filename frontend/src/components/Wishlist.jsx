import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../slices/wishlistSlice";
import { addToCart } from "../slices/cartSlice";
import { FaTrash, FaCartPlus } from "react-icons/fa";
import "../styles/Wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, userInfo]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed")
    return <div>Error: {error?.message || "An error occurred"}</div>;

  return (
    <div className="wishlist">
      {items.length === 0 ? (
        <p className="empty-wishlist">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {items.map((item) => (
            <div key={item._id} className="wishlist-item">
              <img
                src={item.imgUrls[0]?.url}
                alt={item.name}
                className="wishlist-item-image"
              />
              <div className="wishlist-item-details">
                <h3 className="wishlist-item-name">{item.name}</h3>
                <p className="wishlist-item-price">
                  ${item.price.toFixed(2)} USD
                </p>
                <div className="wishlist-item-actions">
                  <button
                    className="wishlist-action-btn add-to-cart"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaCartPlus /> Add to Cart
                  </button>
                  <button
                    className="wishlist-action-btn remove"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
