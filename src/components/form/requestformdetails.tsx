import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./requestformdetails.css";
import { RequestFormDetailsProps } from "../../interfaces/interfaces";
import Dropdown from "../dropdown/dropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const RequestFormDetails: React.FC<RequestFormDetailsProps> = ({
  isOpen,
  onRequestClose,
  selectedRequest,
  showButtons,
  onApprove,
}) => {
  if (!selectedRequest) return null;
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const driversInfo = useSelector((state: RootState) => state.driversData.data);

  const driverNames = driversInfo
    .filter((driver) => driver.status === "Available") // Filter drivers with status "Available"
    .map((driver) => {
      const { first_name, middle_name, last_name } = driver.user;
      return `${first_name} ${middle_name} ${last_name}`;
    });

  const dropdownDrivers = ["Select Driver", ...driverNames];

  const handleChooseDriver = (driverName: string) => {
    const selectedDriver = driversInfo.find((driver) => {
      const { first_name, middle_name, last_name } = driver.user;
      const fullName = `${first_name} ${middle_name} ${last_name}`;
      return fullName === driverName;
    });

    if (selectedDriver) {
      setSelectedDriverId(selectedDriver.user.id);
    }
  };

  return (
    <>
      <Modal className="modal-request-form" isOpen={isOpen}>
        <div className="request-form-container">
          <div>
            <p></p>
            <h1>Request Form</h1>
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
            </div>
            <div>
              <h2>Time:</h2>
              <p>{selectedRequest.travel_time}</p>
            </div>
          </div>
          <div>
            <h2>Assign a driver: </h2>{" "}
            <Dropdown
              status={dropdownDrivers}
              onCategoryChange={handleChooseDriver}
              dropdownClassName="dropdown-custom"
            />
          </div>

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
