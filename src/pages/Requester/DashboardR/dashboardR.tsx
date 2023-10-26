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
import Countdown from "../../../components/countdown/countdown";
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
  handlePlaceSelect,
} from "../../../components/api/api";
import { NotificationApprovalScheduleReminderWebsocket } from "../../../components/api/websocket";
import { format } from "date-fns";
import AutoCompleteAddressGoogle from "../../../components/addressinput/googleaddressinput";
import Guidelines from "../../../components/guidelines/guidelines";

export default function DashboardR() {
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [hasSchedule, setHasSchedule] = useState(false);
  const [hasPendingSchedule, setHasPendingSchedule] = useState(true);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [nextSchedule, setNextSchedule] = useState<any[]>([]);
  const [pendingSchedule, setPendingSchedule] = useState<any[]>([]);
  const [isTripScheduleClick, setIsTripScheduleClick] = useState(false);
  const [isAvailableVehicleClick, setIsAvailableVehicleClick] = useState(false);
  const [isOngoingScheduleClick, setIsOngoingScheduleClick] = useState(false);
  const [isRoundTripClick, setIsRoundTripClick] = useState(false);
  const [isOneWayClick, setIsOneWayClick] = useState(false);
  const [isFetchSelect, setIsFetchSelect] = useState(false);
  const [selectedButton, setSelectedButton] =
    useState<string>("Set Trip Schedule");
  const [selectedTripButton, setSelectedTripButton] =
    useState<string>("Round Trip");
  const [isSetTripOpen, setIsSetTripOpen] = useState(false);
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const [data, setData] = useState<any>({
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
    category: "Round Trip",
  });
  const [addressData, setAddressData] = useState<any>({
    destination: "",
    distance: null,
  });
  const role = personalInfo?.role;
  const userName = personalInfo?.username;
  const [isAutocompleteDisabled, setIsAutocompleteDisabled] = useState(true);
  const [isTravelDateSelected, setIsTravelDateSelected] = useState(true);
  const navigate = useNavigate();
  const [notifList, setNotifList] = useState<any[]>([]);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
  const sidebarData: SidebarItem[] = [
    {
      icon: faColumns,
      text: "Dashboard",
      path: "/DashboardR",
    },
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
    fetchSchedule(
      setSchedule,
      setNextSchedule,
      setIsOngoingScheduleClick,
      handleButtonClick
    );
  }, []);

  useEffect(() => {
    fetchPendingRequestAPI((data: any) => {
      setPendingSchedule(data);
      if (data.length > 0) {
        setHasPendingSchedule(true);
        setHasSchedule(false);
        setIsOngoingScheduleClick(true);
        handleButtonClick("Ongoing Schedule");
      } else {
        setHasPendingSchedule(false);
      }
    });
  }, []);

  NotificationApprovalScheduleReminderWebsocket(userName);

  const handleSetTripModal = () => {
    checkVehicleAvailability(
      setVehiclesData,
      data.travel_date,
      data.travel_time,
      data.return_date,
      data.return_time
    );
    handleButtonClick("Available Vehicle");
    console.log("set trip", data);
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
  const openRequestForm = (
    plateNumber: string,
    vehicleName: string,
    capacity: any
  ) => {
    navigate("/RequestForm", {
      state: { plateNumber, vehicleName, capacity, data, addressData },
    });
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

  useEffect(() => {
    setData({ ...data, category: "Round Trip" });
    setSelectedTripButton("Round Trip");
  }, []);
  const checkAutocompleteDisability = () => {
    if (data.travel_date !== null && data.travel_time !== null) {
      setIsAutocompleteDisabled(false);
      setIsTravelDateSelected(false);
    }
  };

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
  const handleButtonClickTrip = (button: string) => {
    switch (button) {
      case "Round Trip":
        setIsOneWayClick(false);
        setIsAutocompleteDisabled(true);
        break;
      case "One-way":
        setIsAutocompleteDisabled(true);
        setIsOneWayClick(true);
        setIsTravelDateSelected(true);
        break;
      default:
        break;
    }
    setData({ ...data, category: button });
    setSelectedTripButton(button);
  };

  useEffect(() => {
    handleButtonClickTrip("Round Trip");
  }, []);
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

    checkAutocompleteDisability();
  };
  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, return_date: formattedDate });
  };

  const handleStartTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, travel_time: time });

      checkAutocompleteDisability();
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

  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);

  useEffect(() => {
    // Check if the user is logging in (you can adjust this condition as per your authentication logic)
    const userIsLoggedIn = true; // For example, assuming the user is logged in

    if (userIsLoggedIn) {
      // Open the Guidelines modal when the user logs in
      setIsGuidelinesModalOpen(true);
    }
  }, []);

  pendingSchedule.reverse();
  schedule.reverse();
  return (
    <>
      <Modal
        className="guidelines-modal"
        isOpen={isGuidelinesModalOpen}
        contentLabel="Guidelines"
      >
        <Guidelines guidelinescloseModal={() => setIsGuidelinesModalOpen(false)} />
      </Modal>
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
                  <div className="trip-category">
                    <p>Category: </p>
                    <div>
                      <button
                        onClick={() => handleButtonClickTrip("Round Trip")}
                        className={
                          selectedTripButton === "Round Trip" ? "active" : ""
                        }
                      >
                        Round Trip
                      </button>
                      <button
                        onClick={() => handleButtonClickTrip("One-way")}
                        className={
                          selectedTripButton === "One-way" ? "active" : ""
                        }
                      >
                        One-way
                      </button>
                    </div>
                  </div>
                  {isOneWayClick && (
                    <>
                      <div className="one-way-sub-category">
                        <p>Type: </p>
                        <select
                          value={data.sub_category}
                          onChange={(event) => {
                            const selectedValue = event.target.value;

                            setData((prevData: any) => ({
                              ...prevData,
                              category:
                                selectedValue === "Drop"
                                  ? "One-way - Drop"
                                  : selectedValue === "Fetch"
                                  ? "One-way - Fetch"
                                  : "One-way",
                            }));
                            if (selectedValue === "Fetch") {
                              setIsFetchSelect(true);
                            } else if (selectedValue === "Drop") {
                              setIsFetchSelect(false);
                            } else {
                              setIsFetchSelect(false);
                            }
                          }}
                        >
                          <option>--------- Select Type --------</option>
                          <option value="Drop">Drop</option>
                          <option value="Fetch">Fetch</option>
                        </select>
                      </div>
                    </>
                  )}
                  <div className="trip-destination">
                    {!isFetchSelect ? (
                      <p>Destination: </p>
                    ) : (
                      <p>Your Location: </p>
                    )}

                    <div className="trip-destination-autocomplete-oneway">
                      <AutoCompleteAddressGoogle
                        travel_date={data.travel_date}
                        travel_time={data.travel_time}
                        setData={setData}
                        isDisabled={isAutocompleteDisabled}
                        setAddressData={setAddressData}
                        category={data.category}
                      />
                      {isTravelDateSelected && (
                        <p>Select travel date and time first</p>
                      )}
                    </div>
                  </div>
                  {selectedTripButton === "Round Trip" ? (
                    <div className="date-from-roundtrip">
                      {!isOneWayClick ? (
                        <p>From: </p>
                      ) : (
                        <p className="travel-datee">Travel Date: </p>
                      )}
                      <div>
                        <CalendarInput
                          selectedDate={
                            data.travel_date ? new Date(data.travel_date) : null
                          }
                          onChange={handleStartDateChange}
                          disableDaysBefore={3}
                        />

                        <div className="separate-time">
                          <TimeInput
                            onChange={handleStartTimeChange}
                            selectedDate={data.travel_date}
                            handleDateChange={handleStartDateChange}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="date-from-oneway">
                      {!isOneWayClick ? (
                        <p>From: </p>
                      ) : (
                        <p className="travel-datee">Travel Date: </p>
                      )}
                      <div>
                        <CalendarInput
                          selectedDate={
                            data.travel_date ? new Date(data.travel_date) : null
                          }
                          onChange={handleStartDateChange}
                          disableDaysBefore={3}
                        />

                        <div className="separate-time">
                          <TimeInput
                            onChange={handleStartTimeChange}
                            selectedDate={data.travel_date}
                            handleDateChange={handleStartDateChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {!isOneWayClick && (
                    <div className="date-to">
                      <p>To: </p>
                      <div>
                        <CalendarInput
                          selectedDate={
                            data.return_date ? new Date(data.return_date) : null
                          }
                          onChange={handleEndDateChange}
                          disableDaysBefore={3}
                        />
                        <div className="separate-time">
                          {" "}
                          <TimeInput
                            onChange={handleEndTimeChange}
                            selectedDate={data.return_date}
                            handleDateChange={handleEndDateChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}

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
              {vehiclesData.length === 0 ? (
                <p className="vehicles-null">
                  No vehicles available or Please set your trip schedule to
                  display available vehicles
                </p>
              ) : (
                <>
                  <p className="date-available-range">
                    Available vehicles from {data.travel_date},{" "}
                    {formatTime(data.travel_time)} to {data.return_date},{" "}
                    {formatTime(data.return_time)}
                  </p>
                  <div className="vehicle-container">
                    {vehiclesData.map((vehicle) => (
                      <a
                        onClick={() =>
                          openRequestForm(
                            vehicle.plate_number,
                            vehicle.model,
                            vehicle.capacity
                          )
                        }
                        className="vehicle-card"
                        key={vehicle.plate_number}
                      >
                        <div className="vehicle-row">
                          <div className="vehicle-column">
                            <p className="vehicle-name">
                              {vehicle.plate_number}
                              <br />
                              {vehicle.model}
                            </p>
                            <p className="vehicle-detail">
                              Seating Capacity: {vehicle.capacity}
                            </p>
                            <p className="vehicle-detail">
                              Type: {vehicle.type}
                            </p>
                          </div>
                          <img
                            className="vehicle-image"
                            src={serverSideUrl + vehicle.image}
                            alt={vehicle.model}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {isOngoingScheduleClick && (
            <>
              {pendingSchedule.length === 0 ? (
                <p className="vehicles-null">No pending schedules ongoing</p>
              ) : (
                <>
                  {pendingSchedule.map((pendingSched) => (
                    <div
                      key={pendingSched.request_id}
                      className="requester-pending-schedule-container"
                    >
                      <div>
                        <div>
                          <h1>Schedule no. </h1>{" "}
                          <h2>{pendingSched.request_id}</h2>
                        </div>
                        <div>
                          <h2>Travel date and time: </h2>{" "}
                          <p>
                            {pendingSched.travel_date},{" "}
                            {formatTime(pendingSched.travel_time)}{" "}
                          </p>
                        </div>
                        <div>
                          <h2>Destination: </h2>{" "}
                          <p>{pendingSched.destination}, </p>
                        </div>
                        <div>
                          <p>Waiting for office staff's approval</p>
                          <p className="loading-dots"></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              <>
                {schedule.length === 0 ? (
                  <p className="vehicles-null">No schedules ongoing</p>
                ) : (
                  <>
                    {schedule.map((schedule) => (
                      <div
                        key={schedule.trip_id}
                        className="requester-schedule-container"
                      >
                        <div className="requester-schedule-container-div">
                          <div>
                            <div>
                              <h1>Schedule no. </h1> <h2>{schedule.trip_id}</h2>
                            </div>
                            <div>
                              <Countdown
                                travelDate={schedule.travel_date}
                                travelTime={schedule.travel_time}
                              />
                            </div>
                          </div>
                          <div>
                            <h2>Travel date and time: </h2>{" "}
                            <p>
                              {schedule.travel_date},{" "}
                              {formatTime(schedule.travel_time)}
                              <strong> to </strong>
                              {schedule.return_date},{" "}
                              {formatTime(schedule.return_time)}
                            </p>
                          </div>
                          <div>
                            <div>
                              <h2>Driver: </h2> <p>{schedule.driver}</p>
                            </div>
                            <div>
                              <h2>Contact No.: </h2>{" "}
                              <p>{schedule.contact_no_of_driver}</p>
                            </div>
                          </div>
                          <div>
                            <h2>Destination: </h2> <p>{schedule.destination}</p>
                          </div>
                          <div>
                            <div>
                              <h2>Vehicle: </h2> <p>{schedule.vehicle}</p>
                            </div>
                            <div>
                              <h2>Status: </h2> <p>{schedule.status}</p>
                            </div>
                          </div>
                          <div>
                            <button>View more info</button>
                          </div>
                        </div>
                        {nextSchedule
                          .filter(
                            (nextSched) =>
                              nextSched.previous_trip_id === schedule.trip_id
                          )
                          .map((nextSched) => (
                            <div className="next-schedule-container">
                              <strong>
                                The next scheduled user of this vehicle will
                                commence at
                              </strong>
                              <p>{nextSched.next_schedule_travel_date}</p>
                              <p>
                                {formatTime(
                                  nextSched.next_schedule_travel_time
                                )}
                              </p>
                            </div>
                          ))}
                      </div>
                    ))}
                  </>
                )}
              </>
            </>
          )}
        </div>

      </Container>
      
      {/* <Modal className="modal-set-trip" isOpen={isSetTripOpen}>
        
      </Modal> */}
    </>
  );
}
