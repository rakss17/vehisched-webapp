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
  acceptVehicleAPI,
  cancelRequestAPI,
} from "../../../components/api/api";
import { NotificationApprovalScheduleReminderWebsocket } from "../../../components/api/websocket";
import { format } from "date-fns";
import { responsive } from "../../../components/functions/getTimeElapsed";
import AutoCompleteAddressGoogle from "../../../components/addressinput/googleaddressinput";
import Guidelines from "../../../components/guidelines/guidelines";
import CommonButton from "../../../components/button/commonbutton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Confirmation from "../../../components/confirmation/confirmation";
import LoadingBar from "react-top-loading-bar";

export default function DashboardR() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [hasSchedule, setHasSchedule] = useState(false);
  const [hasPendingSchedule, setHasPendingSchedule] = useState(true);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [nextSchedule, setNextSchedule] = useState<any[]>([]);
  const [pendingSchedule, setPendingSchedule] = useState<any[]>([]);
  const [vehicleRecommendation, setVehicleRecommendation] = useState<any[]>([]);
  const [isTripScheduleClick, setIsTripScheduleClick] = useState(false);
  const [isAvailableVehicleClick, setIsAvailableVehicleClick] = useState(false);
  const [isOngoingScheduleClick, setIsOngoingScheduleClick] = useState(false);
  const [isRoundTripClick, setIsRoundTripClick] = useState(false);
  const [isOneWayClick, setIsOneWayClick] = useState(false);
  const [isFetchSelect, setIsFetchSelect] = useState(false);
  const [selectedButton, setSelectedButton] =
    useState<string>("Set Trip Schedule");
  const [selectedVehicleRecommendation, setSelectedVehicleRecommendation] =
    useState<string>("");
  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const [selectedTripButton, setSelectedTripButton] =
    useState<string>("Round Trip");
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [isSetTripOpen, setIsSetTripOpen] = useState(false);
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const [isConfirmationAcceptOpen, setIsConfirmationAcceptOpen] =
    useState(false);
  const [isConfirmationCancelOpen, setIsConfirmationCancelOpen] =
    useState(false);
  const [data, setData] = useState<any>({
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
    category: "Round Trip",
    capacity: null,
  });
  const [addressData, setAddressData] = useState<any>({
    destination: "",
    distance: null,
  });
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
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
      handleButtonClick,
      setVehicleRecommendation
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
    let validationErrors: { [key: string]: string } = {};
    if (data.category === "Round Trip") {
      const allFieldsBlank =
        !data.travel_date &&
        !data.travel_time &&
        !data.return_date &&
        !data.return_time &&
        !data.capacity &&
        !addressData.destination;

      if (allFieldsBlank) {
        validationErrors.all = "Required all fields!";
      } else {
        if (!data.travel_date) {
          validationErrors.travelDateError = "This field is required";
        }
        if (!data.travel_time) {
          validationErrors.travelTimeError = "This field is required";
        }

        if (!data.return_date) {
          validationErrors.returnDateError = "This field is required";
        }

        if (!data.return_time) {
          validationErrors.returnTimeError = "This field is required";
        }
        if (!data.capacity) {
          validationErrors.capacityError = "This field is required";
        }

        if (!addressData.destination) {
          validationErrors.destinationError = "This field is required";
        }
      }
    } else if (
      data.category === "One-way" ||
      data.category === "One-way - Fetch" ||
      data.category === "One-way - Drop"
    ) {
      const allFieldsBlank =
        !data.travel_date &&
        !data.travel_time &&
        !data.capacity &&
        data.category !== "One-way - Fetch" &&
        data.category !== "One-way - Drop";
      !data.category && !addressData.destination;

      if (allFieldsBlank) {
        validationErrors.all = "Required all fields!";
      } else {
        if (!data.travel_date) {
          validationErrors.travelDateOnewayError = "This field is required";
        }
        if (!data.travel_time) {
          validationErrors.travelTimeOnewayError = "This field is required";
        }
        if (!data.capacity) {
          validationErrors.capacityError = "This field is required";
        }

        if (
          data.category !== "One-way - Fetch" &&
          data.category !== "One-way - Drop"
        ) {
          validationErrors.categoryError = "This field is required";
        }

        if (!addressData.destination) {
          validationErrors.destinationError = "This field is required";
        }
      }
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);

    if (Object.keys(validationErrors).length === 0) {
      checkVehicleAvailability(
        setVehiclesData,
        data.travel_date,
        data.travel_time,
        data.return_date,
        data.return_time,
        data.capacity
      );
      handleButtonClick("Available Vehicle");
    }
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
    const updatedErrors = { ...errorMessages };

    switch (button) {
      case "Round Trip":
        setIsOneWayClick(false);
        setIsAutocompleteDisabled(true);
        delete updatedErrors[0];
        setErrorMessages(updatedErrors);
        setData({
          travel_date: null,
          travel_time: null,
          return_date: null,
          return_time: null,
          category: "",
        });
        setAddressData({
          destination: "",
          distance: null,
        });
        break;

      case "One-way":
        setIsAutocompleteDisabled(true);
        setIsOneWayClick(true);
        setIsTravelDateSelected(true);
        delete updatedErrors[0];
        setErrorMessages(updatedErrors);
        setData({
          travel_date: null,
          travel_time: null,
          return_date: null,
          return_time: null,
          category: "",
        });
        setAddressData({
          destination: "",
          distance: null,
        });
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
    if (data.category === "Round Trip") {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelDateError;
      setErrorMessages(updatedErrors);
    } else if (
      data.category === "One-way" ||
      data.category === "One-way - Fetch" ||
      data.category === "One-way - Drop"
    ) {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelDateOnewayError;
      setErrorMessages(updatedErrors);
    }

    checkAutocompleteDisability();
  };
  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, return_date: formattedDate });
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.returnDateError;
    setErrorMessages(updatedErrors);
  };

  const handleStartTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, travel_time: time });
      if (data.category === "Round Trip") {
        const updatedErrors = { ...errorMessages };
        delete updatedErrors[0]?.travelTimeError;
        setErrorMessages(updatedErrors);
      } else if (
        data.category === "One-way" ||
        data.category === "One-way - Fetch" ||
        data.category === "One-way - Drop"
      ) {
        const updatedErrors = { ...errorMessages };
        delete updatedErrors[0]?.travelTimeOnewayError;
        setErrorMessages(updatedErrors);
      }
      checkAutocompleteDisability();
    } else {
      console.log("No time selected.");
    }
  };
  const handleEndTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, return_time: time });
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.returnTimeError;
      setErrorMessages(updatedErrors);
    } else {
      console.log("No time selected.");
    }
  };

  const removeDestinationError = () => {
    const updatedErrors = [...errorMessages];
    updatedErrors[0] = { ...updatedErrors[0], destinationError: undefined };
    setErrorMessages(updatedErrors);
  };

  useEffect(() => {
    const userIsLoggedIn = true;

    if (userIsLoggedIn) {
      const isChecked = localStorage.getItem("guidelines");
      if (isChecked === "true") {
        setIsGuidelinesModalOpen(false);
      } else {
        setIsGuidelinesModalOpen(true);
      }
    }
  }, []);

  const handleAccept = (recommend_request_id: any, recommend_trip_id: any) => {
    setSelectedTrip(recommend_trip_id);
    let validationErrors: { [key: string]: string } = {};

    if (!selectedVehicleRecommendation) {
      validationErrors.selectedVehicleRecommendationError =
        "Please select vehicle";
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);

    if (Object.keys(validationErrors).length === 0) {
      acceptVehicleAPI(
        recommend_request_id,
        selectedVehicleRecommendation,
        setIsConfirmationAcceptOpen,
        setLoadingBarProgress
      );
    }
  };
  const handleCancel = (recommend_request_id: any) => {
    cancelRequestAPI(
      recommend_request_id,
      setIsConfirmationCancelOpen,
      setLoadingBarProgress
    );
  };
  pendingSchedule.reverse();
  schedule.reverse();
  return (
    <>
      <Modal
        className="guidelines-modal"
        isOpen={isGuidelinesModalOpen}
        contentLabel="Guidelines"
      >
        <Guidelines
          guidelinescloseModal={() => setIsGuidelinesModalOpen(false)}
        />
      </Modal>
      <Header />
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
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
                  <p className="set-trip-text-error">{errorMessages[0]?.all}</p>
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
                        <div>
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
                                const updatedErrors = { ...errorMessages };
                                delete updatedErrors[0]?.categoryError;
                                setErrorMessages(updatedErrors);
                              } else if (selectedValue === "Drop") {
                                setIsFetchSelect(false);
                                const updatedErrors = { ...errorMessages };
                                delete updatedErrors[0]?.categoryError;
                                setErrorMessages(updatedErrors);
                              } else {
                                setIsFetchSelect(false);
                              }
                            }}
                          >
                            <option>--------- Select Type --------</option>
                            <option value="Drop">Drop</option>
                            <option value="Fetch">Fetch</option>
                          </select>
                          <p className="set-trip-text-error">
                            {errorMessages[0]?.categoryError}
                          </p>
                        </div>
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
                        removeDestinationError={removeDestinationError}
                      />

                      {isTravelDateSelected ? (
                        <p>Select travel date and time first</p>
                      ) : (
                        <p>{errorMessages[0]?.destinationError}</p>
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
                        <div className="separate-date">
                          <CalendarInput
                            selectedDate={
                              data.travel_date
                                ? new Date(data.travel_date)
                                : null
                            }
                            onChange={handleStartDateChange}
                            disableDaysBefore={3}
                          />
                          <p className="set-trip-text-error">
                            {errorMessages[0]?.travelDateError}
                          </p>
                        </div>

                        <div className="separate-time">
                          <TimeInput
                            onChange={handleStartTimeChange}
                            selectedDate={data.travel_date}
                            handleDateChange={handleStartDateChange}
                          />
                          <p className="set-trip-text-error">
                            {errorMessages[0]?.travelTimeError}
                          </p>
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
                        <div className="separate-date">
                          <CalendarInput
                            selectedDate={
                              data.travel_date
                                ? new Date(data.travel_date)
                                : null
                            }
                            onChange={handleStartDateChange}
                            disableDaysBefore={3}
                          />
                          <p className="set-trip-text-error">
                            {errorMessages[0]?.travelDateOnewayError}
                          </p>
                        </div>

                        <div className="separate-time">
                          <TimeInput
                            onChange={handleStartTimeChange}
                            selectedDate={data.travel_date}
                            handleDateChange={handleStartDateChange}
                          />
                          <p className="set-trip-text-error">
                            {errorMessages[0]?.travelTimeOnewayError}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isOneWayClick && (
                    <div className="date-to">
                      <p>To: </p>
                      <div>
                        <div className="separate-date">
                          <CalendarInput
                            selectedDate={
                              data.return_date
                                ? new Date(data.return_date)
                                : null
                            }
                            onChange={handleEndDateChange}
                            disableDaysBefore={3}
                          />
                          <p className="set-trip-text-error">
                            {errorMessages[0]?.returnDateError}
                          </p>
                        </div>

                        <div className="separate-time">
                          <TimeInput
                            onChange={handleEndTimeChange}
                            selectedDate={data.return_date}
                            handleDateChange={handleEndDateChange}
                          />
                          <p className="set-trip-text-error">
                            {errorMessages[0]?.returnTimeError}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="number-of-pass">
                    <p>
                      Number of Passenger{"("}s{"):"}
                    </p>
                    <div>
                      <input
                        value={data.capacity}
                        onChange={(event) => {
                          setData({ ...data, capacity: event.target.value });
                          if (event.target.value) {
                            const updatedErrors = { ...errorMessages };
                            delete updatedErrors[0]?.capacityError;
                            setErrorMessages(updatedErrors);
                          }
                        }}
                        type="number"
                        onKeyDown={handleKeyDown}
                      />
                      <p className="set-trip-text-error">
                        {errorMessages[0]?.capacityError}
                      </p>
                    </div>
                  </div>
                  <div className="modal-button-container">
                    <CommonButton
                      onClick={handleSetTripModal}
                      text="Set Trip"
                      primaryStyle
                    />
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
              {vehicleRecommendation.map((recommend) => (
                <div
                  key={recommend.trip_id}
                  className="requester-schedule-container"
                >
                  <div className="requester-recommendation-container-div">
                    <div>
                      <div>
                        <h1>Schedule no. </h1> <h2>{recommend.trip_id}</h2>
                      </div>
                    </div>
                    <div>
                      <p>
                        We regret to inform you that the vehicle you reserved
                        for the date{" "}
                        <span>
                          {recommend.travel_date},{" "}
                          {formatTime(recommend.travel_time)}
                        </span>{" "}
                        to{" "}
                        <span>
                          {recommend.return_date},{" "}
                          {formatTime(recommend.return_time)}
                        </span>{" "}
                        is currently undergoing unexpected maintenance. We
                        apologize for any inconvenience this may cause.{" "}
                        {recommend.message}
                      </p>
                    </div>
                    <Carousel
                      swipeable={true}
                      draggable={true}
                      responsive={responsive}
                      containerClass="recommend-vehicle-carousel"
                      itemClass="carousel-item"
                      infinite={true}
                    >
                      {recommend.vehicle_data_recommendation.map(
                        (vehicle: any) => (
                          <a
                            key={vehicle.vehicle_recommendation_plate_number}
                            className={`recommended-vehicle-card ${
                              selectedVehicleRecommendation ===
                                vehicle.vehicle_recommendation_plate_number &&
                              selectedTrip === recommend.trip_id
                                ? "active"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedVehicleRecommendation(
                                vehicle.vehicle_recommendation_plate_number
                              );
                              if (
                                selectedVehicleRecommendation ===
                                vehicle.vehicle_recommendation_plate_number
                              ) {
                                setSelectedVehicleRecommendation("");
                              }
                              setSelectedTrip(recommend.trip_id);
                              const updatedErrors = { ...errorMessages };
                              delete updatedErrors[0]
                                ?.selectedVehicleRecommendationError;
                              setErrorMessages(updatedErrors);
                            }}
                          >
                            <img
                              src={
                                serverSideUrl +
                                vehicle.vehicle_recommendation_image
                              }
                            />

                            <p>
                              {vehicle.vehicle_recommendation_plate_number}{" "}
                              {vehicle.vehicle_recommendation_model}
                            </p>

                            <p>
                              Seating Capacity:{" "}
                              {vehicle.vehicle_recommendation_capacity}
                            </p>
                            <p>Type: {vehicle.vehicle_recommendation_type}</p>
                          </a>
                        )
                      )}
                    </Carousel>
                    <div>
                      {selectedTrip === recommend.trip_id ? (
                        <p>
                          {errorMessages[0]?.selectedVehicleRecommendationError}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <CommonButton
                        text="Cancel"
                        secondaryStyle
                        onClick={() => handleCancel(recommend.request_id)}
                      />
                      {recommend.message.includes(
                        "We recommend alternative"
                      ) ? (
                        <CommonButton
                          text="Accept"
                          primaryStyle
                          onClick={() =>
                            handleAccept(
                              recommend.request_id,
                              recommend.trip_id
                            )
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              <>
                {pendingSchedule.length === 0 && schedule.length === 0 ? (
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
                  {pendingSchedule.length === 0 && schedule.length === 0 ? (
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
                                <h1>Schedule no. </h1>{" "}
                                <h2>{schedule.trip_id}</h2>
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
                              <h2>Destination: </h2>{" "}
                              <p>{schedule.destination}</p>
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
            </>
          )}
        </div>
      </Container>
      <Confirmation
        isOpen={isConfirmationAcceptOpen}
        header="Vehicle Recommendation Accepted!"
      />
      <Confirmation
        isOpen={isConfirmationCancelOpen}
        header="Vehicle Recommendation Canceled!"
      />
    </>
  );
}
