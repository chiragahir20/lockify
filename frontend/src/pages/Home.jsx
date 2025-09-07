import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";

function Home() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWebsiteData = async () => {
    try {
      const id = localStorage.getItem("user_id");
      if (!id) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost/lockify/home.php", {
        user_id: id,
      });

      if (response.data.status) {
        setResult(response.data.websites || []);
      } else {
        setError(response.data.message || "No records found.");
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setError("Server error while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteData();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="home-container">
          <Link to="/add_website" className="add-website-link">
        Add Website Information
      </Link>
     
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        result.map((w) => (
            
          <div className="hcontent" key={w.web_id}>
            <h3>{(w.web_name).toUpperCase()}</h3>
            <Link
              to={`/profile/${w.web_id}/${w.reg_id}`}
              className="view-details-link"
            >
              View details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
