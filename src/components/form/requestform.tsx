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
    office_or_dept: "",
    number_of_passengers: "",
    passenger_names: "",
    destination: "",
    purpose: "",
  });

  const location = useLocation();
  const plateNumber = location.state?.plateNumber || "";
  const vehicleName = location.state?.vehicleName || "";
  const travelDate = location.state?.data.travel_date || "";
  const travelTime = location.state?.data.travel_time || "";
  const returnDate = location.state?.data.return_date || "";
  const returnTime = location.state?.data.return_time || "";
  const category = location.state?.data.category || "";
  const subCategory = location.state?.data.sub_category || "";
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const firstName = personalInfo?.first_name;
  const lastName = personalInfo?.last_name;
  const middleName = personalInfo?.middle_name;
  const userID = personalInfo?.id;
  const [data, setData] = useState<RequestFormProps>({
    requester_name: userID,
    office_or_dept: "",
    purpose: "",
    number_of_passenger: null,
    passenger_names: [],
    travel_date: travelDate,
    travel_time: travelTime,
    return_date: returnDate,
    return_time: returnTime,
    destination: "",
    vehicle: `${plateNumber}`,
    category: category,
    sub_category: subCategory,
  });
  const [numPassengers, setNumPassengers] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let updatedPassengerNames = [...data.passenger_names];
    if (numPassengers > data.passenger_names.length) {
      const additionalPassengers = new Array(
        numPassengers - data.passenger_names.length
      ).fill("");
      updatedPassengerNames =
        updatedPassengerNames.concat(additionalPassengers);
    } else if (numPassengers < data.passenger_names.length) {
      updatedPassengerNames = updatedPassengerNames.slice(0, numPassengers);
    }
    setData({
      ...data,
      passenger_names: updatedPassengerNames,
      number_of_passenger: numPassengers,
    });
  }, [numPassengers]);

  const handlePassengerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNumPassengers(Number(value));

    // Check if all passenger names are filled
    if (
      data.passenger_names.length === numPassengers &&
      data.passenger_names.every((name) => name.trim() !== "")
    ) {
      // Clear the passenger_names error when all names are entered
      setFormErrors((prevErrors) => ({ ...prevErrors, passenger_names: "" }));
    }
  };

  const clearDestinationError = () => {
    setFormErrors((prevErrors) => ({ ...prevErrors, destination: "" }));
  };

  const generatePassengerInputs = () => {
    const inputs = [];
    for (let i = 0; i < numPassengers; i++) {
      inputs.push(
        <InputField
          className="passenger_name_width"
          value={data.passenger_names[i]}
          key={i}
          icon={faUser}
          label={`Passenger ${i + 1}`}
          placeholder={`Passenger ${i + 1}`}
          onChange={(event) => {
            const newPassengerNames = [...data.passenger_names];
            newPassengerNames[i] = event.target.value;
            setData({ ...data, passenger_names: newPassengerNames });
          }}
        />
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
  const handleDownload = () => {
    const fileUrl = "your_file_url_here";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "template.pdf";
    link.click();
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
    if (!data.office_or_dept) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        office_or_dept: "Please input office or dept",
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, office_or_dept: "" }));
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

    // Validate 'passenger_names'
    for (let i = 0; i < numPassengers; i++) {
      if (!data.passenger_names[i]) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passenger_names: "Please input all passenger names",
        }));
        valid = false;
        break;
      }
    }
    // Validate 'destination'
    //  if (!data.destination) {
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
                <div className="vehicle-info-name">
                  <p>
                    <FontAwesomeIcon icon={faUser} />
                    Requester's name:
                  </p>
                  <p>
                    {lastName}, {firstName} {middleName}
                  </p>
                </div>

                <InputField
                  icon={faBuilding}
                  value={data.office_or_dept}
                  label="Office/dept"
                  placeholder="Office/dept"
                  onChange={(event) => {
                    setData({ ...data, office_or_dept: event.target.value });
                    setFormErrors({ ...formErrors, office_or_dept: "" }); // Clear the error
                  }}
                />

                <InputField
                  icon={faUsers}
                  onKeyDown={handleKeyDown}
                  label="No. of passengers"
                  value={numPassengers}
                  onChange={handlePassengerChange}
                  type="number"
                />
              </div>
              <div className="passengers-name-row">
                {generatePassengerInputs()}
              </div>
              <div className="third-row">
                <div className="vehicle-info-name">
                  <p>
                    <FontAwesomeIcon icon={faCar} />
                    Vehicle:
                  </p>
                  <p>
                    {plateNumber} {vehicleName}
                  </p>
                </div>
                {/* FURTHER DEBUGGING LATER */}
                <AddressInput />

                <div className="kilometer-info">
                  <p>Kilometer{"(s)"}:</p>
                  <p>10</p>
                </div>
              </div>
              <div className="forth-row">
                <div className="calendar-containerr">
                  <p>Date of Travel:</p>
                  <p>{travelDate}</p>
                </div>
                <div className="calendar-containerr">
                  <p>To </p>
                  <p>{returnDate}</p>
                </div>
              </div>
              <div className="forth-row">
                <div className="calendar-containerr">
                  <p>Time of Travel: </p>
                  <p>{formatTime(travelTime)}</p>
                </div>
                <div className="calendar-containerr">
                  <p>To </p>
                  <p>{formatTime(returnTime)}</p>
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
                <p>
                  Requesters traveling to destinations exceed 50 kilometers are
                  required to provide a travel order for the vehicle's fuel and
                  <br></br>
                  the driver's per diem.
                </p>
                <div className="button-row-container">
                  <button onClick={handleDownload}>
                    Download Template
                    <FontAwesomeIcon className="iconn" icon={faDownload} />
                  </button>
                  <label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      accept="application/pdf"
                    />
                    <button onClick={openFileInput}>
                      {selectedFileName
                        ? selectedFileName
                        : "Upload Travel Order"}
                      <FontAwesomeIcon className="iconn" icon={faUpload} />
                    </button>
                  </label>
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
