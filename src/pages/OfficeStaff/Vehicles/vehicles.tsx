import { useState, useEffect } from "react";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./vehicles.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import Dropdown from "../../../components/dropdown/dropdown";
import SearchBar from "../../../components/searchbar/searchbar";
import ToyotaHilux from "../../../assets/toyota-hilux.jpg";
import MitsubishiMontero from "../../../assets/mitsubishi-montero.jpg";
import Fortuner from "../../../assets/fortuner.jpg";
import ToyotaHiace from "../../../assets/toyota-hiace.png";
import Ellipsis from "../../../components/ellipsismenu/ellipsismenu";
import { SidebarItem, Vehicle } from "../../../interfaces/interfaces";
import { fetchVehiclesAPI } from "../../../components/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
  { icon: faClipboardList, text: "Requests", path: "/Requests" },
  { icon: faCar, text: "Vehicles", path: "/Vehicles" },
  { icon: faCalendarAlt, text: "Schedules", path: "/Schedules" },
  { icon: faUser, text: "Drivers", path: "/Drivers" },
];

export default function Vehicles() {
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const vehicles = useSelector((state: RootState) => state.vehiclesData.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehiclesAPI() as any);
  }, [dispatch]);

  useEffect(() => {
    setVehiclesData(vehicles);
  }, [vehicles]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredVehicleList = vehiclesData.filter((vehicle) => {
    const isCategoryMatch =
      selectedCategory === null || vehicle.status === selectedCategory;

    const isSearchMatch =
      searchTerm === "" ||
      vehicle.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

  const handleCategoryChange = (status: string) => {
    setSelectedCategory(status === "All" ? null : status);
  };
  const handleEllipsisMenu = (category: string) => {
    if (category === "Unavailable") {
      alert("clicked unavailable");
    }
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Available":
        return "green";
      case "On trip":
        return "#060e57";
      case "Unavailable":
        return "red";
      default:
        return "black";
    }
  };
  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <div className="margin-top-vehicles">
          <Label label="Vehicles" />
        </div>
        <div className="vehicles-row">
          <SearchBar onSearchChange={handleSearchChange} />
          <Dropdown
            status={["All", "Available", "On Trip", "Reserved", "Unavailable"]}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="vehicles-container">
          {filteredVehicleList.length === 0 ? (
            <p className="vehicles-null">No vehicles available</p>
          ) : (
            filteredVehicleList.map((vehicle) => (
              <a className="vehicle-card">
                <div className="vehicle-row">
                  <div className="vehicle-column">
                    <p className="vehicle-name">{vehicle.vehicle_name}</p>
                    <p className="vehicle-detail">
                      Seating Capacity: {vehicle.capacity}
                    </p>
                    <p className="vehicle-detail">
                      Type: {vehicle.vehicle_type}
                    </p>
                    <p
                      className="vehicle-status"
                      style={{
                        color: getStatusColor(vehicle.status),
                      }}
                    >
                      {vehicle.status}
                    </p>
                  </div>
                  <img className="vehicle-image" src={vehicle.vehicle_image} />
                  <div className="ellipsis-container">
                    <Ellipsis
                      onCategoryChange={handleEllipsisMenu}
                      status={["Set Status", "Unavailable"]}
                    />
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </Container>
    </>
  );
}
