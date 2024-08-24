import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../slices/wishlistSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistStatus = useSelector((state) => state.wishlist.status);
  const error = useSelector((state) => state.wishlist.error);

  useEffect(() => {
    if (wishlistStatus === "idle") {
      dispatch(fetchWishlist());
    }
  }, [dispatch, wishlistStatus]);

  const handleRemoveFromWishlist = (productId) => {
    console.log("Removing product with ID:", productId);
    if (productId) {
      dispatch(removeFromWishlist(productId));
    } else {
      console.error("Product ID is undefined");
    }
  };

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlistStatus === "loading" && <p>Loading your wishlist...</p>}
      {wishlistStatus === "failed" && <p>Error: {error}</p>}
      {wishlistStatus === "succeeded" && (
        <ul>
          {wishlistItems.map((item) => (
            <li key={item.product._id}>
              <p>{item.product.name}</p>
              <button
                onClick={() => handleRemoveFromWishlist(item.product._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
