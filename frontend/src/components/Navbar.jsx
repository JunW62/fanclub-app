import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { logout, fetchUserProfile } from "../slices/userSlice";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.user, shallowEqual);
  const cartItems = useSelector((state) => state.cart.items, shallowEqual);

  const [showDropdown, setShowDropdown] = useState(false);

  const fetchData = useCallback(() => {
    if (token && !userInfo) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token, userInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (token && !userInfo) {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (storedUserInfo) {
        dispatch({ type: "user/setUserInfo", payload: storedUserInfo });
      } else {
        dispatch(fetchUserProfile());
      }
    }
  }, [dispatch, token, userInfo]);

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate("/");
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const isAdminUser = userInfo && userInfo.id === "66cce58ffdcff37d745b4066";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Fan Club Logo" className="navbar-logo" />
          <h1>
            <span>Cael Anselm</span>
            <br /> Fan Club
          </h1>
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/news-events">NEWS</Link>
          </li>
          <li>
            <Link to="/gallery">GALLERY</Link>
          </li>

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
          {userInfo ? (
            <div>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="user-button"
              >
                {(userInfo.username || userInfo.email).charAt(0).toUpperCase() +
                  (userInfo.username || userInfo.email).slice(1)}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    PROFILE
                  </Link>
                  <Link to="/orders" onClick={() => setShowDropdown(false)}>
                    ORDERS
                  </Link>
                  {isAdminUser && (
                    <Link
                      to="/manage-products"
                      onClick={() => setShowDropdown(false)}
                    >
                      PRODUCTS
                    </Link>
                  )}
                  <button onClick={handleLogout}>LOGOUT</button>
                </div>
              )}
            </div>
          ) : (
            <div className="user-menu">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="user-button"
              >
                <FaUser />
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/login" onClick={() => setShowDropdown(false)}>
                    LOGIN
                  </Link>
                  <Link to="/signup" onClick={() => setShowDropdown(false)}>
                    SIGN UP
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <Link to="/wishlist" className="icon-link">
          <FaHeart />
        </Link>
        <Link to="/cart" className="icon-link">
          <FaShoppingCart />
          {cartItemCount > 0 && (
            <span className="item-count">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
