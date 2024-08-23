import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser } from "../slices/orderSlice";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrdersByUser(userId));
    }
  }, [status, dispatch, userId]);

  return (
    <div>
      <h2>Your Orders</h2>
      {status === "loading" && <p>Loading orders...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
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
