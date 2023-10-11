import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Container from "../../../components/container/container";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Label from "../../../components/label/label";
import "./dashboardR.css";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import CalendarInput from "../../../components/calendarinput/calendarinput";
import TimeInput from "../../../components/timeinput/timeinput";
import { SidebarItem, Vehicle } from "../../../interfaces/interfaces";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  serverSideUrl,
  fetchNotification,
  fetchSchedule,
  fetchPendingRequestAPI,
  checkVehicleAvailability,
} from "../../../components/api/api";
import {
  VehicleAvailableWebsocket,
  RequestApproveWebsocket,
} from "../../../components/api/websocket";
import { format } from "date-fns";

export default function DashboardR() {
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [hasSchedule, setHasSchedule] = useState(false);
  const [hasPendingSchedule, setHasPendingSchedule] = useState(true);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [pendingSchedule, setPendingSchedule] = useState<any[]>([]);
  const [isTripScheduleClick, setIsTripScheduleClick] = useState(false);
  const [isAvailableVehicleClick, setIsAvailableVehicleClick] = useState(false);
  const [isOngoingScheduleClick, setIsOngoingScheduleClick] = useState(false);
  const [selectedButton, setSelectedButton] =
    useState<string>("Set Trip Schedule");
  const [isSetTripOpen, setIsSetTripOpen] = useState(false);
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const [data, setData] = useState<any>({
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
  });
  const role = personalInfo?.role;
  const userName = personalInfo?.username;
  const navigate = useNavigate();
  const [notifList, setNotifList] = useState<any[]>([]);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
  const sidebarData: SidebarItem[] = [
    { icon: faColumns, text: "Dashboard", path: "/DashboardR" },
    {
      icon: faClipboardList,
      text: "Request",
      path: "/Request",
      notification: notifLength >= 1 ? notifLength : undefined,
    },
  ];

  useEffect(() => {
    fetchNotification(setNotifList);
  }, []);

  useEffect(() => {
    fetchSchedule((data: any) => {
      setSchedule(data);
      if (data.length > 0) {
        setHasSchedule(true);
        setHasPendingSchedule(false);
      }
    });
  }, []);

  useEffect(() => {
    fetchPendingRequestAPI((data: any) => {
      setPendingSchedule(data);
      if (data.length > 0) {
        setHasPendingSchedule(true);
        setHasSchedule(false);
      } else {
        setHasPendingSchedule(false);
      }
    });
  }, []);

  RequestApproveWebsocket(userName);

  const handleSetTripModal = () => {
    checkVehicleAvailability(
      setVehiclesData,
      data.travel_date,
      data.travel_time,
      data.return_date,
      data.return_time
    );
    handleButtonClick("Available Vehicle");
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
  const openRequestForm = (plateNumber: string, vehicleName: string) => {
    navigate("/RequestForm", { state: { plateNumber, vehicleName } });
  };

  // const availableVehicles = vehiclesData.filter((vehicle) => {
  //   if (role === "requester") {
  //     return vehicle.status === "Available" && !vehicle.is_vip;
  //   } else if (role === "vip") {
  //     return vehicle.status === "Available" && vehicle.is_vip;
  //   } else {
  //     return false;
  //   }
  // });

  const handleButtonClick = (button: string) => {
    switch (button) {
      case "Set Trip Schedule":
        setIsTripScheduleClick(true);
        setIsAvailableVehicleClick(false);
        setIsOngoingScheduleClick(false);
        break;
      case "Available Vehicle":
        setIsTripScheduleClick(false);
        setIsAvailableVehicleClick(true);
        setIsOngoingScheduleClick(false);
        break;
      case "Ongoing Schedule":
        setIsTripScheduleClick(false);
        setIsAvailableVehicleClick(false);
        setIsOngoingScheduleClick(true);
        break;

      default:
        break;
    }

    setSelectedButton(button);
  };
  useEffect(() => {
    handleButtonClick("Set Trip Schedule");
  }, []);

  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, travel_date: formattedDate });
  };
  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, return_date: formattedDate });
  };

  const handleStartTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, travel_time: time });
    } else {
      console.log("No time selected.");
    }
  };
  const handleEndTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, return_time: time });
    } else {
      console.log("No time selected.");
    }
  };

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <ToastContainer />
        <div className="margin-top-dashboard">
          <Label label="Dashboard" />
        </div>
        <div className="requester-row-container">
          <div className="requester-row">
            <button
              onClick={() => handleButtonClick("Set Trip Schedule")}
              className={selectedButton === "Set Trip Schedule" ? "active" : ""}
            >
              Set Trip Schedule
            </button>
            <button
              onClick={() => handleButtonClick("Available Vehicle")}
              className={selectedButton === "Available Vehicle" ? "active" : ""}
            >
              Available Vehicle
            </button>
            <button
              onClick={() => handleButtonClick("Ongoing Schedule")}
              className={selectedButton === "Ongoing Schedule" ? "active" : ""}
            >
              Ongoing Schedule
            </button>
          </div>
        </div>
        <div className="requester-dashboard-container">
          {isTripScheduleClick && (
            <>
              <div className="modal-set-trip">
                <div className="modal-set-trip-body">
                  <h1>Set Trip</h1>
                  <div className="date-from">
                    <p>From: </p>
                    <div>
                      <CalendarInput onChange={handleStartDateChange} />
                      <div className="separate-time">
                        <TimeInput onChange={handleStartTimeChange} />
                      </div>
                    </div>
                  </div>
                  <div className="date-to">
                    <p>To: </p>
                    <div>
                      <CalendarInput onChange={handleEndDateChange} />
                      <div className="separate-time">
                        {" "}
                        <TimeInput onChange={handleEndTimeChange} />
                      </div>
                    </div>
                  </div>
                  {/* <div className="number-of-pass">
                    <p>
                      Number of Passenger{"("}s{"):"}
                    </p>
                    <input type="number" onKeyDown={handleKeyDown}></input>
                  </div> */}
                  <div className="modal-button-container">
                    <button onClick={handleSetTripModal}>Set Trip</button>
                  </div>
                </div>
              </div>
            </>
          )}
          {isAvailableVehicleClick && (
            <>
              <div className="available-vehicle-container">
                {vehiclesData.length === 0 ? (
                  <p className="vehicles-null">
                    No vehicles available or Please set your trip schedule to
                    display available vehicles
                  </p>
                ) : (
                  vehiclesData.map((vehicle) => (
                    <>
                      <p>
                        Available vehicles from {data.travel_date},{" "}
                        {formatTime(data.travel_time)} to {data.return_date},{" "}
                        {formatTime(data.return_time)}
                      </p>
                      <a
                        onClick={() =>
                          openRequestForm(
                            vehicle.plate_number,
                            vehicle.vehicle_name
                          )
                        }
                        className="vehicle-card"
                        key={vehicle.plate_number}
                      >
                        <div className="vehicle-row">
                          <div className="vehicle-column">
                            <p className="vehicle-name">
                              {vehicle.plate_number}
                              <br></br>
                              {vehicle.vehicle_name}
                            </p>
                            <p className="vehicle-detail">
                              Seating Capacity: {vehicle.capacity}
                            </p>
                            <p className="vehicle-detail">
                              Type: {vehicle.vehicle_type}
                            </p>
                          </div>
                          <img
                            className="vehicle-image"
                            src={serverSideUrl + vehicle.vehicle_image}
                          />
                        </div>
                      </a>
                    </>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </Container>
      {/* <Modal className="modal-set-trip" isOpen={isSetTripOpen}>
        
      </Modal> */}
    </>
  );
}
