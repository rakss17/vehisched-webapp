import { useState } from "react";
import Landing from "./pages/Landing/landing";
import DashboardOS from "./pages/OfficeStaff/DashboardOS/dashboardOS";
import Requests from "./pages/OfficeStaff/Requests/requests";
import Vehicles from "./pages/OfficeStaff/Vehicles/vehicles";
import Schedules from "./pages/OfficeStaff/Schedules/schedules";
import Drivers from "./pages/OfficeStaff/Drivers/drivers";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/DashboardOS" element={<DashboardOS />} />
          <Route path="/Requests" element={<Requests />} />
          <Route path="/Vehicles" element={<Vehicles />} />
          <Route path="/Schedules" element={<Schedules />} />
          <Route path="/Drivers" element={<Drivers />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
