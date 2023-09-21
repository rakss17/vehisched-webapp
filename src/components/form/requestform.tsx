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

export default function RequestForm() {
  const location = useLocation();
  const plateNumber = location.state?.plateNumber || "";
  const vehicleName = location.state?.vehicleName || "";
  const [data, setData] = useState<{
    requester_name: string;
    office_dept: string;
    purpose: string;
    passenger_names: string[];
  }>({
    requester_name: "",
    office_dept: "",
    purpose: "",
    passenger_names: [],
  });
  const [urgentRequest, setUrgentRequest] = useState(false);
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
    setData({ ...data, passenger_names: updatedPassengerNames });
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
    setIsConfirmationOpen(true);
    setTimeout(() => {
      setIsConfirmationOpen(false);
      navigate("/DashboardR");
    }, 3000);
  };
  return (
    <>
      <Header />
      <Container>
        <div className="request-form-body">
          <h1>Vehicle Request Form</h1>
          <div className="form-body">
            <div className="form-body-shadow">
              <div className="first-row">
                <InputField
                  value={data.requester_name}
                  icon={faUser}
                  label="Requester's name"
                  placeholder="Requester's name"
                  onChange={(event) => {
                    setData({ ...data, requester_name: event.target.value });
                  }}
                />
                <InputField
                  icon={faBuilding}
                  value={data.office_dept}
                  label="Office/dept"
                  placeholder="Office/dept"
                  onChange={(event) => {
                    setData({ ...data, office_dept: event.target.value });
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
                <AddressInput />
                <div className="kilometer-info">
                  <p>Kilometer{"(s)"}:</p>
                  <p>10</p>
                </div>
              </div>
              <div className="forth-row">
                <div className="calendar-containerr">
                  <p>Date of Travel: </p>
                  <CalendarInput className="customize-calendar" />
                </div>
                <div className="calendar-containerr">
                  <p>Time of Travel: </p>
                  <TimeInput />
                </div>
              </div>
              <div className="fifth-row">
                <p>Urgent Request?: </p>
                <div>
                  <label>Yes</label>
                  <input
                    type="checkbox"
                    checked={urgentRequest}
                    onChange={(event) => setUrgentRequest(event.target.checked)}
                  />
                </div>
                <div>
                  <label>No</label>
                  <input
                    type="checkbox"
                    checked={!urgentRequest}
                    onChange={(event) =>
                      setUrgentRequest(!event.target.checked)
                    }
                  />
                </div>
              </div>
              {urgentRequest && (
                <div className="sixth-row">
                  <p>
                    Please provide a brief statement explaining the urgency or
                    importance of your purpose for requesting the reservation.
                  </p>
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
              )}
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
