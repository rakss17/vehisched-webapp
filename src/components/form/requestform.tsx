import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../container/container";
import Header from "../header/header";
import InputField from "../inputfield/inputfield";
import "./requestform.css";
import {
  faUser,
  faBuilding,
  faUsers,
  faCar,
  faClipboard,
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddressInput from "../addressinput/addressinput";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import Confirmation from "../confirmation/confirmation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import USTPLogo from "../../assets/USTP LOGO.png";
import DocumentCode from "../../assets/documentcode.jpg";
import { RequestFormProps } from "../../interfaces/interfaces";
import { postRequestFromAPI } from "../api/api";
import { format } from "date-fns";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Csm from "../csm/csm";
import { Modal } from "@mui/material";

export default function RequestForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [isFifthyKilometers, setIsFifthyKilometers] = useState(false);
  const location = useLocation();
  const plateNumber = location.state?.plateNumber || "";
  const vehicleName = location.state?.vehicleName || "";
  const capacity = location.state?.capacity || "";
  const travelDate = location.state?.data.travel_date || "";
  const travelTime = location.state?.data.travel_time || "";
  const returnDate = location.state?.data.return_date || "";
  const returnTime = location.state?.data.return_time || "";
  const category = location.state?.data.category || "";
  const distance = location.state?.addressData.distance || "";
  const destination = location.state?.addressData.destination || "";
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const firstName = personalInfo?.first_name;
  const lastName = personalInfo?.last_name;
  const middleName = personalInfo?.middle_name;
  const userID = personalInfo?.id;
  const office = personalInfo?.office;
  const [data, setData] = useState<RequestFormProps>({
    requester_name: userID,
    office: office,
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
  });
  const [numPassengers, setNumPassengers] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [exceedsCapacity, setExceedsCapacity] = useState(false);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<any[]>([]);

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
      setExceedsCapacity(true);
    } else {
      setExceedsCapacity(false);
    }
  };

  const generatePassengerInputs = () => {
    const inputs = [];
    if (numPassengers <= capacity) {
      for (let i = 0; i < numPassengers; i++) {
        inputs.push(
          <div key={i} className="passenger-name-column">
            <InputField
              className="passenger_name_width"
              value={data.passenger_name[i]}
              key={i}
              icon={faUser}
              label={`Passenger ${i + 1}`}
              placeholder={`Passenger ${i + 1}`}
              onChange={(event) => {
                const newPassengerNames = [...data.passenger_name];
                newPassengerNames[i] = event.target.value;
                setData({ ...data, passenger_name: newPassengerNames });
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
    navigate("/DashboardR");
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

    if (
      validationErrors.numberOfPassengersError.length === 0 &&
      validationErrors.passengerNameError.length === 0 &&
      validationErrors.purposeError.length === 0 &&
      validationErrors.numberOfPassengersExceedError.length === 0 &&
      validationErrors.all.length === 0
    ) {
      setLoadingBarProgress(20);
      setIsModalOpen(true);
      // postRequestFromAPI(
      //   data,
      //   () => {
      //     setIsConfirmationOpen(true);
      //     setIsModalOpen(true); // Open the modal after the request is successful
      //   },
      //   setIsConfirmationOpen,
      //   setLoadingBarProgress
      // );
    }
  };

  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
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
        {isModalOpen && (
          <div className="modal-overlay">
            <Csm />
          </div>
        )}
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
                    <p>
                      {lastName}, {firstName} {middleName}
                    </p>
                  </div>

                  <div className="requester-office">
                    <strong>Office:</strong>
                    <p>{office}</p>
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
              </div>
              <div className="passengers-name-row">
                {generatePassengerInputs()}
              </div>
              <div className="third-row">
                <div className="vehicle-info-name">
                  <strong>Vehicle:</strong>
                  <p>
                    {plateNumber} {vehicleName}
                  </p>
                </div>
                <div className="destination-info">
                  <strong>Destination: </strong>
                  <p>{destination}</p>
                </div>

                <div className="kilometer-info">
                  <strong>Distance:</strong>
                  <p>{distance} km</p>
                </div>
              </div>
              <div className="forth-row">
                <div className="calendar-containerr">
                  <strong>Date of Travel:</strong>
                  <p>{travelDate}</p>
                </div>
                <div className="calendar-containerr">
                  <strong>to </strong>
                  <p>{returnDate}</p>
                </div>
              </div>
              <div className="forth-row">
                <div className="calendar-containerr">
                  <strong>Time of Travel: </strong>
                  <p>{formatTime(travelTime)}</p>
                </div>
                <div className="calendar-containerr">
                  <strong>to </strong>
                  <p>{formatTime(returnTime)}</p>
                </div>
              </div>
              <div className="fifth-row">
                <div className="calendar-containerr">
                  <strong>Travel Type:</strong>
                  <p>{category}</p>
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
