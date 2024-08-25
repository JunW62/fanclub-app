import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };

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
        <Link to="/wishlist" className="icon-link">
          <FaHeart />
          Wishlist
        </Link>
        <Link to="/cart" className="icon-link">
          <FaShoppingCart />
          Cart
        </Link>
        <div className="user-menu">
          {userInfo ? (
            <div>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="user-button"
              >
                {userInfo.username}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    Profile
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="icon-link">
              <FaUser />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
