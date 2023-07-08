import { useState } from "react";
import Landing from "./pages/Landing/landing";
import DashboardOS from "./pages/OfficeStaff/DashboardOS/dashboardOS";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/DashboardOS" element={<DashboardOS />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
