import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser } from "../slices/orderSlice";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (userInfo?.id) {
      // Dispatch an action to fetch the user's orders
      dispatch(fetchOrdersByUser(userInfo.id));
    }
  }, [userInfo, dispatch]);

  return (
    <div>
      <h2>Your Orders</h2>
      {status === "loading" && <p>Loading orders...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && orders.length === 0 && <p>No orders found.</p>}
      {status === "succeeded" && orders.length > 0 && (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order {order._id}</h3>
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Total: ${order.totalPrice.toFixed(2)}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.product}>
                    {item.name} x {item.quantity} - ${item.total.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
