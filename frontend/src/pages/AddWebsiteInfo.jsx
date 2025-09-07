import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/AddWebsiteInfo.css";

function AddWebsiteInfo() {
  const [websiteName, setWebsiteName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!websiteName || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const id = localStorage.getItem("user_id");
      if (!id) {
        alert("User not logged in");
        return;
      }

      const data = { websiteName, username, password, id };

      const response = await axios.post(
        "http://localhost/lockify/add_website.php",
        data
      );

      if (response.data.status) {
        alert("Website Details Added Successfully");
        navigate("/home");
      } else {
        alert(response.data.message || "Error...Try Again");
      }
    } catch (e) {
      console.error(e);
      alert("Server error");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <h2>Website Information</h2>

        <label>Website Name</label>
        <input
          type="text"
          value={websiteName}
          onChange={(e) => setWebsiteName(e.target.value)}
        />

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="add-detail-button" type="submit">Add Details</button>
      </form>
    </div>
  );
}

export default AddWebsiteInfo;
