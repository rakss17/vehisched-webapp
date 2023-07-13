import { useState, useEffect } from "react";
import "./vehicles.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import Dropdown from "../../../components/dropdown/dropdown";
import SearchBar from "../../../components/searchbar/searchbar";
import ToyotaHilux from "../../../components/images/toyota-hilux.jpg";
import MitsubishiMontero from "../../../components/images/mitsubishi-montero.jpg";
import Fortuner from "../../../components/images/fortuner.jpg";
import ToyotaHiace from "../../../components/images/toyota-hiace.png";
import Ellipsis from "../../../components/ellipsismenu/ellipsismenu";

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

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchedVehicleList = () => {
    setVehicles(fetchedVehicles);
  };

  useEffect(() => {
    fetchedVehicleList();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredVehicleList = vehicles.filter((vehicle) => {
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

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <div className="margin-top">
          <Label label="Vehicles" />
        </div>
        <div className="vehicles-row">
          <SearchBar onSearchChange={handleSearchChange} />
          <Dropdown
            status={["All", "Available", "On Trip", "Unavailable"]}
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
                    <p className="vehicle-status">{vehicle.status}</p>
                  </div>
                  <img className="vehicle-image" src={vehicle.vehicle_image} />
                  <Ellipsis status={["Set Status", "Unavailable"]} />
                </div>
              </a>
            ))
          )}
        </div>
      </Container>
    </>
  );
}
