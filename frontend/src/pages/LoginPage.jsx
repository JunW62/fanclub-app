import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const apiUril = "http://localhost:3000";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form with:", formData);
    try {
      const response = await axios.post(`${apiUril}/api/users/login`, {
        email: formData.email,
        password: formData.password,
      });

      setSuccess(response.data.message);
      setError("");
      // Redirect to profile page after successful login
      history.push("/profile");

      // Store the token in localStorage or sessionStorage
      localStorage.setItem("token", response.data.token);

      // Optionally, redirect the user after successful login
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
