import { useState, useEffect } from "react";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./drivers.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";
import { SidebarItem, SignupParams } from "../../../interfaces/interfaces";
import { fetchDriversAPI } from "../../../components/api/api";

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
  { icon: faClipboardList, text: "Requests", path: "/Requests" },
  { icon: faCar, text: "Vehicles", path: "/Vehicles" },
  { icon: faCalendarAlt, text: "Schedules", path: "/Schedules" },
  { icon: faUser, text: "Drivers", path: "/Drivers" },
];

export default function Drivers() {
  const [drivers, setDrivers] = useState<SignupParams[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchDriversAPI(setDrivers);
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredDriverList = drivers.filter((driver) => {
    const isCategoryMatch =
      selectedCategory === null || driver.status === selectedCategory;

    const isSearchMatch =
      searchTerm === "" ||
      driver.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.user.middle_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      driver.status.toLowerCase().includes(searchTerm.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

  const handleCategoryChange = (status: string) => {
    setSelectedCategory(status === "All" ? null : status);
  };

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <div className="margin-top-drivers">
          <Label label="Drivers" />
        </div>
        <div className="drivers-row">
          <SearchBar onSearchChange={handleSearchChange} />
          <Dropdown
            status={["All", "Available", "On Trip", "Unavailable"]}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="drivers-container">
          {filteredDriverList.length === 0 ? (
            <p className="drivers-null">No drivers available</p>
          ) : (
            filteredDriverList.map((driver) => (
              <a className="driver-card">
                <div className="driver-card-column">
                  <p className="driver-name">
                    {driver.user.last_name}, {driver.user.first_name}{" "}
                    {driver.user.middle_name}
                  </p>
                  <p className="driver-status">{driver.status}</p>
                </div>
              </a>
            ))
          )}
        </div>
      </Container>
    </>
  );
}
