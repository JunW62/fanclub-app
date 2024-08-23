import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

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

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.imgUrls[0]?.url}
                alt={item.name}
                style={{ width: "100px", height: "100px" }}
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className="quantity-control">
                  <label htmlFor={`quantity-${item._id}`}>Quantity: </label>
                  <input
                    type="number"
                    id={`quantity-${item._id}`}
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
                  />
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${calculateTotal()}</h3>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
