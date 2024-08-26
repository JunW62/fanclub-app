import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../slices/orderSlice";
import PageHeader from "../components/Banner";
import "../styles/global.css";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const userId = useSelector((state) => state.user.userInfo.user.id);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      userId,
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      shippingAddress,
    };
    dispatch(placeOrder(order));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="checkout-page">
      <PageHeader title="Checkout" />
      <div className="checkout-content">
        {orderStatus === "succeeded" ? (
          <p className="order-success">Order placed successfully!</p>
        ) : (
          <form onSubmit={handleSubmit} className="checkout-form">
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
                      <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="order-total">
                  <h3>Total: ${calculateTotal()}</h3>
                </div>
              </div>
              <div className="shipping-address">
                <h2>Shipping Address</h2>
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
              </div>
            </div>
            <div className="place-order-container">
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </div>
          </form>
        )}
        {orderStatus === "failed" && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CheckoutPage;
