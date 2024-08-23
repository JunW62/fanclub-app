import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../slices/orderSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const userId = useSelector((state) => state.user.userInfo.user.id);
  //   const user = useSelector((state) => state.user);

  // State for form fields
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

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
      shippingAddress,
      paymentMethod: "Credit Card", // Default payment method
      paymentStatus: "Paid", // Mark as paid for demo purposes
    };
    // console.log("Order Data:", orderData);
    // console.log("User ID:", userId);
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
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item._id}>
              <p>
                {item.name} x {item.quantity} - ${item.price}
              </p>
            </div>
          ))}

          {/* Shipping Address Form */}
          <h3>Shipping Address</h3>
          <form>
            <div>
              <label>Street:</label>
              <input
                type="text"
                name="street"
                value={shippingAddress.street}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={shippingAddress.state}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div>
              <label>Postal Code:</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleAddressChange}
                required
              />
            </div>
          </form>

          {/* Place Order Button */}
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
