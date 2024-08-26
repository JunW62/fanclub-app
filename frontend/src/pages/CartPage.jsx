import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateCartQuantity } from "../slices/cartSlice";
import PageHeader from "../components/Banner";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import "../styles/Cart.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartQuantity({ productId, quantity }));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <PageHeader title="Your Shopping Cart" />
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={item.imgUrls[0]?.url}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">
                      ${item.price.toFixed(2)} USD
                    </p>
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Total: ${calculateTotal()}</h3>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
