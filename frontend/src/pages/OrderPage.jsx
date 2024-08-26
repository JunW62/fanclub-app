import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../slices/orderSlice";
import PageHeader from "../components/Banner";
import "../styles/Order.css";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      console.log("Dispatching fetchUserOrders with ID:", userInfo.id);
      dispatch(fetchUserOrders(userInfo.id));
    }
  }, [dispatch, userInfo]);

  if (status === "loading")
    return <div className="order-history-loading">Loading orders...</div>;
  if (status === "failed")
    return <div className="order-history-error">Error: {error}</div>;

  return (
    <div className="order-history-page">
      <PageHeader title="My Orders" />
      <div className="order-history-list">
        {orders.length === 0 ? (
          <p className="order-history-no-orders">
            You haven't placed any orders yet.
          </p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-history-item">
              <div className="order-history-header">
                <h3>Order #{order._id}</h3>
                <p className="order-history-date">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="order-history-details">
                {order.items.map((item) => (
                  <div key={item._id} className="order-history-product">
                    <img
                      src={item.product?.imgUrls[0]?.url}
                      alt={item.product?.name}
                      className="order-history-product-image"
                    />
                    <div className="order-history-product-info">
                      <h4>{item.product?.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.product?.price?.toFixed(2) || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-history-summary">
                <p className="order-history-total">
                  Total: ${order.totalPrice?.toFixed(2) || "N/A"}
                </p>
                <p className="order-history-status">Status: {order.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderPage;
