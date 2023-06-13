// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GardensPage from "./pages/GardensPage/GardensPage";
import GardenDetails from "./pages/GardensPage/GardenDetails";
import PlantDetails from "./pages/PlantsPage/PlantDetails"

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import AddGarden from "./pages/GardensPage/AddGarden";
import AddPlant from "./pages/PlantsPage/AddPlant";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gardens" element={<GardensPage/>} />
        <Route path="/add-garden" element={<AddGarden/>} />
        <Route path="/garden-details/:garden_id" element={<GardenDetails />} />
        <Route path="/add-plant" element={<AddPlant/>}/>
        <Route path="/plant-details/:plant_id" element={<PlantDetails />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
