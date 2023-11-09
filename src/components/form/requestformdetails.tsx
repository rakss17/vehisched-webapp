import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./requestformdetails.css";
import { RequestFormDetailsProps } from "../../interfaces/interfaces";
import Dropdown from "../dropdown/dropdown";
import { fetchDriversScheduleAPI } from "../api/api";
import CommonButton from "../button/commonbutton";

const RequestFormDetails: React.FC<RequestFormDetailsProps> = ({
  isOpen,
  onRequestClose,
  selectedRequest,
  onApprove,
}) => {
  if (!selectedRequest) return null;
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [driversData, setDriversData] = useState<any[]>([]);

  // useEffect(() => {
  //   fetchDriversScheduleAPI(
  //     setDriversData,
  //     selectedRequest.travel_date,
  //     selectedRequest.travel_time,
  //     selectedRequest.return_date,
  //     selectedRequest.return_time
  //   );
  // }, []);

  const dropdownDrivers = [
    "Select Driver",
    ...driversData.map(
      (driver) =>
        `${driver.first_name} ${driver.middle_name} ${driver.last_name}`
    ),
  ];

  const handleFetchDrivers = () => {
    fetchDriversScheduleAPI(
      setDriversData,
      selectedRequest.travel_date,
      selectedRequest.travel_time,
      selectedRequest.return_date,
      selectedRequest.return_time
    );
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
  };
  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
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
            </div>
          )}

          <div>
            {selectedRequest.status !== "Ongoing Vehicle Maintenance" &&
              selectedRequest.status !== "Driver Absence" &&
              selectedRequest.status !== "Pending" &&
              selectedRequest.purpose !== "Vehicle Maintenance" &&
              selectedRequest.purpose !== "Driver Absence" && (
                <CommonButton secondaryStyle text="Download trip ticket" />
              )}
            {selectedRequest.status === "Ongoing Vehicle Maintenance" && (
              <CommonButton width={7} height={7} primaryStyle text="Done" />
            )}
            {selectedRequest.status === "Driver Absence" && (
              <CommonButton width={7} height={7} primaryStyle text="Done" />
            )}
            {selectedRequest.status === "Pending" && (
              <>
                <CommonButton
                  width={7}
                  height={7}
                  tertiaryStyle
                  text="Decline"
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
    </>
  );
};
export default RequestFormDetails;
