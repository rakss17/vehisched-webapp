import Landing from "./pages/Landing/landing";
import DashboardOS from "./pages/OfficeStaff/DashboardOS/dashboardOS";
import Requests from "./pages/OfficeStaff/Requests/requests";
import Vehicles from "./pages/OfficeStaff/Vehicles/vehicles";
import Schedules from "./pages/OfficeStaff/Schedules/schedules";
import Drivers from "./pages/OfficeStaff/Drivers/drivers";
import DashboardR from "./pages/Requester/DashboardR/dashboardR";
import RequestForm from "./components/form/requestform";
import Request from "./pages/Requester/Request/request";
import Admin from "./pages/Admin/admin";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/DashboardOS" element={<DashboardOS />} />
            <Route path="/Requests" element={<Requests />} />
            <Route path="/Vehicles" element={<Vehicles />} />
            <Route path="/Schedules" element={<Schedules />} />
            <Route path="/Drivers" element={<Drivers />} />
            <Route path="/DashboardR" element={<DashboardR />} />
            <Route path="/RequestForm" element={<RequestForm />} />
            <Route path="/Request" element={<Request />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
