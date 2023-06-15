import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/user_cars", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars();
  }, [token]);



  return (
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.username}!</h1>


      <Link to="/gardens">
        <p>Go To GardensPage</p>
      </Link>

      
      <Link to="/plants">
        <p>Go To PlantsPage</p>
      </Link>

      <Link to="/tasks">
        <p>Go To TasksPage</p>
      </Link>

      <Link to="/harvests">
        <p>Go To HarvestsPage</p>
      </Link>

      <Link to="/user-gardens">
        <p>Go to User Gardens</p>
      </Link>

      <Link to="/weather-page">
        <p>Go to WeatherPage</p>
      </Link>

      


    </div>





  );
};

export default HomePage;