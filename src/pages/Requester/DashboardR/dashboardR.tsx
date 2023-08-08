import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Container from "../../../components/container/container";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Label from "../../../components/label/label";
import "./dashboardR.css";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import ToyotaHilux from "../../../components/images/toyota-hilux.jpg";
import MitsubishiMontero from "../../../components/images/mitsubishi-montero.jpg";
import Fortuner from "../../../components/images/fortuner.jpg";
import ToyotaHiace from "../../../components/images/toyota-hiace.png";
import CalendarInput from "../../../components/calendarinput/calendarinput";
import TimeInput from "../../../components/timeinput/timeinput";

type SidebarItem = {
  icon: any;
  text: string;
  path: string;
};

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardR" },
  { icon: faClipboardList, text: "Request", path: "/Request" },
];

interface Vehicle {
  id: number;
  vehicle_name: string;
  capacity: number;
  vehicle_type: string;
  vehicle_image: string;
  status: string;
}
const fetchedVehicles: Vehicle[] = [
  {
    id: 1,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: ToyotaHilux,
    status: "On Trip",
  },
  {
    id: 2,
    vehicle_name: "KCU 2522 Montero Sport",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: MitsubishiMontero,
    status: "Available",
  },
  {
    id: 3,
    vehicle_name: "KAB 2855 Fortuner",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: Fortuner,
    status: "On Trip",
  },
  {
    id: 4,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: ToyotaHiace,
    status: "Available",
  },
  {
    id: 5,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: ToyotaHilux,
    status: "Unavailable",
  },
  {
    id: 6,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: ToyotaHiace,
    status: "Unavailable",
  },
];
export default function DashboardR() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isSetTripOpen, setIsSetTripOpen] = useState(false);
  const navigate = useNavigate();

  const fetchedVehicleList = () => {
    setVehicles(fetchedVehicles);
  };

  useEffect(() => {
    fetchedVehicleList();
  }, []);

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
  const openRequestForm = () => {
    navigate("/RequestForm");
  };

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
          {vehicles.length === 0 ? (
            <p className="vehicles-null">No vehicles available</p>
          ) : (
            vehicles.map((vehicle) => (
              <a onClick={openRequestForm} className="vehicle-card">
                <div className="vehicle-row">
                  <div className="vehicle-column">
                    <p className="vehicle-name">{vehicle.vehicle_name}</p>
                    <p className="vehicle-detail">
                      Seating Capacity: {vehicle.capacity}
                    </p>
                    <p className="vehicle-detail">
                      Type: {vehicle.vehicle_type}
                    </p>
                  </div>
                  <img className="vehicle-image" src={vehicle.vehicle_image} />
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
              <CalendarInput />
              <div className="separate-time">
                <TimeInput />
              </div>
            </div>
          </div>
          <div className="date-to">
            <p>To: </p>
            <div>
              <CalendarInput />
              <div className="separate-time">
                <TimeInput />
              </div>
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
