import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import '../CSS/WebsiteEdit.css';

function WebsiteEdit() {
  const { wid, uid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    web_name: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current website details to prefill form
  const fetchWebsiteDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost/lockify/view_details.php", {
        user_id: uid,
        wid,
      });

      if (response.data && response.data.website) {
        setFormData({
          website_name: response.data.website.website_name || "",
          username: response.data.website.username || "",
          password: response.data.website.password || "",
        });
      } else {
        setError("Website details not found.");
      }
    } catch (e) {
      setError("Failed to fetch website details.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteDetails();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Simple validation (you can improve)
    if (!formData.website_name.trim() || !formData.username.trim() || !formData.password.trim()) {
      alert("All fields are required.");
      setSaving(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost/lockify/update_website.php", {
        user_id: uid,
        wid,
        website_name: formData.website_name,
        username: formData.username,
        password: formData.password,
      });

      if (response.data.status) {
        alert("Website updated successfully.");
        navigate(`/website/${wid}/${uid}`);
      } else {
        alert(response.data.message || "Failed to update website.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while updating.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Website Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="edit-form">
          <label>
            Website Name:
            <input
              type="text"
              name="web_name"
              value={formData.website_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <div className="button-group">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update"}
            </button>
            <Link to={`/website/${wid}/${uid}`} className="cancel-link">
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default WebsiteEdit;
