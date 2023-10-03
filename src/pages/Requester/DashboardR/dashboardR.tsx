import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Container from "../../../components/container/container";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Label from "../../../components/label/label";
import "./dashboardR.css";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import CalendarInput from "../../../components/calendarinput/calendarinput";
import TimeInput from "../../../components/timeinput/timeinput";
import { SidebarItem, Vehicle } from "../../../interfaces/interfaces";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { serverSideUrl } from "../../../components/api/api";
import {
  VehicleAvailableWebsocket,
  RequestApproveWebsocket,
} from "../../../components/api/websocket";

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardR" },
  { icon: faClipboardList, text: "Request", path: "/Request" },
];

export default function DashboardR() {
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [isSetTripOpen, setIsSetTripOpen] = useState(false);
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const role = personalInfo?.role;
  const userName = personalInfo?.username;
  const navigate = useNavigate();

  useEffect(() => {
    VehicleAvailableWebsocket(setVehiclesData);
  }, []);

  RequestApproveWebsocket(userName);

  const handleSetTripModal = () => {
    setIsSetTripOpen(true);
  };

  const handleCancelTripModal = () => {
    setIsSetTripOpen(false);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(Number(key))) {
      event.preventDefault();
    }
  };
  const openRequestForm = (plateNumber: string, vehicleName: string) => {
    navigate("/RequestForm", { state: { plateNumber, vehicleName } });
  };

  const availableVehicles = vehiclesData.filter((vehicle) => {
    if (role === "requester") {
      return vehicle.status === "Available" && !vehicle.is_vip;
    } else if (role === "vip") {
      return vehicle.status === "Available" && vehicle.is_vip;
    } else {
      return false;
    }
  });

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <ToastContainer />
        <div className="margin-top-dashboard">
          <Label label="Dashboard" />
        </div>
        <div className="requester-row">
          <p>Available Vehicles</p>
          <button onClick={handleSetTripModal}>Set Trip</button>
        </div>
        <div className="requester-dashboard-container">
          {availableVehicles.length === 0 ? (
            <p className="vehicles-null">No vehicles available</p>
          ) : (
            availableVehicles.map((vehicle) => (
              <a
                onClick={() =>
                  openRequestForm(vehicle.plate_number, vehicle.vehicle_name)
                }
                className="vehicle-card"
              >
                <div className="vehicle-row">
                  <div className="vehicle-column">
                    <p className="vehicle-name">
                      {vehicle.plate_number}
                      <br></br>
                      {vehicle.vehicle_name}
                    </p>
                    <p className="vehicle-detail">
                      Seating Capacity: {vehicle.capacity}
                    </p>
                    <p className="vehicle-detail">
                      Type: {vehicle.vehicle_type}
                    </p>
                  </div>
                  <img
                    className="vehicle-image"
                    src={serverSideUrl + vehicle.vehicle_image}
                  />
                </div>
              </a>
            ))
          )}
        </div>
      </Container>
      <Modal className="modal-set-trip" isOpen={isSetTripOpen}>
        <div className="modal-set-trip-body">
          <h1>Set Trip</h1>
          <div className="date-from">
            <p>From: </p>
            <div>
              {/* <CalendarInput /> */}
              <div className="separate-time">{/* <TimeInput /> */}</div>
            </div>
          </div>
          <div className="date-to">
            <p>To: </p>
            <div>
              {/* <CalendarInput /> */}
              <div className="separate-time">{/* <TimeInput /> */}</div>
            </div>
          </div>
          <div className="number-of-pass">
            <p>
              Number of Passenger{"("}s{"):"}
            </p>
            <input type="number" onKeyDown={handleKeyDown}></input>
          </div>
          <div className="modal-button-container">
            <button onClick={handleCancelTripModal}>Cancel</button>
            <button onClick={handleSetTripModal}>Set Trip</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
