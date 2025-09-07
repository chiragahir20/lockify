import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/lockify/login.php",
        { email, password }
      );

      if (response.data.status) {
        const id = response.data.user.user_id;
        localStorage.setItem("user_id", id);
        localStorage.setItem("user_name", response.data.user.name);
        navigate("/home");
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler} className="login-form">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p className="register-link">
          <Link to="/register">Not Registered Yet?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
