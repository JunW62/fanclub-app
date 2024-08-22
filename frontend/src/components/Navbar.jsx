import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
// import CartButton from "./CartButton";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
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
        <Link to="/login-signup" className="icon-link">
          LOGIN / REGISTER
        </Link>
        <Link to="/wishlist" className="icon-link">
          <FaHeart />
          <span className="icon-badge">0</span>
          <span>Wishlist</span>
        </Link>
        <Link to="/cart" className="icon-link">
          <FaShoppingCart />
          <span>$0.00 USD</span>
          <span className="icon-badge">0</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
