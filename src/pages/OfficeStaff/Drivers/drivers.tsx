import { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./drivers.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";

interface Driver {
  id: number;
  driver_name: string;
  capacity: number;
  vehicle_type: string;
  vehicle_image: string;
  status: string;
}
export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const fetchedDriverList = () => {
    // setDrivers(fetchedDrivers);
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
      <Sidebar />
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
      </Container>
    </>
  );
}
