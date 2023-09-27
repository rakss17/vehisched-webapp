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
import { fetchVehiclesAPI } from "../../../components/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { serverSideUrl } from "../../../components/api/api";

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
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = new WebSocket(
      "ws://localhost:8000/ws/vehicle/available/"
    );

    newSocket.onopen = (event) => {
      console.log("WebSocket connection opened");
      newSocket.send(
        JSON.stringify({
          action: "fetch_available_vehicles",
        })
      );
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data);
      if (data.type === "available.vehicles") {
        setVehiclesData(data.data);
      } else if (data.type === "status.update") {
        console.log("Received status update:", data.message);
        const plateNumber = data.data.plate_number;
        if (data.message.includes("added")) {
          setVehiclesData((prevVehicles) => [...prevVehicles, data.data]);
        } else if (data.message.includes("removed")) {
          setVehiclesData((prevVehicles) =>
            prevVehicles.filter(
              (vehicle) => vehicle.plate_number !== plateNumber
            )
          );
        }
      }
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket connection closed");
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSetTripModal = () => {
    setIsSetTripOpen(true);
    console.log("hehe");
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
