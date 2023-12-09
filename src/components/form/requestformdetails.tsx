import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./requestformdetails.css";
import { RequestFormDetailsProps } from "../../interfaces/interfaces";
import Dropdown from "../dropdown/dropdown";
import {
  downloadTripTicketAPI,
  fetchDriversScheduleAPI,
  fetchRequestAPI,
  fetchRequestersAPI,
  postRequestFromAPI,
} from "../api/api";
import CommonButton from "../button/commonbutton";
import LoadingBar from "react-top-loading-bar";
import Confirmation from "../confirmation/confirmation";

const RequestFormDetails: React.FC<RequestFormDetailsProps> = ({
  isOpen,
  onRequestClose,
  selectedRequest,
  onApprove,
  onComplete,
  onReject,
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
  const [driversData, setDriversData] = useState<any[]>([]);
  const [requestersData, setRequestersData] = useState<any[]>([]);
  const [isMergeTripOpen, setIsMergeTripOpen] = useState(false);
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

  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const onCancelMergeTrip = () => {
    setIsMergeTripOpen(false);
    setIsOpen(true);
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
              <p>{selectedRequest.travel_date}</p>
              <h2>to:</h2>
              <p>{selectedRequest.return_date}</p>
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
            <div>
              <h2>Driver:</h2>
              <p>{selectedRequest.driver_full_name}</p>
            </div>
          )}
          {selectedRequest.status === "Pending" && (
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
          )}

          <div>
            {selectedRequest.status !== "Ongoing Vehicle Maintenance" &&
              selectedRequest.status !== "Driver Absence" &&
              selectedRequest.status !== "Pending" &&
              selectedRequest.status !== "Rejected" &&
              selectedRequest.purpose !== "Vehicle Maintenance" &&
              selectedRequest.purpose !== "Driver Absence" && (
                <>
                  <CommonButton
                    width={6}
                    height={6}
                    tertiaryStyle
                    text="Cancel"
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
                </>
              )}
            {selectedRequest.status === "Ongoing Vehicle Maintenance" && (
              <CommonButton
                width={7}
                height={7}
                primaryStyle
                text="Done"
                onClick={onComplete}
              />
            )}
            {selectedRequest.status === "Driver Absence" && (
              <CommonButton
                width={7}
                height={7}
                primaryStyle
                text="Done"
                onClick={onComplete}
              />
            )}
            {selectedRequest.status === "Pending" && (
              <>
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
              </>
            )}
          </div>
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
      <Confirmation isOpen={isConfirmationOpen} header="Trip Merged!" />
    </>
  );
};
export default RequestFormDetails;
