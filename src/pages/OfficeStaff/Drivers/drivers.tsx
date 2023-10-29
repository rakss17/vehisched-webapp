import { useState, useEffect } from "react";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./drivers.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";
import { SidebarItem, SignupParams } from "../../../interfaces/interfaces";
import {
  fetchDriversAPI,
  fetchNotification,
  fetchDriverSchedules,
} from "../../../components/api/api";
import { NotificationCreatedCancelWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarModal from "../../../components/calendar/calendarmodal";
import Ellipsis from "../../../components/ellipsismenu/ellipsismenu";

export default function Drivers() {
  const [driversData, setDriversData] = useState<SignupParams[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifList, setNotifList] = useState<any[]>([]);
  const [isDriverCalendarOpen, setIsDriverCalendarOpen] = useState(false);
  const [driverSchedulesData, setDriverSchedules] = useState<any[]>([]);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
  const [selectedDriver, setSelectedDriver] = useState<any>();
  const sidebarData: SidebarItem[] = [
    { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
    {
      icon: faClipboardList,
      text: "Requests",
      path: "/Requests",
      notification: notifLength >= 1 ? notifLength : undefined,
    },
    { icon: faCar, text: "Vehicles", path: "/Vehicles" },
    { icon: faCalendarAlt, text: "Schedules", path: "/Schedules" },
    { icon: faUser, text: "Drivers", path: "/Drivers" },
    { icon: faUsersCog, text: "Administration", path: "/Admin" },
  ];
  useEffect(() => {
    fetchNotification(setNotifList);
  }, []);

  useEffect(() => {
    fetchDriversAPI(setDriversData);
  }, []);

  useEffect(() => {
    NotificationCreatedCancelWebsocket();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredDriverList = driversData.filter((driver) => {
    const isSearchMatch =
      searchTerm === "" ||
      driver.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.middle_name.toLowerCase().includes(searchTerm.toLowerCase());

    return isSearchMatch;
  });

  const handleEllipsisMenu = (category: string, vehicle: any) => {
    setSelectedDriver(vehicle);
    if (category === "View Schedules") {
      setIsDriverCalendarOpen(true);
    }
  };

  useEffect(() => {
    if (selectedDriver && isDriverCalendarOpen) {
      fetchDriverSchedules(setDriverSchedules, selectedDriver.id);
    }
  }, [selectedDriver, isDriverCalendarOpen]);

  const handleClose = () => {
    setIsDriverCalendarOpen(false);
  };

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <ToastContainer />
        <div className="margin-top-drivers">
          <Label label="Drivers" />
        </div>
        <div className="drivers-row">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        <div className="drivers-container">
          {filteredDriverList.length === 0 ? (
            <p className="drivers-null">No drivers available</p>
          ) : (
            filteredDriverList.map((driver) => (
              <a key={driver.id} className="driver-card">
                <div className="driver-ellipsis-container">
                  <Ellipsis
                    onCategoryChange={(category) =>
                      handleEllipsisMenu(category, driver)
                    }
                    status={["View Schedules"]}
                  />
                </div>
                <div className="driver-card-column">
                  <p className="driver-name">
                    {driver.last_name}, {driver.first_name} {driver.middle_name}
                  </p>
                  <p className="driver-status">{driver.mobile_number}</p>

                  <p className="driver-status">{driver.status}</p>
                </div>
              </a>
            ))
          )}
        </div>
      </Container>
      <CalendarModal
        isOpen={isDriverCalendarOpen}
        selectedSchedule={driverSchedulesData}
        onRequestClose={handleClose}
      />
    </>
  );
}
