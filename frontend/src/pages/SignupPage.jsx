import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LoginAndSignup.css";
import { FaHeart } from "react-icons/fa";
import loginLogo from "../assets/login-logo.png";
import { useNavigate, Link } from "react-router-dom";

import apiUrl from "../config";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/users/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Fetching user date error occurred"
      );
      setSuccess("");
    }
  };
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="loginbox">
          <h2>Sign Up</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
              />
            </div>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <button type="submit" className="login-button">
              Sign Up
            </button>
          </form>
        </div>
        <div className="leftbox"></div>
        <div className="rightbox">
          <h2 className="signupcard-title">
            <span>Cael Anselm</span> <FaHeart /> <span>FanClub</span>
          </h2>
          <p className="tagline">WELCOME TO THE CLUB</p>
          <img src={loginLogo} alt="Signup Logo" className="login-icon" />
          <p>Already have an account?</p>
          <Link to="/login" className="signup-button">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
