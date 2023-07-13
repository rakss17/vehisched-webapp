import { useState } from "react";
import "./vehicles.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import Dropdown from "../../../components/dropdown/dropdown";
import SearchBar from "../../../components/searchbar/searchbar";
import ToyotaHilux from "../../../components/images/toyota-hilux.jpg";
import Ellipsis from "../../../components/ellipsismenu/ellipsismenu";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([1, 2, 2, 3, 2, 2, 3, 3]);
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <div className="margin-top">
          <Label label="Vehicles" />
        </div>
        <div className="vehicles-row">
          <SearchBar />
          <Dropdown status={["All", "Available", "On Trip", "Unavailable"]} />
        </div>
        <div className="vehicles-container">
          {vehicles.length === 0 ? (
            <p className="vehicles-null">No vehicles available</p>
          ) : (
            vehicles.map((vehicle) => (
              <a className="vehicle-card">
                <div className="vehicle-row">
                  <div className="vehicle-column">
                    <p className="vehicle-name">
                      KDA 1368
                      <br />
                      Toyota Hilux
                    </p>
                    <p className="vehicle-detail">Seating Capacity: 5</p>
                    <p className="vehicle-detail">Type: Pickup Truck</p>
                    <p className="vehicle-status">On trip</p>
                  </div>
                  <img className="vehicle-image" src={ToyotaHilux} />
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
