import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../slices/userSlice";
import { fetchUserOrders } from "../slices/orderSlice";
import { fetchWishlist } from "../slices/wishlistSlice";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/Banner";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, status, error } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
      dispatch(fetchUserOrders(userInfo?.id));
      dispatch(fetchWishlist());
    }
  }, [status, dispatch, userInfo]);

  if (status === "loading") {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (status === "failed") {
    return <div className="profile-error">Error: {error.message}</div>;
  }

  if (!userInfo) {
    return <div className="profile-error">No user data available</div>;
  }

  return (
    <div className="profile-page">
      <PageHeader title="User Profile" />
      <div className="profile-container">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="profile-info">
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Username:</strong> {userInfo.username}
            </p>
          </div>
        </div>
        <div className="profile-section">
          <h2>Recent Orders</h2>
          <div className="recent-orders">
            {orders.slice(0, 3).map((order) => (
              <div key={order._id} className="order-item">
                <p>Order #{order._id.substring(0, 5)}...</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <button className="view-all-btn" onClick={() => navigate("/orders")}>
            View All Orders
          </button>
        </div>
        <div className="profile-section">
          <h2>Wishlist</h2>
          <div className="wishlist-preview">
            {wishlistItems.slice(0, 3).map((item) => (
              <div key={item._id} className="wishlist-item">
                <img src={item.imgUrls[0].url} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <button
            className="view-all-btn"
            onClick={() => navigate("/wishlist")}
          >
            View Full Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
