import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
        <Link to="/" style={{ textDecoration: "none", color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", outline: "2px solid white" }}>
            <b>The Gardening App</b>
          </Link>
        </li>
    
   
        <li>
          <Link to="/plants" style={{ fontSize: "0.8em", textDecoration: "none", color: "white" }}>
            Plants List
          </Link>
        </li>
        <li>
          <Link to="/tasks" style={{ fontSize: "0.8em", textDecoration: "none", color: "white" }}>
            My Tasks
          </Link>
        </li>
        <li>
          <Link to="/harvests" style={{ fontSize: "0.8em", textDecoration: "none", color: "white" }}>
            Harvest Tracker
          </Link>
        </li>
 
        <li>
          <Link to="/weather-page" style={{ fontSize: "0.8em", textDecoration: "none", color: "white" }}>
            Weather 
          </Link>
        </li>

        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;