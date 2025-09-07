import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact || !password || !confirmPassword || !profilePassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/lockify/register.php",
        { name, email, contact, password, profilePassword }
      );

      if (response.data.status) {
        alert("Registered Successfully");
        navigate("/login");
      } else {
        alert("Error in Registration");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={submitHandler} className="register-form">
        <h2>Create Account</h2>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contact</label>
        <input
          type="tel"
          placeholder="Enter your contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label>Profile Password</label>
        <input
          type="password"
          placeholder="Set a profile password"
          value={profilePassword}
          onChange={(e) => setProfilePassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
