import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../slices/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    console.log("Wishlist items:", items);
  }, [items]);

  const handleRemove = (productId) => {
    console.log("Removing item from wishlist:", productId);
    dispatch(removeFromWishlist(productId));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed")
    return <div>Error: {error?.message || "An error occurred"}</div>;

  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>
      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={typeof item === "string" ? item : item._id}>
              {typeof item === "object" &&
              item.imgUrls &&
              item.imgUrls.length > 0 ? (
                <img
                  src={item.imgUrls[0].url}
                  alt={item.name}
                  style={{ width: "100px", height: "100px" }}
                />
              ) : (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#ccc",
                  }}
                >
                  No Image
                </div>
              )}
              <div>
                <h3>
                  {typeof item === "object" ? item.name : "Product ID: " + item}
                </h3>
                <p>Price: ${typeof item === "object" ? item.price : "N/A"}</p>
                <button
                  onClick={() =>
                    handleRemove(typeof item === "string" ? item : item._id)
                  }
                >
                  Remove from Wishlist
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
