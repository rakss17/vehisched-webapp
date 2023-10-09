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
} from "../../../components/api/api";
import {
  VehicleAvailableWebsocket,
  RequestApproveWebsocket,
} from "../../../components/api/websocket";

export default function DashboardR() {
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [hasSchedule, setHasSchedule] = useState(false);
  const [hasPendingSchedule, setHasPendingSchedule] = useState(true);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [pendingSchedule, setPendingSchedule] = useState<any[]>([]);
  const [isSetTripOpen, setIsSetTripOpen] = useState(false);
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
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
    VehicleAvailableWebsocket(setVehiclesData);
  }, []);

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
    setIsSetTripOpen(true);
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

  const availableVehicles = vehiclesData.filter((vehicle) => {
    if (role === "requester") {
      return vehicle.status === "Available" && !vehicle.is_vip;
    } else if (role === "vip") {
      return vehicle.status === "Available" && vehicle.is_vip;
    } else {
      return false;
    }
  });

  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
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
        {hasPendingSchedule ? (
          <>
            <div className="requester-row">
              <p>Waiting for approval </p>
              <div></div>
            </div>
            <div className="requester-dashboard-container">
              <div className="requester-pending-schedule-container">
                <div>
                  <div>
                    <h1>Schedule no. </h1>{" "}
                    <h2>{pendingSchedule[0]?.request_id}</h2>
                  </div>
                  <div>
                    <h2>Travel date and time: </h2>{" "}
                    <p>
                      {pendingSchedule[0]?.travel_date},{" "}
                      {formatTime(pendingSchedule[0]?.travel_time)}{" "}
                    </p>
                  </div>
                  <div>
                    <p>Waiting for office staff's approval</p>
                    <p className="loading-dots"></p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {hasSchedule ? (
              <>
                <div className="requester-row">
                  <p>Ongoing Schedule </p>
                  <div></div>
                </div>
                <div className="requester-dashboard-container">
                  <div className="requester-schedule-container">
                    <div>
                      <div>
                        <h1>Schedule no. </h1>{" "}
                        <h2>{schedule[0]?.tripticket_id}</h2>
                      </div>
                      <div>
                        <h2>Travel date and time: </h2>{" "}
                        <p>
                          {schedule[0]?.travel_date},{" "}
                          {formatTime(schedule[0]?.travel_time)}{" "}
                        </p>
                      </div>
                      <div>
                        <div>
                          <h2>Driver: </h2> <p>{schedule[0]?.driver}</p>
                        </div>
                        <div>
                          <h2>Contact No.: </h2>{" "}
                          <p>{schedule[0]?.contact_no_of_driver}</p>
                        </div>
                      </div>
                      <div>
                        <h2>Destination: </h2> <p>{schedule[0]?.destination}</p>
                      </div>
                      <div>
                        <div>
                          <h2>Vehicle: </h2> <p>{schedule[0]?.vehicle}</p>
                        </div>
                        <div>
                          <h2>Status: </h2> <p>{schedule[0]?.status}</p>
                        </div>
                      </div>
                      <div>
                        <button>View more info</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="requester-row">
                  <p>Available Vehicles</p>
                  <button onClick={handleSetTripModal}>Set Trip</button>
                </div>
                <div className="requester-dashboard-container">
                  {availableVehicles.length === 0 ? (
                    <p className="vehicles-null">No vehicles available</p>
                  ) : (
                    availableVehicles.map((vehicle) => (
                      <a
                        onClick={() =>
                          openRequestForm(
                            vehicle.plate_number,
                            vehicle.vehicle_name
                          )
                        }
                        className="vehicle-card"
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
                    ))
                  )}
                </div>
              </>
            )}
          </>
        )}
      </Container>
      <Modal className="modal-set-trip" isOpen={isSetTripOpen}>
        <div className="modal-set-trip-body">
          <h1>Set Trip</h1>
          <div className="date-from">
            <p>From: </p>
            <div>
              {/* <CalendarInput /> */}
              <div className="separate-time">{/* <TimeInput /> */}</div>
            </div>
          </div>
          <div className="date-to">
            <p>To: </p>
            <div>
              {/* <CalendarInput /> */}
              <div className="separate-time">{/* <TimeInput /> */}</div>
            </div>
          </div>
          <div className="number-of-pass">
            <p>
              Number of Passenger{"("}s{"):"}
            </p>
            <input type="number" onKeyDown={handleKeyDown}></input>
          </div>
          <div className="modal-button-container">
            <button onClick={handleCancelTripModal}>Cancel</button>
            <button onClick={handleSetTripModal}>Set Trip</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
