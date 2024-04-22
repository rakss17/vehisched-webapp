import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Container from "../../../components/container/container";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import "./dashboardR.css";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
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
  fetchVehicleVIPAPI,
  fetchEachVehicleSchedule,
  fetchAnotherVehicle,
} from "../../../components/api/api";
import { NotificationApprovalScheduleReminderWebsocket } from "../../../components/api/websocket";
import { format } from "date-fns";
import { responsive } from "../../../components/functions/functions";
import AutoCompleteAddressGoogle from "../../../components/addressinput/googleaddressinput";
import Guidelines from "../../../components/guidelines/guidelines";
import CommonButton from "../../../components/button/commonbutton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Confirmation from "../../../components/confirmation/confirmation";
import LoadingBar from "react-top-loading-bar";
import InitialFormVip from "../../../components/form/initialformvip";
import PromptDialog from "../../../components/promptdialog/prompdialog";
import RequesterTripMergingForm from "../../../components/form/requestertripmerging";
import SchedulePicker from "../../../components/schedulepicker/schedulepicker";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardR() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [anotherVehiclesData, setAnotherVehiclesData] = useState<Vehicle[]>([]);
  const [isAnotherVehicle, setIsAnotherVehicle] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [nextSchedule, setNextSchedule] = useState<any[]>([]);
  const [pendingSchedule, setPendingSchedule] = useState<any[]>([]);
  const [vehicleRecommendation, setVehicleRecommendation] = useState<any[]>([]);
  const [isTripScheduleClick, setIsTripScheduleClick] = useState(false);
  const [isAvailableVehicleClick, setIsAvailableVehicleClick] = useState(false);
  const [isOngoingScheduleClick, setIsOngoingScheduleClick] = useState(false);
  const [isOneWayClick, setIsOneWayClick] = useState(false);
  const [isScheduleClick, setIsScheduleClick] = useState(false);
  const [
    selectedVehicleExisitingSchedule,
    setSelectedVehicleExisitingSchedule,
  ] = useState<any[]>([]);
  const [selectedButton, setSelectedButton] =
    useState<string>("Available Vehicle");
  const [selectedVehicleRecommendation, setSelectedVehicleRecommendation] =
    useState<string>("");
  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const [selectedTripButton, setSelectedTripButton] =
    useState<string>("Round Trip");
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [isInitialFormVIPOpen, setIsInitialFormVIPOpen] = useState(false);
  const [isRequesterTripMergingFormOpen, setIsRequesterTripMergingFormOpen] =
    useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [givenCapacity, setGivenCapacity] = useState(0);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [anotherVehicleData, setAnotherVehicleData] = useState<Vehicle[]>([]);
  const [selectedAnotherVehicle, setSelectedAnotherVehicle] = useState("");

  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const [isLoading, setIsLoading] = useState(false);
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
  const userID = personalInfo?.id;
  const [isTravelDateSelected, setIsTravelDateSelected] = useState(true);
  const [plateNumber, setSelectedVehiclePlateNumber] = useState("");
  const [vehicleName, setSelectedVehicleModel] = useState("");
  const [isVIP, setSelectedVehicleIsVIP] = useState(false);
  const [capacity, setSelectedVehicleCapacity] = useState(0);
  const [assignedDriver, setSelectedVehicleDriver] = useState("");
  const [selectedVehicleVIPAssignedTo, setSelectedVehicleVIPAssignedTo] =
    useState("");
  const navigate = useNavigate();
  const [notifList, setNotifList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
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
  const role = personalInfo?.role;

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
        setIsOngoingScheduleClick(true);
        handleButtonClick("Ongoing Schedule");
      }

      const vehicles = data
        .filter(
          (request: any) => request.purpose === null && request.vehicle_details
        )
        .map((request: any) => ({
          ...request.vehicle_details,
          request_id: request.request_id,
        }));
      const vehiclesCapacity = vehicles.map((vehicle: any) => vehicle.capacity);

      if (vehicles.length > 0) {
        setVehiclesData(vehicles);
        const firstVehicleRequest = data.find(
          (request: any) => request.purpose === null && request.vehicle_details
        );
        const vacant_capacity =
          vehiclesCapacity - firstVehicleRequest.number_of_passenger;
        setGivenCapacity(vacant_capacity);
      }
    });
  }, []);

  NotificationApprovalScheduleReminderWebsocket(userName);

  const handleOpenRequestFormForVIP = () => {
    navigate("/RequestForm", {
      state: { plateNumber, vehicleName, capacity, data, addressData },
    });
  };

  const handleClose = () => {
    setIsInitialFormVIPOpen(false);
    setIsDisclaimerOpen(false);
    setIsRequesterTripMergingFormOpen(false);
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

  useEffect(() => {
    fetchAnotherVehicle(setAnotherVehicleData, plateNumber);
  }, [isAnotherVehicle]);

  useEffect(() => {
    // fetchNotification(setNotifList);
    if (role === "vip" || isAnotherVehicle) {
      console.log("another vehicle", isAnotherVehicle);
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const vehiclesVIP = await fetchVehicleVIPAPI(
            isAnotherVehicle,
            userID,
            plateNumber
          );
          if (vehiclesVIP && vehiclesVIP.data) {
            if (vehiclesVIP.another_set_of_vehicles === "true") {
              const updatedData: any = {};

              Object.keys(vehiclesVIP.data).forEach((vehicleKey) => {
                const vehicleObj = vehiclesVIP.data[vehicleKey];
                if (vehicleObj) {
                  updatedData[vehicleKey] = vehicleObj;
                } else {
                  console.error(
                    `Vehicle object for key ${vehicleKey} is undefined.`
                  );
                }
              });
              console.log("vehiclesVIP", vehiclesVIP);
              setAnotherVehiclesData((prevData) => {
                // Directly use updatedData instead of merging it with prevData
                return updatedData;
              });
            } else {
              const updatedData: any = {};

              Object.keys(vehiclesVIP.data).forEach((vehicleKey) => {
                const vehicleObj = vehiclesVIP.data[vehicleKey];
                if (vehicleObj) {
                  updatedData[vehicleKey] = vehicleObj;
                } else {
                  console.error(
                    `Vehicle object for key ${vehicleKey} is undefined.`
                  );
                }
              });
              setVehiclesData((prevData) => {
                // Directly use updatedData instead of merging it with prevData
                return updatedData;
              });
            }

            // if (isAnotherVehicle) {
            //   setAnotherVehicleData((prevData: any) => {
            //     const mergedData = { ...prevData };

            //     Object.keys(updatedNormalData).forEach((vehicleKey: any) => {
            //       const newVehicle = updatedData[vehicleKey];
            //       const prevVehicle = prevData[vehicleKey];

            //       if (
            //         !prevVehicle ||
            //         prevVehicle.plate_number !== newVehicle.plate_number
            //       ) {
            //         mergedData[vehicleKey] =
            //           newVehicle.plate_number + newVehicle.model;
            //       }
            //     });

            //     return mergedData;
            //   });
            // }
          }
        } catch (error) {
          console.error("Error fetching vehicles list:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [role === "vip", isAnotherVehicle]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRequestElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Intersection detected, incrementing page.");
          setPage((old) => old + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (role === "requester") {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const newRequests = await fetchEachVehicleSchedule(page);

          if (newRequests && newRequests.data) {
            const updatedData: any = {};

            Object.keys(newRequests.data).forEach((vehicleKey) => {
              const vehicleObj = newRequests.data[vehicleKey];
              if (vehicleObj) {
                updatedData[vehicleKey] = vehicleObj;
              } else {
                console.error(
                  `Vehicle object for key ${vehicleKey} is undefined.`
                );
              }
            });

            setVehiclesData((prevData) => {
              const mergedData = { ...prevData };

              Object.keys(updatedData).forEach((vehicleKey: any) => {
                const newVehicle = updatedData[vehicleKey];
                const prevVehicle = prevData[vehicleKey];

                if (
                  !prevVehicle ||
                  prevVehicle.plate_number !== newVehicle.plate_number
                ) {
                  mergedData[vehicleKey] = newVehicle;
                }
              });

              return mergedData;
            });

            if (!newRequests.next_page) {
              setHasMore(false);
            }
          } else {
            setHasMore(false);
          }
        } catch (error) {
          console.error("Error fetching vehicles list:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [page, role === "requester"]);

  const handleButtonClick = (button: string) => {
    switch (button) {
      case "Set Trip Schedule":
        setIsTripScheduleClick(false);
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
    handleButtonClick("Available Vehicle");
  }, []);

  useEffect(() => {
    if (selectedAnotherVehicle) {
      const foundVehicle = Object.values(anotherVehiclesData).find(
        (vehicle) => vehicle.plate_number === selectedAnotherVehicle
      );
      if (foundVehicle) {
        setSelectedVehicleExisitingSchedule(foundVehicle.schedules);
        setSelectedVehicleCapacity(foundVehicle.capacity);
        setSelectedVehicleDriver(foundVehicle.driver_assigned_to);
        setSelectedVehiclePlateNumber(foundVehicle.plate_number);
        setSelectedVehicleModel(foundVehicle.model);
        setSelectedVehicleIsVIP(foundVehicle.is_vip);
        setSelectedVehicleVIPAssignedTo(foundVehicle.vip_assigned_to);
      }
    }
  }, [selectedAnotherVehicle, anotherVehiclesData]);

  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
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

  console.log("vehicle data", vehiclesData);

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
        <div className="requester-row-container">
          <div className="requester-row">
            <button
              onClick={() => handleButtonClick("Available Vehicle")}
              className={selectedButton === "Available Vehicle" ? "active" : ""}
            >
              Vehicles
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
          {isAvailableVehicleClick && (
            <>
              {vehiclesData.length === 0 ? (
                <>
                  {isLoading ? (
                    <SkeletonTheme baseColor="#d9d9d9" highlightColor="#f5f5f5">
                      <Skeleton
                        count={2}
                        height={200}
                        width={500}
                        containerClassName="vehicle-container"
                      />
                    </SkeletonTheme>
                  ) : (
                    <p className="vehicles-null">No vehicles found.</p>
                  )}
                </>
              ) : (
                <>
                  <div className="vehicle-container">
                    {Object.entries(vehiclesData).map(
                      ([vehicleId, data], index) => (
                        <a
                          onClick={() => {
                            // {
                            //   role === "vip"
                            //     ? (setIsInitialFormVIPOpen(true),
                            //       setSelectedPlateNumber(vehicle.plate_number),
                            //       setSelectedModel(vehicle.model),
                            //       setSelectedCapacity(vehicle.capacity))
                            //     : vehicle.is_vip === true
                            //     ? (setIsDisclaimerOpen(true),
                            //       setSelectedPlateNumber(vehicle.plate_number),
                            //       setSelectedModel(vehicle.model),
                            //       setSelectedCapacity(vehicle.capacity))
                            //     : vehicle.merge_trip === true
                            //     ? (setIsRequesterTripMergingFormOpen(true),
                            //       setSelectedRequestId(vehicle.request_id))
                            //     : openRequestForm(
                            //         vehicle.plate_number,
                            //         vehicle.model,
                            //         vehicle.capacity
                            //       );
                            // }
                            setIsScheduleClick(true);
                            setSelectedVehicleExisitingSchedule(data.schedules);
                            setSelectedVehicleCapacity(data.capacity);
                            setSelectedVehicleDriver(data.driver_assigned_to);
                            setSelectedVehiclePlateNumber(data.plate_number);
                            setSelectedVehicleModel(data.model);
                            setSelectedVehicleIsVIP(data.is_vip);
                            setSelectedVehicleVIPAssignedTo(
                              data.vip_assigned_to
                            );
                          }}
                          className="vehicle-card"
                          key={vehicleId}
                          ref={
                            index === Object.keys(vehiclesData).length - 1
                              ? lastRequestElementRef
                              : null
                          }
                        >
                          <div className="vehicle-row">
                            <div className="vehicle-column">
                              <p className="vehicle-name">
                                {data.plate_number}
                                <br />
                                {data.model}
                              </p>
                              <p className="vehicle-detail">
                                Seating Capacity: {data.capacity}
                              </p>
                              <p className="vehicle-detail">
                                Type: {data.type}
                              </p>
                            </div>
                            <img
                              className="vehicle-image"
                              src={serverSideUrl + data.image}
                              alt={data.model}
                            />
                          </div>
                        </a>
                      )
                    )}
                    {isLoading && (
                      <SkeletonTheme
                        baseColor="#d9d9d9"
                        highlightColor="#f5f5f5"
                      >
                        <Skeleton
                          count={2}
                          height={200}
                          width={550}
                          containerClassName="vehicle-container"
                        />
                      </SkeletonTheme>
                    )}
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
                        {recommend.message}. Please select a vehicle. Thank you!
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
                              {schedule.vehicle_driver_status === "On Trip" ? (
                                <div className="ongoing-trip-text">
                                  <strong>Ongoing trip</strong>
                                  <strong className="loading-dots"></strong>
                                </div>
                              ) : (
                                <div className="count-down">
                                  <Countdown
                                    travelDate={schedule.travel_date}
                                    travelTime={schedule.travel_time}
                                  />
                                </div>
                              )}
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
                            <div className="next-user">
                              {nextSchedule
                                .filter(
                                  (nextSched) =>
                                    nextSched.previous_trip_id ===
                                    schedule.trip_id
                                )
                                .map((nextSched) => (
                                  <div>
                                    <strong>
                                      The next scheduled user of this vehicle
                                      will commence at:
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
      <InitialFormVip
        isOpen={isInitialFormVIPOpen}
        onRequestClose={handleClose}
        plateNumber={plateNumber}
        vehicleName={vehicleName}
        capacity={capacity}
      />
      <PromptDialog
        isOpen={isDisclaimerOpen}
        header="Disclaimer"
        content="This vehicle is prioritized for the higher official, and your reservation will be canceled once the higher official 
      uses it during your trip."
        footer="Are you sure you want to use this vehicle?"
        onProceed={handleOpenRequestFormForVIP}
        onRequestClose={handleClose}
        buttonText1="Proceed"
        buttonText2="Cancel"
      />
      <RequesterTripMergingForm
        isOpen={isRequesterTripMergingFormOpen}
        onRequestClose={handleClose}
        given_capacity={givenCapacity}
        requestId={selectedRequestId}
      />
      <SchedulePicker
        isOpen={isScheduleClick}
        selectedVehicleExisitingSchedule={selectedVehicleExisitingSchedule}
        setIsScheduleClick={setIsScheduleClick}
        selectedVehicleCapacity={capacity}
        selectedVehiclePlateNumber={plateNumber}
        selectedVehicleModel={vehicleName}
        selectedVehicleDriver={assignedDriver}
        selectedVehicleIsVIP={isVIP}
        selectedVehicleVIPAssignedTo={selectedVehicleVIPAssignedTo}
        setIsAnotherVehicle={setIsAnotherVehicle}
        anotherVehicleData={anotherVehicleData}
        setSelectedAnotherVehicle={setSelectedAnotherVehicle}
        isLoadingVehicles={isLoading}
      />
    </>
  );
}
