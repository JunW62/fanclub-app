import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, resetOrderStatus } from "../slices/orderSlice"; // CHANGE: Import resetOrderStatus
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/Banner";
import "../styles/global.css";
import "../styles/Checkout.css";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    // console.log("Component mounted or updated");
    // console.log("Cart Items:", cartItems);
    // console.log("Order Status:", orderStatus);
    // console.log("User Info:", userInfo);

    if (!userInfo) {
      console.log("No user info, redirecting to login");
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    console.log("Order status changed:", orderStatus);
    console.log("Is order submitted:", isOrderSubmitted);

    if (orderStatus === "succeeded" && isOrderSubmitted) {
      console.log("Order placed successfully!");
    }

    return () => {
      if (orderStatus === "succeeded" || orderStatus === "failed") {
        dispatch(resetOrderStatus());
      }
    };
  }, [orderStatus, isOrderSubmitted, dispatch]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePlaceOrder = () => {
    console.log("Attempting to place order");
    if (cartItems.length === 0) {
      console.log("Cart is empty");
      alert("Your cart is empty!");
      return;
    }

    if (!userInfo || !userInfo.id) {
      console.log("User info missing");
      alert("User information is missing. Please log in.");
      return;
    }

    const orderData = {
      user: userInfo.id,
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
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
    };

    console.log("Dispatching placeOrder with data:", orderData);
    dispatch(placeOrder(orderData));
    setIsOrderSubmitted(true);
  };

  console.log(
    "Rendering component. Order status:",
    orderStatus,
    "Is order submitted:",
    isOrderSubmitted
  );

  if (isOrderSubmitted) {
    if (orderStatus === "loading") {
      return (
        <div>
          <PageHeader title="Checkout" />
          <p>Processing your order...</p>
        </div>
      );
    }
    if (orderStatus === "succeeded") {
      return (
        <div>
          <PageHeader title="Checkout" />
          <p className="order-success">Order placed successfully!</p>
        </div>
      );
    }
    if (orderStatus === "failed") {
      return (
        <div>
          <PageHeader title="Checkout" />
          <p className="order-error">Error placing order: {error}</p>
        </div>
      );
    }
  }

  return (
    <div>
      <PageHeader title="Checkout" />
      <div className="checkout-content">
        <div className="checkout-sections">
          <div className="order-summary">
            <h2>Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="order-item">
                <img
                  src={item.imgUrls[0]?.url}
                  alt={item.name}
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: $ {item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <p className="order-total">
              Total: ${" "}
              {cartItems
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="shipping-address">
            <h2>Shipping Address</h2>
            <form className="checkout-form">
              <div className="form-group">
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code:</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </form>
          </div>
        </div>
        <div className="place-order-container">
          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={orderStatus === "loading"}
          >
            {orderStatus === "loading" ? "Placing Order..." : "Place Order"}
          </button>
        </div>
        {orderStatus === "failed" && (
          <p className="error-message">
            Error: {error ? JSON.stringify(error) : "An error occurred"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
