import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./requestformdetails.css";
import { RequestFormDetailsProps } from "../../interfaces/interfaces";
import Dropdown from "../dropdown/dropdown";
import { fetchDriversScheduleAPI } from "../api/api";

const RequestFormDetails: React.FC<RequestFormDetailsProps> = ({
  isOpen,
  onRequestClose,
  selectedRequest,
  showButtons,
  onApprove,
}) => {
  if (!selectedRequest) return null;
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [driversData, setDriversData] = useState<any[]>([]);

  useEffect(() => {
    fetchDriversScheduleAPI(
      setDriversData,
      selectedRequest.travel_date,
      selectedRequest.travel_time,
      selectedRequest.return_date,
      selectedRequest.return_time
    );
  }, []);

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
      setSelectedDriverId(selectedDriver.id);
    }
  };

  return (
    <>
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
              <p>
                {selectedRequest.requester_last_name},{" "}
                {selectedRequest.requester_first_name}{" "}
                {selectedRequest.requester_middle_name}
              </p>
            </div>
            <div>
              <h2>Office/Dept: </h2> <p>CITC</p>
            </div>
          </div>
          <div>
            <h2>Passenger's name: </h2> <p>{selectedRequest.passenger_names}</p>
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
              <h2>Kilometers: </h2> <p></p>
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
              <p>{selectedRequest.travel_time}</p>
              <h2>to:</h2>
              <p>{selectedRequest.return_time}</p>
            </div>
          </div>
          {selectedRequest.status !== "Pending" && (
            <div>
              <h2>Driver: </h2>
              <p>{selectedRequest.driver_name}</p>
            </div>
          )}
          {selectedRequest.status === "Pending" && (
            <div>
              <h2>Assign a driver: </h2>
              <Dropdown
                status={dropdownDrivers}
                onCategoryChange={handleChooseDriver}
                dropdownClassName="dropdown-custom"
              />
            </div>
          )}

          <div>
            {showButtons && (
              <>
                <button>Attachments</button>
                <button onClick={() => onApprove(selectedDriverId)}>
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RequestFormDetails;
