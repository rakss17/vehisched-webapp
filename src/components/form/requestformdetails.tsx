import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./requestformdetails.css";
import { RequestFormDetailsProps } from "../../interfaces/interfaces";
import Dropdown from "../dropdown/dropdown";
import {
  cancelRequestAPI,
  downloadTripTicketAPI,
  fetchDriversScheduleAPI,
  fetchRequestAPI,
  fetchRequestersAPI,
  postRequestFromAPI,
  rejectRequestAPI,
} from "../api/api";
import CommonButton from "../button/commonbutton";
import LoadingBar from "react-top-loading-bar";
import Confirmation from "../confirmation/confirmation";
import { formatDate, formatTime } from "../functions/getTimeElapsed";

const RequestFormDetails: React.FC<RequestFormDetailsProps> = ({
  isOpen,
  onRequestClose,
  selectedRequest,
  onApprove,
  onComplete,
  errorMessages,
  setErrorMessages,
  setIsOpen,
}) => {
  if (!selectedRequest) return null;
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [selectedRequesterId, setSelectedRequesterId] = useState<string | null>(
    null
  );
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationCancelOpen, setIsConfirmationCancelOpen] =
    useState(false);
  const [isConfirmationRejectOpen, setIsConfirmationRejectOpen] =
    useState(false);
  const [driversData, setDriversData] = useState<any[]>([]);
  const [requestersData, setRequestersData] = useState<any[]>([]);
  const [isMergeTripOpen, setIsMergeTripOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [mergeTripData, setMergeTripData] = useState({
    requester_name: "",
    travel_date: selectedRequest.travel_date,
    travel_time: selectedRequest.travel_time,
    return_date: selectedRequest.return_date,
    return_time: selectedRequest.return_time,
    destination: selectedRequest.destination,
    number_of_passenger: selectedRequest.number_of_passenger,
    vehicle: selectedRequest.vehicle,
    type: selectedRequest.type,
    distance: selectedRequest.distance,
    merge_trip: true,
    role: null,
  });
  const [reasonForCancellation, setReasonForCancellation] = useState("");
  const [reasonForRejection, setReasonForRejection] = useState("");
  const isFromOfficeStaff = true;

  const dropdownDrivers = [
    "Select Driver",
    ...driversData.map(
      (driver) =>
        `${driver.first_name} ${driver.middle_name} ${driver.last_name}`
    ),
  ];

  const dropdownRequesters = [
    "Select Requester",
    ...requestersData.map(
      (requester) =>
        `${requester.first_name} ${requester.middle_name} ${requester.last_name}`
    ),
  ];

  const handleDownloadTripTicket = () => {
    downloadTripTicketAPI(selectedRequest.request_id);
  };

  const handleFetchDrivers = () => {
    fetchDriversScheduleAPI(
      setDriversData,
      selectedRequest.travel_date,
      selectedRequest.travel_time,
      selectedRequest.return_date,
      selectedRequest.return_time
    );
  };

  const handleFetchRequester = () => {
    fetchRequestersAPI(setRequestersData);
  };

  const handleChooseDriver = (driverName: string) => {
    const selectedDriver = driversData.find((driver) => {
      const { first_name, middle_name, last_name } = driver;
      const fullName = `${first_name} ${middle_name} ${last_name}`;
      return fullName === driverName;
    });

    if (selectedDriver) {
      setSelectedDriverId(selectedDriver.id);
    }
    if (driverName === "Select Driver") {
      setSelectedDriverId(null);
    }
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.driverSelectionError;
    setErrorMessages(updatedErrors);
  };

  const handleChooseRequester = (requesterName: string) => {
    const selectedRequester = requestersData.find((requester) => {
      const { first_name, middle_name, last_name } = requester;
      const fullName = `${first_name} ${middle_name} ${last_name}`;
      return fullName === requesterName;
    });

    if (selectedRequester) {
      setSelectedRequesterId(selectedRequester.id);
    }
    if (requesterName === "Select requester") {
      setSelectedRequesterId(null);
    }
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.requesterSelectionError;
    setErrorMessages(updatedErrors);

    setMergeTripData({
      ...mergeTripData,
      requester_name: selectedRequester.id,
    });
  };

  const onCancelMergeTrip = () => {
    setIsMergeTripOpen(false);
    setIsCancelOpen(false);
    setIsOpen(true);
    setIsRejectOpen(false);
  };

  const onMergeTripOpen = () => {
    onRequestClose();
    setIsMergeTripOpen(true);
  };

  const handleMergeTrip = () => {
    setLoadingBarProgress(20);
    postRequestFromAPI(
      mergeTripData,
      // () => {
      //   setIsConfirmationOpen(true);
      //   setIsModalOpen(true); // Open the modal after the request is successful
      // },
      setIsConfirmationOpen,
      () => {},
      setLoadingBarProgress
    );
  };
  const onCancelTrip = () => {
    setIsCancelOpen(true);
    setIsOpen(false);
  };
  const handleCancelTrip = () => {
    cancelRequestAPI(
      selectedRequest.request_id,
      setIsConfirmationCancelOpen,
      setLoadingBarProgress,
      isFromOfficeStaff,
      reasonForCancellation,
      setIsCancelOpen
    );
  };

  const onReject = () => {
    setIsRejectOpen(true);
    setIsOpen(false);
  };

  const handleReject = () => {
    rejectRequestAPI(
      selectedRequest.request_id,
      setIsConfirmationRejectOpen,
      reasonForRejection,
      setLoadingBarProgress
    );
  };

  const dateParts = selectedRequest.date_reserved.split("T");
  const date_reserved = dateParts[0];
  const timeParts = dateParts[1].split(".");
  const time_reserved = timeParts[0];
  let departure_date_from_office = null;
  let departure_time_from_office = null;

  if (selectedRequest.departure_time_from_office) {
    const departureDateParts = selectedRequest.departure_time_from_office.split("T");
    departure_date_from_office = departureDateParts[0];

    if (departureDateParts[1]) {
      const departureTimeParts = departureDateParts[1].split(".");
      departure_time_from_office = departureTimeParts[0];
    }
  }
  let arrival_date_to_office = null;
  let arrival_time_to_office = null;

  if (selectedRequest.arrival_time_to_office) {
    const arrivalDateParts = selectedRequest.arrival_time_to_office.split("T");
    arrival_date_to_office = arrivalDateParts[0];

    if (arrivalDateParts[1]) {
      const arrivalTimeParts = arrivalDateParts[1].split(".");
      arrival_time_to_office = arrivalTimeParts[0];
    }
  }


  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <Modal className="modal-request-form" isOpen={isOpen}>
        <div className="request-form-container">
          <div>
            <p></p>
            <h1>Request Form No. {selectedRequest.request_id}</h1>
            <p onClick={onRequestClose}>
              <FontAwesomeIcon icon={faXmark} />
            </p>
          </div>

          <div>
            <div>
              <h2>Date reserved:</h2>
              <p>
                {formatDate(date_reserved)}, {formatTime(time_reserved)}
              </p>
            </div>
          </div>

          <div>
            <div>
              <h2>Request's name:</h2>
              <p>{selectedRequest.requester_full_name}</p>
            </div>
            <div>
              <h2>Office/Dept: </h2> <p>{selectedRequest.office}</p>
            </div>
          </div>
          <div>
            <h2>Passenger's name: </h2> <p>{selectedRequest.passenger_name}</p>
          </div>
          <div>
            <div>
              <h2>Vehicle:</h2>
              <p>{selectedRequest.vehicle}</p>
            </div>
            <div>
              <h2>No. of Passengers: </h2>{" "}
              <p>{selectedRequest.number_of_passenger}</p>
            </div>
          </div>
          <div>
            <div>
              <h2>Destination:</h2>
              <p>{selectedRequest.destination}</p>
            </div>
            <div>
              <h2>Distance: </h2> <p>{selectedRequest.distance} km</p>
            </div>
          </div>
          <div>
            <div>
              <h2>Date of travel:</h2>
              <p>{formatDate(selectedRequest.travel_date)}</p>
              <h2>to:</h2>
              <p>{formatDate(selectedRequest.return_date)}</p>
            </div>
            <div>
              <h2>Time:</h2>
              <p>{formatTime(selectedRequest.travel_time)}</p>
              <h2>to:</h2>
              <p>{formatTime(selectedRequest.return_time)}</p>
            </div>
          </div>
          <div>
            <div>
              <h2>Purpose: </h2>
              <p>{selectedRequest.purpose}</p>
            </div>
            <div>
              <h2>Travel type: </h2>
              <p>{selectedRequest.type}</p>
            </div>
          </div>
          {selectedRequest.status !== "Pending" && (
            <>
            <div>
              <h2>Driver:</h2>
              <p>{selectedRequest.driver_full_name}</p>
            </div>
            <div>
            <div>
              <h2>Departure: </h2>
              <p>
  {departure_date_from_office && departure_time_from_office 
    ? `${formatDate(departure_date_from_office)}, ${formatTime(departure_time_from_office)}` 
    : "N/A"}
</p>

            </div>
            <div>
              <h2>Arrival: </h2>
              <p>
  {arrival_date_to_office && arrival_time_to_office 
    ? `${formatDate(arrival_date_to_office)}, ${formatTime(arrival_time_to_office)}` 
    : "N/A"}
</p>
            </div>
          </div>
            </>
          )}
          
          {selectedRequest.status === "Pending" && (
            <>
            <div>
              <h2>Assign a driver: </h2>
              <div onClick={handleFetchDrivers}>
                <Dropdown
                  status={dropdownDrivers}
                  onCategoryChange={handleChooseDriver}
                  dropdownClassName="dropdown-custom"
                  menuClassName="menu-custom"
                />
              </div>
              <p className="set-trip-text-error">
                {errorMessages[0]?.driverSelectionError}
              </p>
            </div>
            <div></div>
            <div>
                <CommonButton
                  width={7}
                  height={7}
                  tertiaryStyle
                  text="Reject"
                  onClick={onReject}
                />
                <CommonButton
                  width={7}
                  height={7}
                  primaryStyle
                  text="Approve"
                  onClick={() => onApprove(selectedDriverId)}
                />
              </div>
            </>
          )}

          
            {selectedRequest.status !== "Ongoing Vehicle Maintenance" &&
              selectedRequest.status !== "Driver Absence" &&
              selectedRequest.status !== "Pending" &&
              selectedRequest.status !== "Rejected" &&
              selectedRequest.purpose !== "Vehicle Maintenance" &&
              selectedRequest.purpose !== "Driver Absence" &&
              selectedRequest.status !== "Canceled" &&
              selectedRequest.status !== "Completed" && (
                <div>
                  <CommonButton
                    width={8}
                    height={6}
                    tertiaryStyle
                    text="Cancel Trip"
                    onClick={onCancelTrip}
                  />
                  <CommonButton
                    width={8}
                    height={6}
                    secondaryStyle
                    text="Merge trip"
                    onClick={onMergeTripOpen}
                  />
                  <CommonButton
                    width={12}
                    height={6}
                    primaryStyle
                    text="Download trip ticket"
                    onClick={handleDownloadTripTicket}
                  />
                </div>
              )}
            {selectedRequest.status === "Completed" && (<div><CommonButton
                    width={12}
                    height={6}
                    primaryStyle
                    text="Download trip ticket"
                    onClick={handleDownloadTripTicket}
                  /></div> )}
            {selectedRequest.status === "Ongoing Vehicle Maintenance" && (
              <div>
              <CommonButton
              width={7}
              height={7}
              primaryStyle
              text="Done"
              onClick={onComplete}
            />
            </div>
            )}
            {selectedRequest.status === "Driver Absence" && (
              <div>
                <CommonButton
                width={7}
                height={7}
                primaryStyle
                text="Done"
                onClick={onComplete}
              />
              </div>
              
            )}
           
          
        </div>
      </Modal>
      <Modal className="merge-trip-modal" isOpen={isMergeTripOpen}>
        <div className="merge-trip-modal-container">
          <h1>Choose requester to merge with</h1>
          <div onClick={handleFetchRequester}>
            <Dropdown
              status={dropdownRequesters}
              onCategoryChange={handleChooseRequester}
              dropdownClassName="dropdown-custom"
              menuClassName="menu-custom"
            />
          </div>
          <div className="merge-trip-modal-button-container">
            <CommonButton
              width={7}
              height={6}
              secondaryStyle
              text="Cancel"
              onClick={onCancelMergeTrip}
            />
            <CommonButton
              width={7}
              height={6}
              primaryStyle
              text="Proceed"
              onClick={handleMergeTrip}
            />
          </div>
        </div>
      </Modal>
      <Modal className="reason-modal" isOpen={isCancelOpen}>
        <div className="reason-modal-container">
          <h1>Please provide the reason for the cancellation</h1>
          <div>
            <input
              value={reasonForCancellation}
              onChange={(event) => {
                setReasonForCancellation(event.target.value);
              }}
              placeholder="type here..."
            />
          </div>
          <div className="reason-modal-button-container">
            <CommonButton
              width={7}
              height={6}
              secondaryStyle
              text="Cancel"
              onClick={onCancelMergeTrip}
            />
            <CommonButton
              width={7}
              height={6}
              primaryStyle
              text="Proceed"
              onClick={handleCancelTrip}
            />
          </div>
        </div>
      </Modal>
      <Modal className="reason-modal" isOpen={isRejectOpen}>
        <div className="reason-modal-container">
          <h1>Please provide the reason for the rejection</h1>
          <div>
            <input
              value={reasonForRejection}
              onChange={(event) => {
                setReasonForRejection(event.target.value);
              }}
              placeholder="type here..."
            />
          </div>
          <div className="reason-modal-button-container">
            <CommonButton
              width={7}
              height={6}
              secondaryStyle
              text="Cancel"
              onClick={onCancelMergeTrip}
            />
            <CommonButton
              width={7}
              height={6}
              primaryStyle
              text="Proceed"
              onClick={handleReject}
            />
          </div>
        </div>
      </Modal>
      <Confirmation isOpen={isConfirmationOpen} header="Trip Merged!" />
      <Confirmation
        isOpen={isConfirmationCancelOpen}
        header="Trip Canceled Successfully!"
      />
      <Confirmation
        isOpen={isConfirmationRejectOpen}
        header="Trip Rejected Successfully!"
      />
    </>
  );
};
export default RequestFormDetails;
