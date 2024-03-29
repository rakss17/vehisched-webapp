import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
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
import AccountActivated from "./pages/Activated/accountactivated";
import Unauthorized from "./pages/Error/unauthorized";
import NotFound from "./pages/Error/notfound";
import ResetPasswordConfirm from "./pages/ResetPassword/resetPasswordConfirm";

function ProtectedRoute({
  allowedRoles,
  children,
}: {
  path: string;
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const userRole = personalInfo?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/Unauthorized" />;
  }

  return children;
}

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/AccountActivated" element={<AccountActivated />} />

              <Route
                path="/DashboardOS"
                element={
                  <ProtectedRoute
                    path="/DashboardOS"
                    allowedRoles={["office staff"]}
                  >
                    <DashboardOS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Requests"
                element={
                  <ProtectedRoute
                    path="/Requests"
                    allowedRoles={["office staff"]}
                  >
                    <Requests />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Vehicles"
                element={
                  <ProtectedRoute
                    path="/Vehicles"
                    allowedRoles={["office staff"]}
                  >
                    <Vehicles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Schedules"
                element={
                  <ProtectedRoute
                    path="/Schedules"
                    allowedRoles={["office staff"]}
                  >
                    <Schedules />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Drivers"
                element={
                  <ProtectedRoute
                    path="/Drivers"
                    allowedRoles={["office staff"]}
                  >
                    <Drivers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/DashboardR"
                element={
                  <ProtectedRoute
                    path="/DashboardR"
                    allowedRoles={["requester", "vip"]}
                  >
                    <DashboardR />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/RequestForm"
                element={
                  <ProtectedRoute
                    path="/RequestForm"
                    allowedRoles={["requester", "vip", "office staff"]}
                  >
                    <RequestForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Request"
                element={
                  <ProtectedRoute
                    path="/Request"
                    allowedRoles={["requester", "vip"]}
                  >
                    <Request />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Admin"
                element={
                  <ProtectedRoute
                    path="/Admin"
                    allowedRoles={["admin", "office staff"]}
                  >
                    <Admin />
                  </ProtectedRoute>
                }
              />

              <Route path="/Unauthorized" element={<Unauthorized />} />
              <Route
                path="/ResetPassword/:uid/:token"
                element={<ResetPasswordConfirm />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
