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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import USTPLogo from "../../assets/USTP LOGO.png";
import DocumentCode from "../../assets/documentcode.jpg";
import { RequestFormProps } from "../../interfaces/interfaces";
import { postRequestFromAPI } from "../api/api";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import AutoCompleteAddressGoogle from "../addressinput/googleaddressinput";

export default function RequestForm() {
  const [addressData, setAddressData] = useState<any>({
    destination: "",
    distance: null,
  });
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [isFifthyKilometers, setIsFifthyKilometers] = useState(false);
  const location = useLocation();
  const plateNumber = location.state?.plateNumber || "";
  const vehicleName = location.state?.vehicleName || "";
  const capacity = location.state?.capacity || "";
  // const travelDate = location.state?.data.travel_date || "";
  // const travelTime = location.state?.data.travel_time || "";
  // const returnDate = location.state?.data.return_date || "";
  // const returnTime = location.state?.data.return_time || "";
  const [distance, setDistance] = useState(0);
  const destination = location.state?.addressData.destination || "";

  const [requesterName, setRequesterName] = useState("");

  const [requesterOffice, setRequesterOffice] = useState("");
  const [travelTime, setTravelTime] = useState<string | null>(null);
  const [travelDate, setTravelDate] = useState<string | null>(null);

  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);

  const [category, setCategory] = useState("");

  const [data, setData] = useState<RequestFormProps>({
    purpose: "",
    number_of_passenger: null,
    passenger_name: [],
    travel_date: travelDate,
    travel_time: travelTime,
    return_date: returnDate,
    return_time: returnTime,
    destination: destination,
    vehicle: `${plateNumber}`,
    type: category,
    distance: distance,
    merge_trip: false,
  });

  const [numPassengers, setNumPassengers] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [exceedsCapacity, setExceedsCapacity] = useState(false);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<any[]>([]);

  useEffect(() => {
    if (addressData.distance) {
      setDistance(addressData.distance);
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
    let updatedPassengerNames = [...data.passenger_name];
    if (numPassengers > data.passenger_name.length) {
      const additionalPassengers = new Array(
        numPassengers - data.passenger_name.length
      ).fill("");
      updatedPassengerNames =
        updatedPassengerNames.concat(additionalPassengers);
    } else if (numPassengers < data.passenger_name.length) {
      updatedPassengerNames = updatedPassengerNames.slice(0, numPassengers);
    }
    setData({
      ...data,
      passenger_name: updatedPassengerNames,
      number_of_passenger: numPassengers,
    });
  }, [numPassengers]);

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
            value={data.passenger_name[i] || ""} // Ensure a default value to avoid undefined
            key={i}
            icon={faUser}
            label={`Passenger ${i + 1}`}
            placeholder={`Passenger ${i + 1}`}
            onChange={(event) => {
              const newPassengerNames = [...data.passenger_name];
              newPassengerNames[i] = event.target.value;
              setData({ ...data, passenger_name: newPassengerNames });
              // Update error messages if any
              if (newPassengerNames[i]) {
                const updatedErrors = { ...errorMessages };
                delete updatedErrors[0]?.passengerNameError[i];
                delete updatedErrors[0]?.all;
                setErrorMessages(updatedErrors);
              }
            }}
          />
          <p className="set-trip-text-error">
            {errorMessages[0]?.passengerNameError[i]}
          </p>
        </div>
      );
    }
    return inputs;
  };

  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = () => {
    let validationErrors: { [key: string]: string[] } = {
      passengerNameError: [],
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
      validationErrors.passengerNameError = [];
      data.passenger_name.forEach((name, index) => {
        if (!name || name.trim().length === 0) {
          validationErrors.passengerNameError[index] = "This field is required";
        }
      });
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
      validationErrors.passengerNameError.length === 0 &&
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

  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const vehicles = useSelector((state: RootState) => state.vehiclesData.data);

  const dropdownOptions = vehicles.map(
    (vehicle) => `${vehicle.model} - ${vehicle.plate_number}`
  );

  const [plate_Number, setPlateNumber] = useState("");
  const [vehicle_Name, setVehicleName] = useState("");

  const handleCategoryChange = (selectedOption: string) => {
    // Assuming the selectedOption is in the format "Vehicle Model - Plate Number"
    const [selectedModel, selectedPlate] = selectedOption.split(" - ");
    setVehicleName(selectedModel); // Update the vehicle name state
    setPlateNumber(selectedPlate); // Update the plate number state
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
            <h1>Vehicle Request Form</h1>
            <img src={DocumentCode} alt="Document Code" />
          </div>
          <div className="form-body">
            <div className="form-body-shadow">
              <div className="first-row">
                <p className="set-trip-text-error">{errorMessages[0]?.all}</p>
                <div className="first-row-column">
                  <div className="requester-info-name">
                    <strong>Requester's name:</strong>
                    <input
                      className="destination-input"
                      type="text"
                      value={requesterName}
                      onChange={(e) => setRequesterName(e.target.value)}
                    />
                  </div>
                  <div className="requester-office">
                    <strong>Office:</strong>
                    <input
                      className="office-input"
                      type="text"
                      value={requesterOffice}
                      onChange={(e) => setRequesterOffice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="passengers-name-row">
                <div className="fifth-row">
                  <div className="travel-type">
                    <strong>Travel Type:</strong>
                    <select
                      className="type-options"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Round Trip">Select Type</option>
                      <option value="Round Trip">Round Trip</option>
                      <option value="One-way - Fetch">One-way - Fetch</option>
                      <option value="One-way - Drop">One-way - Drop</option>
                    </select>
                  </div>
                </div>
                <div className="input-passenger-number">
                  <p className="maximum-capacity-note">
                    Vehicle maximum capacity: {capacity}
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
              <div className="forth-row">
                <div className="calendar-containerr">
                  <strong>Date of Travel:</strong>
                  <div className="date-and-time">
                    <CalendarInput
                      containerClassName="calendar-container"
                      calendarClassName="calendar-input"
                      iconClassName="calendar-input-icon"
                      onChange={(date) =>
                        setTravelDate(date?.toISOString().split("T")[0] || "")
                      }
                      selectedDate={travelDate ? new Date(travelDate) : null}
                    />
                  </div>
                </div>
                <div className="calendar-containerr">
                  <strong>Time of Travel:</strong>
                  <div className="date-and-time">
                    <TimeInput
                      onChange={(time) => setTravelTime(time || "")} // Use an empty string as a fallback
                      selectedDate={
                        travelDate
                          ? new Date(travelDate).toISOString().split("T")[0]
                          : null
                      }
                      handleDateChange={(date) => {
                        const formattedDate = date
                          ? new Date(date).toISOString().split("T")[0]
                          : null;
                        setTravelDate(formattedDate || ""); // Use an empty string as a fallback
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="forth-row">
                <div className="calendar-containerr">
                  <strong>Return Date:</strong>
                  {category === "Round Trip" ? (
                    <div className="date-and-time">
                      <CalendarInput
                        containerClassName="calendar-container"
                        calendarClassName="calendar-input"
                        iconClassName="calendar-input-icon"
                        onChange={(date) =>
                          setReturnDate(date?.toISOString().split("T")[0] || "")
                        }
                        selectedDate={returnDate ? new Date(returnDate) : null}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>Estimated</p>
                    </div>
                  )}
                </div>

                <div className="calendar-containerr">
                  <strong>Return Time </strong>
                  {category === "Round Trip" ? (
                    <div className="date-and-time">
                      <TimeInput
                        onChange={(returnTime) =>
                          setReturnTime(returnTime || "")
                        }
                        selectedDate={
                          travelDate
                            ? new Date(travelDate).toISOString().split("T")[0]
                            : null
                        }
                        handleDateChange={(date) => {
                          const formattedDate = date
                            ? new Date(date).toISOString().split("T")[0]
                            : null;
                          setReturnDate(formattedDate || "");
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>Estimated</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="third-row2">
                <div className="vehicle-info-name">
                  <strong>Vehicle:</strong>
                  <p>
                    <div className="vehicle-options">
                      <select
                        className="select-options"
                        value={`${vehicle_Name} - ${plate_Number}`} // Ensure the value reflects the current state
                        onChange={(e) => handleCategoryChange(e.target.value)}
                      >
                        <option value="">Select Vehicle</option>
                        {vehicles.map((vehicle) => (
                          <option
                            key={vehicle.plate_number}
                            value={`${vehicle.model} - ${vehicle.plate_number}`}
                          >
                            {`${vehicle.model} - ${vehicle.plate_number}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </p>
                </div>
                <div className="destination-info">
                  <strong>Destination: </strong>
                  <AutoCompleteAddressGoogle
                    travel_date={travelDate}
                    travel_time={travelTime}
                    setData={setData}
                    setAddressData={setAddressData}
                    category={category}
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
              <div className="sixth-row">
                <div className="purpose-row">
                  <InputField
                    className="purpose-width"
                    icon={faClipboard}
                    value={data.purpose}
                    label="Purpose"
                    placeholder="Purpose"
                    onChange={(event) => {
                      setData({ ...data, purpose: event.target.value });
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
