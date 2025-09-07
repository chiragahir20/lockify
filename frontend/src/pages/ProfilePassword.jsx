import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../CSS/ProfilePassword.css';


function ProfilePassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { wid, uid } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      alert("Please enter your profile password.");
      return;
    }
    setLoading(true);
    try {
      const id = localStorage.getItem("user_id");
      const response = await axios.post(
        "http://localhost/lockify/profile_password.php",
        {
          password,
          user_id: id,
        }
      );
      console.log("Response from PHP:", response.data);
      

      if (response.data.status) {
        navigate(`/website/${wid}/${uid}`);
      } else {
        alert("Invalid Profile Password");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <form onSubmit={submitHandler} style={{ maxWidth: "400px", margin: "auto" }}>
        <h2>Profile Password*</h2>
        <div className="form-group">
          <label htmlFor="password">Profile Password *</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group" style={{ textAlign: "center", marginTop: "15px" }}>
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default ProfilePassword;
