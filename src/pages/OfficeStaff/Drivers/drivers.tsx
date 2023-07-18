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

type SidebarItem = {
  icon: any;
  text: string;
  path: string;
};

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
  { icon: faClipboardList, text: "Requests", path: "/Requests" },
  { icon: faCar, text: "Vehicles", path: "/Vehicles" },
  { icon: faCalendarAlt, text: "Schedules", path: "/Schedules" },
  { icon: faUser, text: "Drivers", path: "/Drivers" },
];

interface Driver {
  id: number;
  driver_name: string;
  status: string;
}
const fetchedDrivers: Driver[] = [
  {
    id: 1,
    driver_name: "Ambulo, Bohari S.",
    status: "On Trip",
  },
  {
    id: 2,
    driver_name: "Araquil, Tristan C.",
    status: "Available",
  },
  {
    id: 3,
    driver_name: "Lorejo, Mark Dave M.",
    status: "Unavailable",
  },
  {
    id: 4,
    driver_name: "Romeo, Michael Ray V.",
    status: "On Trip",
  },
  {
    id: 5,
    driver_name: "Ibahay, Mike Emmanuel ",
    status: "Unavailable",
  },
  {
    id: 6,
    driver_name: "Gabut, Anton Joseph C. ",
    status: "Available",
  },
  {
    id: 7,
    driver_name: "Abragan, Juren Roy R. ",
    status: "On Trip",
  },
  {
    id: 8,
    driver_name: "Ednilan, Jonathan B. ",
    status: "Unavailable",
  },
  {
    id: 9,
    driver_name: "Genson, Edmar J. ",
    status: "On Trip",
  },
  {
    id: 10,
    driver_name: "Iligan, CJ Andrey B.",
    status: "Available",
  },
  {
    id: 11,
    driver_name: "Engracia, Jayde Mike",
    status: "Available",
  },
  {
    id: 12,
    driver_name: "Magdugo, Bon C.",
    status: "Unavailable",
  },
];
export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const fetchedDriverList = () => {
    setDrivers(fetchedDrivers);
  };

  useEffect(() => {
    fetchedDriverList();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredDriverList = drivers.filter((driver) => {
    const isCategoryMatch =
      selectedCategory === null || driver.status === selectedCategory;

    const isSearchMatch =
      searchTerm === "" ||
      driver.driver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                  <p className="driver-name">{driver.driver_name}</p>
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
