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
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Gardening App</b>
          </Link>
        </li>
    
   
        <li>
          <Link to="/plants" style={{ fontSize: "0.8em", textDecoration: "none", color: "white" }}>
            PlantsPage
          </Link>
        </li>
        <li>
          <Link to="/tasks" style={{ fontSize: "0.8em", textDecoration: "none", color: "white" }}>
            TasksPage
          </Link>
        </li>
        <li>
          <Link to="/harvests" style={{ fontSize: "0.8em", textDecoration: "none", color: "white" }}>
            HarvestsPage
          </Link>
        </li>
 
        <li>
          <Link to="/weather-page" style={{ fontSize: "0.8em", textDecoration: "none", color: "white" }}>
            WeatherPage
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