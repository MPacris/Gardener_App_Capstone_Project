// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GardensPage from "./pages/GardensPage/GardensPage";
import GardenDetails from "./pages/GardensPage/GardenDetails";
import PlantsPage from "./pages/PlantsPage/PlantsPage";
import PlantDetails from "./pages/PlantsPage/PlantDetails"
import TaskDetails from "./pages/TasksPage/TaskDetails";
import TasksPage from "./pages/TasksPage/TasksPage";
import HarvestsPage from "./pages/HarvestsPage/HarvestsPage";
import HarvestDetails from "./pages/HarvestsPage/HarvestDetails";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import AddGarden from "./pages/GardensPage/AddGarden";
import AddPlant from "./pages/PlantsPage/AddPlant";
import CreateTask from "./pages/TasksPage/CreateTask";
import CreateHarvest from "./pages/HarvestsPage/CreateHarvest";




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
        <Route path="/plants" element={<PlantsPage />} /> 
        <Route path="/tasks" element={<TasksPage/>} />
        <Route path="/task-details/:task_id" element={<TaskDetails/>} />
        <Route path="/create-task" element={<CreateTask/>} />
        <Route path="/harvests" element={<HarvestsPage/>}/>
        <Route path="/harvest-details/:harvest_id" element={<HarvestDetails/>}/>
        <Route path="/create-harvest" element={<CreateHarvest/>}/>



      </Routes>
      <Footer />
    </div>
  );
}

export default App;
