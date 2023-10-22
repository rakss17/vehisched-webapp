import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import "./vehicles.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import Dropdown from "../../../components/dropdown/dropdown";
import SearchBar from "../../../components/searchbar/searchbar";
import Ellipsis from "../../../components/ellipsismenu/ellipsismenu";
import PromptDialog from "../../../components/promptdialog/prompdialog";
import Confirmation from "../../../components/confirmation/confirmation";
import { SidebarItem, Vehicle } from "../../../interfaces/interfaces";
import {
  fetchVehiclesAPI,
  toggleVehicleStatusAPI,
  fetchNotification,
  fetchVehicleSchedules,
} from "../../../components/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { NotificationCreatedCancelWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarModal from "../../../components/calendar/calendarmodal";
import VehicleMaintenance from "../../../components/maintenance/vehicle";

export default function Vehicles() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [vehicleSchedulesData, setVehicleSchedules] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>();
  const [isAvailableOpen, setIsAvailableOpen] = useState(false);
  const [isUnavailableOpen, setIsUnavailableOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationOpenUnavailable, setIsConfirmationOpenUnavailable] =
    useState(false);
  const [isVehicleCalendarOpen, setIsVehiclCalendarOpen] = useState(false);
  const [isVehicleMaintenanceOpen, setIsVehicleMaintenanceOpen] = useState(true)
  const vehicleId = selectedVehicle?.plate_number ?? "";
  const vehicles = useSelector((state: RootState) => state.vehiclesData.data);
  const dispatch = useDispatch();
  const [notifList, setNotifList] = useState<any[]>([]);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
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
    dispatch(fetchVehiclesAPI() as any);
  }, [dispatch]);

  useEffect(() => {
    setVehiclesData(vehicles);
  }, [vehicles]);

  useEffect(() => {
    NotificationCreatedCancelWebsocket();
  }, []);

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
  const handleEllipsisMenu = (category: string, vehicle: any) => {
    setSelectedVehicle(vehicle);
    if (category === "View Schedules") {
      setIsVehiclCalendarOpen(true);
    }
  };

  useEffect(() => {
    if (selectedVehicle && isVehicleCalendarOpen) {
      fetchVehicleSchedules(setVehicleSchedules, selectedVehicle.plate_number);
    }
  }, [selectedVehicle, isVehicleCalendarOpen]);

  const handleAvailableButton = () => {
    setLoadingBarProgress(20);
    setIsAvailableOpen(false);
    toggleVehicleStatusAPI(
      vehicleId,
      setIsConfirmationOpen,
      setIsConfirmationOpenUnavailable,
      setLoadingBarProgress
    );
  };
  const handleUnavailableButton = () => {
    setLoadingBarProgress(20);
    setIsUnavailableOpen(false);
    toggleVehicleStatusAPI(
      vehicleId,
      setIsConfirmationOpen,
      setIsConfirmationOpenUnavailable,
      setLoadingBarProgress
    );
  };

  const handleClose = () => {
    setIsAvailableOpen(false);
    setIsUnavailableOpen(false);
    setIsVehiclCalendarOpen(false);
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
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <ToastContainer />
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
              <a key={vehicle.plate_number} className="vehicle-card">
                <div className="vehicle-row">
                  <div className="vehicle-column">
                    <p className="vehicle-name">
                      {vehicle.plate_number}
                      <br></br> {vehicle.vehicle_name}
                    </p>
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
                      onCategoryChange={(category) =>
                        handleEllipsisMenu(category, vehicle)
                      }
                      status={["View Schedules", "Schedule a maintenance"]}
                    />
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </Container>
      <PromptDialog
        isOpen={isAvailableOpen}
        content="Set status to available?"
        buttonText1="Yes"
        buttonText2="No"
        onRequestClose={handleClose}
        onRequestDelete={handleAvailableButton}
      />
      <Confirmation
        isOpen={isConfirmationOpen}
        header="Vehicle status set to available!"
      />

      <PromptDialog
        isOpen={isUnavailableOpen}
        content="Set status to unavailable?"
        buttonText1="Yes"
        buttonText2="No"
        onRequestClose={handleClose}
        onRequestDelete={handleUnavailableButton}
      />
      <Confirmation
        isOpen={isConfirmationOpenUnavailable}
        header="Vehicle status set to unavailable!"
      />
      <CalendarModal
        isOpen={isVehicleCalendarOpen}
        selectedSchedule={vehicleSchedulesData}
        onRequestClose={handleClose}
      />
      <VehicleMaintenance isOpen={isVehicleMaintenanceOpen}/>
    </>
  );
}
