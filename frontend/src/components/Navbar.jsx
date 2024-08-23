import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  // Get the number of items in the cart
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div>
        <ul className="navbar-links">
          <li>
            <Link to="/news-events">NEWS & EVENTS</Link>
          </li>
          <li>
            <Link to="/gallery">GALLERY</Link>
          </li>
          <div>
            <Link to="/">
              <img src={logo} alt="Fan Club Logo" className="navbar-logo" />
            </Link>
          </div>
          <li>
            <Link to="/store">STORE</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="user-menu">
          <FaUser className="user-icon" />
          <div className="dropdown-content">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/order-history">Order</Link>
          </div>
        </div>
        <Link to="/wishlist" className="icon-link">
          <FaHeart />
          <span className="icon-badge">0</span>
        </Link>
        <Link to="/cart" className="icon-link">
          <FaShoppingCart />
          <span className="icon-badge">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
