import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../container/container";
import Header from "../header/header";
import InputField from "../inputfield/inputfield";
import "./requestform.css";
import {
  faUser,
  faUsers,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import Confirmation from "../confirmation/confirmation";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import USTPLogo from "../../assets/USTP LOGO.png";
import DocumentCode from "../../assets/documentcode.jpg";
import { RequestFormProps } from "../../interfaces/interfaces";
import {
  checkVehicleAvailability,
  fetchDriversScheduleAPI,
  fetchRequestersAPI,
  postRequestFromAPI,
} from "../api/api";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import AutoCompleteAddressGoogle from "../addressinput/googleaddressinput";
import { format } from "date-fns";
import { formatDate, formatTime } from "../functions/getTimeElapsed";
import Dropdown from "../dropdown/dropdown";

export default function RequestForm() {
  const [addressData, setAddressData] = useState<any>({
    destination: "",
    distance: null,
  });
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [isFifthyKilometers, setIsFifthyKilometers] = useState(false);
  const location = useLocation();
  const capacity = location.state?.capacity || "";
  const [distance, setDistance] = useState(0);
  const destination = location.state?.addressData.destination || "";
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [driversData, setDriversData] = useState<any[]>([]);
  const [requesters, setRequesters] = useState<any[]>([]);
  const [data, setData] = useState<RequestFormProps>({
    purpose: "",
    number_of_passenger: null,
    passenger_name: [],
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
    destination: destination,
    vehicle: "",
    type: "",
    distance: distance,
    merge_trip: false,
    role: "",
    driver_name: "",
    office: "",
    requester_name: "",
    vehicle_capacity: null,
  });

  const requester = null;

  const [numPassengers, setNumPassengers] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [exceedsCapacity, setExceedsCapacity] = useState(false);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<any[]>([]);

  const dropdownVehicles = [
    "Select Vehicle",
    ...vehicles.map(
      (vehicle: any) => `${vehicle.plate_number} ${vehicle.model}`
    ),
  ];

  const handleFetchVehicles = () => {
    checkVehicleAvailability(
      setVehicles,
      data.travel_date,
      data.travel_time,
      data.return_date,
      data.return_time,
      numPassengers,
      setLoadingBarProgress,
      () => {}
    );
  };

  const handleChooseVehicle = (vehicleName: string) => {
    const selectedVehicle = vehicles.find((vehicle) => {
      const { plate_number, model } = vehicle;
      const fullName = `${plate_number} ${model}`;
      return fullName === vehicleName;
    });

    if (selectedVehicle) {
      setData((prevData: any) => ({
        ...prevData,
        vehicle: selectedVehicle.plate_number,
        vehicle_capacity: selectedVehicle.capacity,
      }));
    }
    // if (vehicleName === "Select Driver") {

    // }
    // const updatedErrors = { ...errorMessages };
    // delete updatedErrors[0]?.driverSelectionError;
    // setErrorMessages(updatedErrors);
  };

  const handleFetchDrivers = () => {
    fetchDriversScheduleAPI(
      setDriversData,
      data.travel_date,
      data.travel_time,
      data.return_date,
      data.return_time
    );
  };

  const dropdownDrivers = [
    "Select Driver",
    ...driversData.map(
      (driver) =>
        `${driver.first_name} ${driver.middle_name} ${driver.last_name}`
    ),
  ];

  const handleChooseDriver = (driverName: string) => {
    const selectedDriver = driversData.find((driver) => {
      const { first_name, middle_name, last_name } = driver;
      const fullName = `${first_name} ${middle_name} ${last_name}`;
      return fullName === driverName;
    });

    if (selectedDriver) {
      setData((prevData: any) => ({
        ...prevData,
        driver_name: selectedDriver.id,
      }));
    }
    // if (driverName === "Select Driver") {
    //   setSelectedDriverId(null);
    // }
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.driverSelectionError;
    setErrorMessages(updatedErrors);
  };

  useEffect(() => {
    if (addressData.distance && addressData.destination) {
      setDistance(addressData.distance);
      setData((prevData: any) => ({
        ...prevData,
        role: "office staff",
        merge_trip: false,
        distance: addressData.distance,
        destination: addressData.destination,
      }));
    }
  }, [addressData.distance]);
  useEffect(() => {
    if (distance >= 50) {
      setIsFifthyKilometers(true);
    } else if (distance < 50) {
      setIsFifthyKilometers(false);
    }
  }, []);

  useEffect(() => {
    // Check if data.passenger_name exists before creating a copy
    const updatedPassengerNames = data.passenger_name
      ? [...data.passenger_name]
      : [];

    if (numPassengers > updatedPassengerNames.length) {
      const additionalPassengers = new Array(
        numPassengers - updatedPassengerNames.length
      ).fill("");
      updatedPassengerNames.push(...additionalPassengers);
    } else if (numPassengers < updatedPassengerNames.length) {
      updatedPassengerNames.splice(numPassengers); // Remove excess passengers
    }
    const filteredPassengerData = updatedPassengerNames.filter(
      (name) => name !== ""
    );

    setData((prevData: any) => ({
      ...prevData,
      passenger_name: filteredPassengerData,
      number_of_passenger: numPassengers,
    }));
  }, [numPassengers]);

  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData((prevData: any) => ({
      ...prevData,
      travel_date: formattedDate,
    }));
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

    // checkAutocompleteDisability();
  };

  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData((prevData: any) => ({
      ...prevData,
      return_date: formattedDate,
    }));
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.returnDateError;
    setErrorMessages(updatedErrors);
  };

  const handleStartTimeChange = (time: string | null) => {
    if (time) {
      setData((prevData: any) => ({
        ...prevData,
        travel_time: time,
      }));
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
      // checkAutocompleteDisability();
    } else {
      console.log("No time selected.");
    }
  };

  const handleEndTimeChange = (time: string | null) => {
    if (time) {
      setData((prevData: any) => ({
        ...prevData,
        return_time: time,
      }));
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.returnTimeError;
      setErrorMessages(updatedErrors);
    } else {
      console.log("No time selected.");
    }
  };

  const handlePassengerChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.numberOfPassengersError;
      delete updatedErrors[0]?.all;
      setErrorMessages(updatedErrors);
    }
    const { value } = event.target;
    setNumPassengers(Number(value));

    if (Number(value) > capacity) {
      setExceedsCapacity(false);
    } else {
      setExceedsCapacity(false);
    }
  };

  const generatePassengerInputs = () => {
    const inputs = [];
    for (let i = 0; i < numPassengers; i++) {
      inputs.push(
        <div key={i} className="passenger-name-column">
          <InputField
            className="passenger_name_width"
            value={(data.passenger_name && data.passenger_name[i]) || ""}
            key={i}
            icon={faUser}
            label={`Passenger ${i + 1}`}
            placeholder={`Passenger ${i + 1}`}
            onChange={(event) => {
              const newPassengerNames = [...data.passenger_name];
              newPassengerNames[i] = event.target.value;
              setData((prevData: any) => ({
                ...prevData,
                passenger_name: newPassengerNames,
              }));
              // Update error messages if any
            }}
          />
        </div>
      );
    }
    return inputs;
  };

  useEffect(() => {
    fetchRequestersAPI(setRequesters, requester);
  }, []);

  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };

  const handleSelectRequester = (event: any, value: any) => {
    setData({
      ...data,
      requester_name: value.id,
      office: value.office,
    });
    console.log(event);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = () => {
    console.log(data);
    let validationErrors: { [key: string]: string[] } = {
      all: [],
      purposeError: [],
      numberOfPassengersError: [],
      numberOfPassengersExceedError: [],
    };
    const allFieldsBlank = !data.purpose && !data.number_of_passenger;
    !data.category && !data.destination && !data.distance;
    const semiFieldsBlank = !data.purpose && !data.number_of_passenger;

    if (allFieldsBlank) {
      validationErrors.all = ["Required all fields!"];
    } else if (semiFieldsBlank) {
      validationErrors.all = ["Required all fields!"];
    } else {
      if (!data.number_of_passenger) {
        validationErrors.numberOfPassengersError = ["This field is required"];
      }
      if (!data.purpose) {
        validationErrors.purposeError = ["This field is required"];
      }

      if (exceedsCapacity) {
        validationErrors.numberOfPassengersExceedError = [
          "Exceeds seating capacity of the vehicle",
        ];
      }
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);
    console.log(data);
    if (
      validationErrors.numberOfPassengersError.length === 0 &&
      validationErrors.purposeError.length === 0 &&
      validationErrors.numberOfPassengersExceedError.length === 0 &&
      validationErrors.all.length === 0
    ) {
      setLoadingBarProgress(20);
      // setIsModalOpen(true);
      postRequestFromAPI(
        data,
        // () => {
        //   setIsConfirmationOpen(true);
        //   setIsModalOpen(true); // Open the modal after the request is successful
        // },
        setIsConfirmationOpen,
        navigate,
        setLoadingBarProgress
      );
    }
  };

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <ToastContainer />
      <Header />
      <Container>
        {/* Conditionally render the CSM component as a modal */}
        {/* {isModalOpen && (
          <div className="modal-overlay">
            <Csm />
          </div>
        )} */}
        <div className="request-form-body">
          <div className="request-form-header">
            <img src={USTPLogo} alt="USTP Logo" />
            <h1>Request Form</h1>
            <img src={DocumentCode} alt="Document Code" />
          </div>
          <div className="form-body">
            <div className="form-body-shadow">
              <div className="first-row">
                <p className="set-trip-text-error">{errorMessages[0]?.all}</p>
                <div className="first-row-column">
                  <div className="requester-info-name">
                    <strong>Requester's name:</strong>
                    {/* <input
                      className="destination-input"
                      type="text"
                      value={requesterName}
                      onChange={(e) => setRequesterName(e.target.value)}
                    /> */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={requesters}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select requester" />
                      )}
                      getOptionLabel={(option) =>
                        `${option.first_name} ${option.middle_name} ${option.last_name}`
                      }
                      onChange={handleSelectRequester}
                    />
                  </div>
                  <div className="requester-office">
                    <strong>Office:</strong>
                    <p>{data.office}</p>
                  </div>
                </div>
              </div>
              <div className="passengers-name-row">
                <div className="fifth-row">
                  <div className="travel-type">
                    <strong>Travel Type:</strong>
                    <select
                      className="type-options"
                      value={data.type}
                      onChange={(e) => {
                        setData({
                          ...data,
                          type: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="Round Trip">Round Trip</option>
                      <option value="One-way - Drop">One-way - Drop</option>
                      <option value="One-way - Fetch">One-way - Fetch</option>
                    </select>
                  </div>
                </div>
                <div className="input-passenger-number">
                  <p className="maximum-capacity-note">
                    No. of passenger{"("}s{")"}: {capacity}
                  </p>
                  <InputField
                    icon={faUsers}
                    onKeyDown={handleKeyDown}
                    label="No. of passengers"
                    value={numPassengers}
                    onChange={handlePassengerChange}
                    type="number"
                  />
                  <p className="set-trip-text-error">
                    {errorMessages[0]?.numberOfPassengersError}
                  </p>

                  {exceedsCapacity && (
                    <p className="set-trip-text-error">
                      Exceeds seating capacity of the vehicle
                    </p>
                  )}
                </div>
              </div>
              {data.type === "Round Trip" && (
                <>
                  <div className="forth-row">
                    <div className="calendar-containerr">
                      <strong>Date of Travel:</strong>
                      <div className="date-and-time">
                        <CalendarInput
                          containerClassName="calendar-container"
                          calendarClassName="calendar-input"
                          iconClassName="calendar-input-icon"
                          onChange={handleStartDateChange}
                          selectedDate={
                            data.travel_date ? new Date(data.travel_date) : null
                          }
                        />
                      </div>
                    </div>
                    <div className="calendar-containerr">
                      <strong>Time of Travel:</strong>
                      <div className="date-and-time">
                        <TimeInput
                          onChange={handleStartTimeChange}
                          selectedDate={data.travel_date}
                          handleDateChange={handleStartDateChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="forth-row">
                    <div className="calendar-containerr">
                      <strong>Return Date:</strong>
                      {data.type === "Round Trip" ? (
                        <div className="date-and-time">
                          <CalendarInput
                            containerClassName="calendar-container"
                            calendarClassName="calendar-input"
                            iconClassName="calendar-input-icon"
                            selectedDate={
                              data.return_date
                                ? new Date(data.return_date)
                                : null
                            }
                            onChange={handleEndDateChange}
                            disableDaysBefore={3}
                          />
                        </div>
                      ) : (
                        <div>
                          <p>{formatDate(data.return_date)}</p>
                        </div>
                      )}
                    </div>

                    <div className="calendar-containerr">
                      <strong>Return Time </strong>
                      {data.type === "Round Trip" ? (
                        <div className="date-and-time">
                          <TimeInput
                            onChange={handleEndTimeChange}
                            selectedDate={data.return_date}
                            handleDateChange={handleEndDateChange}
                          />
                        </div>
                      ) : (
                        <div>
                          <p>{formatTime(data.return_time)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {data.travel_date && data.travel_time && (
                    <>
                      <div className="destinationn-row">
                        <div className="destination-info">
                          <strong>Destination: </strong>
                          <AutoCompleteAddressGoogle
                            travel_date={data.travel_date}
                            travel_time={data.travel_time}
                            setData={setData}
                            setAddressData={setAddressData}
                            category={data.type}
                            removeDestinationError={() =>
                              setErrorMessages((prev) => ({
                                ...prev,
                                destinationError: undefined,
                              }))
                            }
                            className="googledestination"
                          />
                        </div>

                        <div className="kilometer-info">
                          <strong>Distance:</strong>
                          <p>{distance} km</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {(data.type === "One-way - Drop" ||
                data.type === "One-way - Fetch") && (
                <>
                  <div className="forth-row">
                    <div className="calendar-containerr">
                      <strong>Date of Travel:</strong>
                      <div className="date-and-time">
                        <CalendarInput
                          containerClassName="calendar-container"
                          calendarClassName="calendar-input"
                          iconClassName="calendar-input-icon"
                          onChange={handleStartDateChange}
                          selectedDate={
                            data.travel_date ? new Date(data.travel_date) : null
                          }
                        />
                      </div>
                    </div>
                    <div className="calendar-containerr">
                      <strong>Time of Travel:</strong>
                      <div className="date-and-time">
                        <TimeInput
                          onChange={handleStartTimeChange}
                          selectedDate={data.travel_date}
                          handleDateChange={handleStartDateChange}
                        />
                      </div>
                    </div>
                  </div>
                  {data.travel_date && data.travel_time && (
                    <>
                      <div className="destinationn-row">
                        <div className="destination-info">
                          <strong>Destination: </strong>
                          <AutoCompleteAddressGoogle
                            travel_date={data.travel_date}
                            travel_time={data.travel_time}
                            setData={setData}
                            setAddressData={setAddressData}
                            category={data.type}
                            removeDestinationError={() =>
                              setErrorMessages((prev) => ({
                                ...prev,
                                destinationError: undefined,
                              }))
                            }
                            className="googledestination"
                          />
                        </div>

                        <div className="kilometer-info">
                          <strong>Distance:</strong>
                          <p>{distance} km</p>
                        </div>
                      </div>
                    </>
                  )}

                  {data.return_date && data.return_time && (
                    <>
                      <div className="forth-row">
                        <div className="calendar-containerr">
                          <strong>Estimated Return Date:</strong>

                          <div>
                            <p>{formatDate(data.return_date)}</p>
                          </div>
                        </div>

                        <div className="calendar-containerr">
                          <strong>Estimated Return Time </strong>=
                          <div>
                            <p>{formatTime(data.return_time)}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {data.travel_date &&
                data.travel_time &&
                data.return_date &&
                data.return_time &&
                data.number_of_passenger && (
                  <>
                    <div className="third-row2">
                      <div className="vehicle-info-name">
                        <strong>Vehicle:</strong>
                        <p>
                          <div className="vehicle-options">
                            <div onClick={handleFetchVehicles}>
                              <Dropdown
                                status={dropdownVehicles}
                                onCategoryChange={handleChooseVehicle}
                                dropdownClassName="dropdown-custom"
                                menuClassName="menu-custom"
                              />
                            </div>
                          </div>
                        </p>
                      </div>
                      <div className="vehicle-info-name">
                        <strong>Driver:</strong>
                        <div onClick={handleFetchDrivers}>
                          <Dropdown
                            status={dropdownDrivers}
                            onCategoryChange={handleChooseDriver}
                            dropdownClassName="dropdown-custom"
                            menuClassName="menu-custom"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sixth-row">
                      <div className="purpose-row">
                        <InputField
                          className="purpose-width"
                          icon={faClipboard}
                          value={data.purpose}
                          label="Purpose"
                          placeholder="Purpose"
                          onChange={(event) => {
                            setData((prevData: any) => ({
                              ...prevData,
                              purpose: event.target.value,
                            }));
                            if (event.target.value) {
                              const updatedErrors = { ...errorMessages };
                              delete updatedErrors[0]?.purposeError;
                              delete updatedErrors[0]?.all;
                              setErrorMessages(updatedErrors);
                            }
                          }}
                        />

                        <p className="set-trip-text-error">
                          {errorMessages[0]?.purposeError}
                        </p>
                      </div>
                    </div>
                    <div className="sixth-row">
                      <div className="requester-info-name">
                        <strong>Passenger's name(s):</strong>
                      </div>
                      <div className="passenger-input-fields">
                        {generatePassengerInputs()}
                      </div>
                    </div>
                  </>
                )}

              <div className="seventh-row">
                {isFifthyKilometers && (
                  <p>
                    Note: Requesters traveling to destinations exceed 50
                    kilometers are required to provide a travel order for the
                    vehicle's fuel and
                    <br></br>
                    the driver's per diem.
                  </p>
                )}

                <div className="button-row-container">
                  <button onClick={handleGoBack}>Go back</button>
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Confirmation
        isOpen={isConfirmationOpen}
        header="Request Submitted!"
        content="We will send you a notification about your request ASAP."
        footer="Thank you!"
      />
    </>
  );
}
