import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProfilePassword from "./pages/ProfilePassword";
import AddWebsiteInfo from "./pages/AddWebsiteInfo";
import Home from "./pages/Home";
import WebsiteDetails from "./pages/WebsiteDetails";
import WebsiteEdit from "./pages/WebsiteEdit";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("user_name");

  const logOut = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  return (
    <>
      <div className="header">
        <h1>Locify - A Secure Password Manager</h1>
        <div className="user">
        {userId && (
          <h3 className="header-user">
            Welcome {userName}
          </h3> )}
        {userId && (
          <button onClick={logOut} className="logout-btn">Logout</button>
        )}
        
       
        </div>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add_website" element={<AddWebsiteInfo />} />
          <Route path="/website/:wid/:uid" element={<WebsiteDetails />} />
          <Route path="/profile/:wid/:uid" element={<ProfilePassword />} />
          <Route path="/website/edit/:wid/:uid" element={<WebsiteEdit />} />
        </Routes>
      </div>

      <div className="footer">
        <center>
          <p>&copy; 2025 Locify. All rights reserved.</p>
        </center>
      </div>
    </>
  );
}

export default App;
