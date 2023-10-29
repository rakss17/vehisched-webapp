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

export default function RequestForm() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);

  const [formErrors, setFormErrors] = useState({
    office: "",
    number_of_passengers: "",
    passenger_name: "",
    destination: "",
    purpose: "",
  });
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
  const [data, setData] = useState<RequestFormProps>({
    requester_name: userID,
    office: "",
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
    const { value } = event.target;
    setNumPassengers(Number(value));

    if (Number(value) > capacity) {
      setExceedsCapacity(true);
    } else {
      setExceedsCapacity(false);
    }

    // Check if all passenger names are filled
    if (
      data.passenger_name.length === numPassengers &&
      data.passenger_name.every((name) => name.trim() !== "")
    ) {
      // Clear the passenger_name error when all names are entered
      setFormErrors((prevErrors) => ({ ...prevErrors, passenger_name: "" }));
    }
  };

  const clearDestinationError = () => {
    setFormErrors((prevErrors) => ({ ...prevErrors, destination: "" }));
  };

  const generatePassengerInputs = () => {
    const inputs = [];
    if (numPassengers <= capacity) {
      for (let i = 0; i < numPassengers; i++) {
        inputs.push(
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
            }}
          />
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
    // Check for validation errors before submitting
    if (validateForm()) {
      setLoadingBarProgress(20);
      postRequestFromAPI(
        data,
        setIsConfirmationOpen,
        navigate,
        setLoadingBarProgress
      );
    } else {
      // Handle validation errors, e.g., display an error message or scroll to the first error
    }
  };

  const validateForm = () => {
    let valid = true;

    // Validate 'office_or_dept'
    if (!data.office) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        office: "Please input office or dept",
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, office: "" }));
    }

    // Validate 'number_of_passengers'
    if (numPassengers <= 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        number_of_passengers: "Number of passengers must be greater than 0",
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        number_of_passengers: "",
      }));
    }

    // Validate 'passenger_name'
    for (let i = 0; i < numPassengers; i++) {
      if (!data.passenger_name[i]) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passenger_name: "Please input all passenger names",
        }));
        valid = false;
        break;
      }
    }
    // Validate 'destination'
    // if (!data.destination) {
    //   setFormErrors((prevErrors) => ({
    //     ...prevErrors,
    //     destination: "Please input destination",
    //   }));
    //   valid = false;
    // } else {
    //   setFormErrors((prevErrors) => ({ ...prevErrors, destination: "" }));
    // }

    // Validate 'purpose'
    if (!data.purpose) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        purpose: "Please input purpose",
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, purpose: "" }));
    }

    return valid;
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
        <div className="request-form-body">
          <div className="request-form-header">
            <img src={USTPLogo} alt="USTP Logo" />
            <h1>Vehicle Request Form</h1>
            <img src={DocumentCode} alt="Document Code" />
          </div>
          <div className="form-body">
            {/* Add a new section for form errors */}
            <div className="form-errors">
              {Object.values(formErrors).map((error, index) => {
                if (error) {
                  return (
                    <div key={index} className="error-message">
                      {error}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <div className="form-body-shadow">
              <div className="first-row">
                <div className="requester-info-name">
                  <strong>Requester's name:</strong>
                  <p>
                    {lastName}, {firstName} {middleName}
                  </p>
                </div>

                <InputField
                  icon={faBuilding}
                  value={data.office}
                  label="Office/dept"
                  placeholder="Office/dept"
                  onChange={(event) => {
                    setData({ ...data, office: event.target.value });
                    setFormErrors({ ...formErrors, office: "" });
                  }}
                />
                <div className="input-passenger-number">
                  <InputField
                    icon={faUsers}
                    onKeyDown={handleKeyDown}
                    label="No. of passengers"
                    value={numPassengers}
                    onChange={handlePassengerChange}
                    type="number"
                  />
                  {exceedsCapacity && (
                    <p>Exceeds seating capacity of the vehicle</p>
                  )}
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
                      setFormErrors({ ...formErrors, purpose: "" }); // Clear the error
                    }}
                  />
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
