import { useState, ChangeEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { RequestFormProps } from "../../interfaces/interfaces";
import {
  checkVehicleAvailability,
  fetchDriversScheduleAPI,
  fetchRequestersAPI,
  postRequestFormAPI,
} from "../api/api";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import AutoCompleteAddressGoogle from "../addressinput/googleaddressinput";
import { format } from "date-fns";
import { formatDate, formatTime } from "../functions/functions";
import CommonButton from "../button/commonbutton";

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
  const [errorMessages, setErrorMessages] = useState<any[]>([]);

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

  const handleChooseVehicle = (event: any, value: any) => {
    const selectedVehicle = vehicles.find((vehicle) => {
      const { plate_number, model } = vehicle;
      const fullName = `${plate_number} ${model}`;
      const fullValueName = `${value.plate_number} ${value.model}`;
      return fullName === fullValueName;
    });
    console.log(event);

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

  const handleChooseDriver = (event: any, value: any) => {
    const selectedDriver = driversData.find((driver) => {
      const { first_name, middle_name, last_name } = driver;
      const fullName = `${first_name} ${middle_name} ${last_name}`;
      const fullValueName = `${value.first_name} ${value.middle_name} ${value.last_name}`;
      return fullName === fullValueName;
    });
    console.log(event);
    if (selectedDriver) {
      setData((prevData: any) => ({
        ...prevData,
        driver_name: selectedDriver.id,
      }));
    }

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
    for (let i = 0; i < data.vehicle_capacity; i++) {
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
              const newPassengerNames = [...(data.passenger_name || "")];
              newPassengerNames[i] = event.target.value;
              const countNumberOfPassenger = newPassengerNames.filter(
                (name) => name !== ""
              ).length;
              setData((prevData: any) => ({
                ...prevData,
                passenger_name: newPassengerNames,
                number_of_passenger: countNumberOfPassenger,
              }));
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

  const handleTravelTypeChange = (event: any, newValue: any) => {
    setData({
      ...data,
      type: newValue ? newValue.value : "",
    });
    console.log(event);
  };

  const travelTypes = [
    { label: "Round Trip", value: "Round Trip" },
    { label: "One-way - Drop", value: "One-way - Drop" },
    { label: "One-way - Fetch", value: "One-way - Fetch" },
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = () => {
    let validationErrors: { [key: string]: string[] } = {
      all: [],
      purposeError: [],
      numberOfPassengersError: [],
      numberOfPassengersExceedError: [],
    };
    const allFieldsBlank = !data.purpose;
    !data.category && !data.destination && !data.distance;
    const semiFieldsBlank = !data.purpose;

    if (allFieldsBlank) {
      validationErrors.all = ["Required all fields!"];
    } else if (semiFieldsBlank) {
      validationErrors.all = ["Required all fields!"];
    } else {
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
    if (
      validationErrors.numberOfPassengersError.length === 0 &&
      validationErrors.purposeError.length === 0 &&
      validationErrors.numberOfPassengersExceedError.length === 0 &&
      validationErrors.all.length === 0
    ) {
      setLoadingBarProgress(20);
      // setIsModalOpen(true);
      postRequestFormAPI(data, setIsConfirmationOpen, setLoadingBarProgress);
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

      <div className="request-form-body">
        <div className="form-body">
          <div className="form-body-shadow">
            <div className="first-row">
              <p className="set-trip-text-error">{errorMessages[0]?.all}</p>
              <div className="first-row-column">
                <div className="requester-info-name">
                  <strong className="strong">Requester's name:</strong>
                  <div className="new-input-style">
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
                </div>
                <div className="requester-info-name">
                  <strong className="strong">Travel Type:</strong>
                  <div className="new-input-style">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={travelTypes}
                      sx={{ width: 300 }}
                      getOptionLabel={(option) => option.label}
                      onChange={handleTravelTypeChange}
                      value={travelTypes.find(
                        (type) => type.value === data.type
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Select type" />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="first-row-column">
                <div className="requester-info-name">
                  <strong className="strong">Office:</strong>
                  <p className="new-input-style">{data.office}</p>
                </div>
                <div className="requester-info-name">
                  <p className="strong">
                    No. of passenger{"("}s{")"}: {capacity}
                  </p>
                  <div className="new-input-style">
                    <InputField
                      icon={faUsers}
                      onKeyDown={handleKeyDown}
                      label="No. of passengers"
                      value={numPassengers}
                      onChange={handlePassengerChange}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------------------------------------------------------------------------------- */}
            <div className="first">
              {data.type === "Round Trip" && (
                <>
                  <div className="first-row">
                    <div className="first-row-column-2">
                      <div className="requester-info-name">
                        <strong className="strong">Date of Travel:</strong>
                        <div className="new-input-style">
                          <CalendarInput
                            containerClassName="calendar-container"
                            calendarClassName="calendar-input"
                            iconClassName="calendar-input-icon"
                            onChange={handleStartDateChange}
                            selectedDate={
                              data.travel_date
                                ? new Date(data.travel_date)
                                : null
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="first-row-column-2">
                      <div className="requester-info-name">
                        <strong className="strong">Time of Travel:</strong>
                        <div className="new-input-style">
                          <TimeInput
                            onChange={handleStartTimeChange}
                            selectedDate={data.travel_date}
                            handleDateChange={handleStartDateChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ----------------------------------------------------------------------- */}
                  <div className="first-row">
                    <div className="first-row-column-2">
                      <div className="requester-info-name">
                        <strong className="strong">Return Date:</strong>
                        {data.type === "Round Trip" ? (
                          <div className="new-input-style">
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
                            />
                          </div>
                        ) : (
                          <div>
                            <p>{formatDate(data.return_date)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="first-row-column-2">
                      <div className="requester-info-name">
                        <strong className="strong">Return Time </strong>
                        {data.type === "Round Trip" ? (
                          <div className="new-input-style ">
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
                  </div>

                  {data.travel_date && data.travel_time && (
                    <>
                      <div className="first-row">
                        <div className="first-row-column-2">
                          <div className="requester-info-name">
                            <strong className="strong">Destination: </strong>
                            <div className="new-input-style">
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
                          </div>
                        </div>
                        <div className="first-row-column-2">
                          <div className="requester-info-name">
                            <strong className="strong">Distance:</strong>
                            <div className="new-input-style">
                              <p>{distance} km</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {(data.type === "One-way - Drop" ||
                data.type === "One-way - Fetch") && (
                <>
                  <div className="first-row">
                    <div className="first-row-column-2">
                      <div className="requester-info-name">
                        <strong>Date of Travel:</strong>
                        <div className="new-input-style">
                          <CalendarInput
                            containerClassName="calendar-container"
                            calendarClassName="calendar-input"
                            iconClassName="calendar-input-icon"
                            onChange={handleStartDateChange}
                            selectedDate={
                              data.travel_date
                                ? new Date(data.travel_date)
                                : null
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="first-row-column-2">
                      <div className="requester-info-name">
                        <strong className="strong">Time of Travel:</strong>
                        <div className="new-input-style">
                          <TimeInput
                            onChange={handleStartTimeChange}
                            selectedDate={data.travel_date}
                            handleDateChange={handleStartDateChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {data.travel_date && data.travel_time && (
                    <>
                      <div className="first-row">
                        <div className="first-row-column-2">
                          <div className="requester-info-name">
                            <strong className="strong">Destination: </strong>
                            <div className="new-input-style">
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
                          </div>
                        </div>
                        <div className="first-row-column-2">
                          <div className="requester-info-name">
                            <strong className="strong">Distance:</strong>
                            <div className="new-input-style">
                              <p>{distance} km</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {data.return_date && data.return_time && (
                    <>
                      <div className="first-row">
                        <div className="first-row-column-2">
                          <div className="requester-info-name">
                            <strong className="strong">
                              Estimated Return Date:
                            </strong>
                            <div className="new-input-style">
                              <p>{formatDate(data.return_date)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="first-row-column-2">
                          <div className="requester-info-name">
                            <strong>Estimated Return Time </strong>
                            <div className="new-input-style">
                              <p>{formatTime(data.return_time)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            {/* -------------------------------------------------------------------------------------------- */}
            {data.travel_date &&
              data.travel_time &&
              data.return_date &&
              data.return_time && (
                <>
                  <div className="first-row">
                    <div className="first-row-column-2">
                      <div className="requester-info-name">
                        <strong className="strong">Vehicle:</strong>
                        <div
                          className="new-input-style"
                          onClick={handleFetchVehicles}
                        >
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={vehicles}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField {...params} label="Select vehicle" />
                            )}
                            getOptionLabel={(option) =>
                              `${option.model} ${option.plate_number} `
                            }
                            onChange={handleChooseVehicle}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="first-row-column-2">
                      <div className="requester-info-name">
                        <strong className="strong">Driver:</strong>
                        <div
                          className="new-input-style"
                          onClick={handleFetchDrivers}
                        >
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={driversData}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField {...params} label="Select driver" />
                            )}
                            getOptionLabel={(option) =>
                              `${option.first_name} ${option.middle_name} ${option.last_name}`
                            }
                            onChange={handleChooseDriver}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------------------------------------------------------------- */}
                  <div className="first-row">
                    <div className="second-row">
                      <div className="first-row-column-3">
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
                  </div>
                  {/* ------------------------------------------------------------------------- */}
                  <div className="third-row">
                    <div className="third-row-passenger">
                      <strong>Passenger's name(s):</strong>
                    </div>
                    <div className="passenger-fields-new">
                      <div className="passenger-input-fields">
                        {generatePassengerInputs()}
                      </div>
                    </div>
                  </div>
                  <div className="note-new-style">
                    <div className="first-row-column-4">
                      {isFifthyKilometers && (
                        <p>
                          Note: Requesters traveling to destinations exceed 50
                          kilometers are required to provide a travel order for
                          the vehicle's fuel and
                          <br></br>
                          the driver's per diem.
                        </p>
                      )}

                      <div className="button-row-container">
                        <CommonButton
                          width={8}
                          height={6}
                          secondaryStyle
                          onClick={handleGoBack}
                          text={"Go back"}
                        />

                        <CommonButton
                          width={8}
                          height={6}
                          primaryStyle
                          onClick={handleSubmit}
                          text={"Submit"}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>

      <Confirmation
        isOpen={isConfirmationOpen}
        header="Request Submitted!"
        content="We will send you a notification about your request ASAP."
        footer="Thank you!"
      />
    </>
  );
}
