import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../slices/userSlice";
import { FaHeart } from "react-icons/fa";
import "../styles/LoginAndSignup.css";
import signupLogo from "../assets/signup-logo.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, status, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="loginbox">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            {/* {error && <p className="error">{error}</p>} */}
            {status === "loading" && <p>Logging in...</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <div className="leftbox"></div>
        <div className="rightbox">
          <h2 className="signupcard-title">
            <span>Cael Anselm</span> <FaHeart /> <span>FanClub</span>
          </h2>
          <p className="tagline">JOIN US TODAY</p>
          <img src={signupLogo} alt="Signup Logo" className="signup-icon" />
          <p>Don&apos;t have an account?</p>
          <Link to="/signup" className="signup-button">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
