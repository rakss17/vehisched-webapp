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
  const location = useLocation();
  const plateNumber = location.state?.plateNumber || "";
  const vehicleName = location.state?.vehicleName || "";
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
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
    destination: "",
    vehicle: `${plateNumber}`,
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
    setLoadingBarProgress(20);
    postRequestFromAPI(
      data,
      setIsConfirmationOpen,
      navigate,
      setLoadingBarProgress
    );
  };
  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, travel_date: formattedDate });
  };
  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, return_date: formattedDate });
  };

  const handleStartTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, travel_time: time });
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
                  <p>Date of Travel: </p>
                  <CalendarInput
                    className="customize-calendar"
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="calendar-containerr">
                  <p>To </p>
                  <CalendarInput
                    className="customize-calendar"
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
              <div className="forth-row">
                <div className="calendar-containerr">
                  <p>Time of Travel: </p>
                  <TimeInput onChange={handleStartTimeChange} />
                </div>
                <div className="calendar-containerr">
                  <p>To </p>
                  <TimeInput onChange={handleEndTimeChange} />
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
