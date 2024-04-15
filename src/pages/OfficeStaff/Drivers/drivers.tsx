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
import DriverAbsence from "../../../components/maintenance/driver";
import Confirmation from "../../../components/confirmation/confirmation";
import LoadingBar from "react-top-loading-bar";

export default function Drivers() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [driversData, setDriversData] = useState<SignupParams[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifList, setNotifList] = useState<any[]>([]);
  const [isDriverCalendarOpen, setIsDriverCalendarOpen] = useState(false);
  const [driverSchedulesData, setDriverSchedules] = useState<any[]>([]);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
  const [selectedDriver, setSelectedDriver] = useState<any>();
  const [isDriverAbsenceOpen, setIsDriverAbsenceOpen] = useState(false);
  const [isConfirmationOpenDriverAbsence, setIsConfirmationOpenDriverAbsence] =
    useState(false);
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
    fetchDriversAPI(setDriversData);
  }, []);

  NotificationCreatedCancelWebsocket(
    () => {},
    () => {},
    fetchNotification,
    setNotifList,
    () => {},
    () => {},
    () => {}
  );

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

  const handleEllipsisMenu = (category: string, driver: any) => {
    setSelectedDriver(driver);
    if (category === "View Schedules") {
      setIsDriverCalendarOpen(true);
    } else if (category === "Schedule an absence") {
      setIsDriverAbsenceOpen(true);
      setIsDriverCalendarOpen(false);
    }
  };

  useEffect(() => {
    if (selectedDriver && isDriverCalendarOpen) {
      fetchDriverSchedules(setDriverSchedules, selectedDriver.id);
    }
  }, [selectedDriver, isDriverCalendarOpen]);

  const handleClose = () => {
    setIsDriverCalendarOpen(false);
    setIsDriverAbsenceOpen(false);
  };

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
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
                    status={["View Schedules", "Schedule an absence"]}
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
      <DriverAbsence
        isOpen={isDriverAbsenceOpen}
        selectedDriver={selectedDriver}
        setIsDriverAbsenceOpen={setIsDriverAbsenceOpen}
        setIsConfirmationOpenDriverAbsence={setIsConfirmationOpenDriverAbsence}
        onRequestClose={handleClose}
        setLoadingBarProgress={setLoadingBarProgress}
      />
      <Confirmation
        isOpen={isConfirmationOpenDriverAbsence}
        header="Driver scheduled for absence successfully!"
      />
    </>
  );
}
