import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import '../CSS/WebsiteDetails.css';


function WebsiteDetails() {
  const { wid, uid } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);


  const fetchWebsiteDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost/lockify/view_details.php",
        {
          user_id: uid,
          wid,
        }
      );
      if (response.data && response.data.website) {
        setResult(response.data.website);
      } else {
        setResult(null);
        setError("No website details found.");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to fetch website details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteDetails();
  }, []);

const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this website?")) return;

    try {
      setDeleting(true);
      const response = await axios.post("http://localhost/lockify/delete_website.php", {
        user_id: uid,
        wid,
      });

      if (response.data.status) {
        alert("Website deleted successfully.");
        navigate("/home");
      } else {
        alert(response.data.message || "Failed to delete website.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while deleting.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="vcontent">
      {loading && <p>Loading website details...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && result && (
        <>
          <h3>{(result.website_name).toUpperCase() || "Website Name Not Available"}</h3>
          <p>
            Username: <b>{result.username || "N/A"}</b>
          </p>
          <p>
            Password: <b>{result.password || "N/A"}</b>
          </p>
          <br />
           <div className="button-group">
            <Link to={`/website/edit/${wid}/${uid}`} className="btn update-btn">
              Update
            </Link>
            <button
              className="btn delete-btn"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
          <Link to="/home" className="back-link">
            &larr; Back to Home Page
          </Link>
        </>
      )}
    </div>
  );
}

export default WebsiteDetails;
