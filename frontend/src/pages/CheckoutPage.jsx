import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../slices/orderSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const userId = useSelector((state) => state.user.userInfo.user.id);
  //   const user = useSelector((state) => state.user);

  const handlePlaceOrder = () => {
    const orderData = {
      user: userId,
      items: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
      totalPrice: cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      ),
      shippingAddress: {
        street: "123 Main St", // Replace with actual address fields from form
        city: "Somewhere",
        state: "NY",
        postalCode: "10001",
        country: "USA",
      },
      paymentMethod: "Credit Card", // Replace with actual payment method from form
      paymentStatus: "Paid", // Update based on actual payment status
    };
    console.log("Order Data:", orderData);
    console.log("User ID:", userId);
    // console.log("User state:", user);
    dispatch(placeOrder(orderData));
  };

  return (
    <div>
      <h2>Checkout</h2>
      {orderStatus === "succeeded" ? (
        <p>Order placed successfully!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id}>
              <p>
                {item.name} x {item.quantity} - ${item.price}
              </p>
            </div>
          ))}
          <button
            onClick={handlePlaceOrder}
            disabled={orderStatus === "loading"}
          >
            {orderStatus === "loading" ? "Placing Order..." : "Place Order"}
          </button>
          {orderStatus === "failed" && (
            <p>
              Error:{" "}
              {error
                ? typeof error === "string"
                  ? error
                  : JSON.stringify(error)
                : "Unknown error"}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
