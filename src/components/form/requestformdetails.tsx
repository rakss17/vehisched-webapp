import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./requestformdetails.css";
import {
  RequestFormDetailsProps,
  RequestFormProps,
} from "../../interfaces/interfaces";
import Dropdown from "../dropdown/dropdown";
import {
  approveRequestAPI,
  cancelRequestAPI,
  changeRequestDriverAPI,
  downloadTripTicketAPI,
  fetchDriversScheduleAPI,
  fetchRequestersAPI,
  postRequestFromAPI,
  rejectRequestAPI,
} from "../api/api";
import CommonButton from "../button/commonbutton";
import LoadingBar from "react-top-loading-bar";
import Confirmation from "../confirmation/confirmation";
import { formatDate, formatTime } from "../functions/getTimeElapsed";
import AutoCompleteAddressGoogle from "../addressinput/googleaddressinput";
import InputField from "../inputfield/inputfield";
import Reschedule from "../reschedule/reschedule";

const RequestFormDetails: React.FC<RequestFormDetailsProps> = ({
  isOpen,
  onRequestClose,
  selectedRequest,
  onComplete,
  setIsOpen,
  fetchRequestOfficeStaffAPI,
  setRequestList,
}) => {
  if (!selectedRequest) return null;
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationApprovedOpen, setIsConfirmationApprovedOpen] =
    useState(false);
  const [isConfirmationCancelOpen, setIsConfirmationCancelOpen] =
    useState(false);
  const [isConfirmationRejectOpen, setIsConfirmationRejectOpen] =
    useState(false);
  const [driversData, setDriversData] = useState<any[]>([]);
  const [requestersData, setRequestersData] = useState<any[]>([]);
  const [isMergeTripOpen, setIsMergeTripOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isChangeDriverOpen, setIsChangeDriverOpen] = useState(false);

  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [mergeTripData, setMergeTripData] = useState<RequestFormProps>({
    requester_name: "",
    travel_date: selectedRequest.travel_date,
    travel_time: selectedRequest.travel_time,
    return_date: "",
    return_time: "",
    destination: "",
    number_of_passenger: "",
    vehicle: selectedRequest.vehicle,
    type: "",
    distance: null,
    merge_trip: true,
    role: null,
    driver_name: selectedRequest.driver_id,
    passenger_name: [],
    vehicle_capacity: "",
    merged_with: "",
    purpose: "",
  });
  const [addressData, setAddressData] = useState<any>({
    destination: "",
    distance: null,
  });
  const [reasonForCancellation, setReasonForCancellation] = useState("");
  const [reasonForRejection, setReasonForRejection] = useState("");
  const isFromOfficeStaff = true;

  useEffect(() => {
    setMergeTripData((prevData: any) => ({
      ...prevData,
      destination: addressData.destination,
      distance: addressData.distance,
      merged_with: selectedRequest.request_id,
    }));
  }, [addressData, mergeTripData]);

  useEffect(() => {
    if (mergeTripData.type === "Round Trip") {
      setMergeTripData((prevData: any) => ({
        ...prevData,
        return_date: selectedRequest.return_date,
        return_time: selectedRequest.return_time,
      }));
    }
  }, [mergeTripData.type]);

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

  const handleConfirmationApprove = (selectedDriverId: any) => {
    let validationErrors: { [key: string]: string } = {};

    if (!selectedDriverId) {
      validationErrors.driverSelectionError = "Please select a driver!";
    }
    if (selectedDriverId === null) {
      validationErrors.driverSelectionError = "Please select a driver!";
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);
    if (Object.keys(validationErrors).length === 0) {
      approveRequestAPI(
        selectedRequest.request_id,
        selectedDriverId,
        onRequestClose,
        setIsConfirmationApprovedOpen
      );
    }
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
    fetchRequestersAPI(setRequestersData, selectedRequest.requester_id);
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
      const updatedErrors = [...errorMessages];
      delete updatedErrors[0]?.requesterNameError;
      setErrorMessages(updatedErrors);
      setMergeTripData({
        ...mergeTripData,
        requester_name: selectedRequester.id,
      });
    }
    if (requesterName === "Select Requester") {
      setMergeTripData({
        ...mergeTripData,
        requester_name: "",
      });
    }
  };

  // useEffect(() => {
  //   if (selectedRequest.number_of_passenger) {
  //     const numberOfVacants =
  //       selectedRequest.vehicle_capacity - selectedRequest.number_of_passenger;
  //     setNumberOfVacant(numberOfVacants);
  //   }
  // }, [selectedRequest.number_of_passenger]);
  const generatePassengerInputs = () => {
    const inputs = [];

    for (let i = 0; i < selectedRequest.vehicle_capacity; i++) {
      inputs.push(
        <div key={i} className="passenger-name-column">
          <InputField
            className="passenger_name_width"
            value={mergeTripData.passenger_name[i]}
            key={i}
            icon={faUser}
            label={`Passenger ${i + 1}`}
            placeholder={`Passenger ${i + 1}`}
            onChange={(event) => {
              const newPassengerNames = [...mergeTripData.passenger_name];
              newPassengerNames[i] = event.target.value;
              const countNumberOfPassenger = newPassengerNames.filter(
                (name) => name !== ""
              ).length;
              setMergeTripData((prevData: any) => ({
                ...prevData,
                passenger_name: newPassengerNames,
                number_of_passenger: countNumberOfPassenger,
                vehicle_capacity: selectedRequest.number_of_passenger,
              }));

              if (newPassengerNames[i]) {
                const updatedErrors = { ...errorMessages };
                delete updatedErrors[0]?.passengerNameError[i];
                delete updatedErrors[0]?.all;
                setErrorMessages(updatedErrors);
              }
            }}
          />
          <p className="set-trip-text-error">
            {/* {errorMessages[0]?.passengerNameError[i]} */}
          </p>
        </div>
      );
    }

    return inputs;
  };

  const onCancelMergeTrip = () => {
    setIsMergeTripOpen(false);
    setIsCancelOpen(false);
    setIsOpen(true);
    setIsRejectOpen(false);
    setIsChangeDriverOpen(false);
  };

  const onMergeTripOpen = () => {
    onRequestClose();
    setIsMergeTripOpen(true);
  };

  const handleMergeTrip = () => {
    let validationErrors: { [key: string]: string } = {};

    if (!mergeTripData.requester_name) {
      validationErrors.requesterNameError = "Please select requester.";
    }
    if (!mergeTripData.type) {
      validationErrors.travelTypeError = "Please select travel type.";
    }

    if (!mergeTripData.destination) {
      validationErrors.destinationError = "Please input destination.";
    }
    if (!mergeTripData.purpose) {
      validationErrors.purposeError = "Please input purpose.";
    }
    const errorArray = [validationErrors];

    setErrorMessages(errorArray);
    console.log(mergeTripData);
    if (Object.keys(validationErrors).length === 0) {
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
    }
  };

  const onCancelTrip = () => {
    setIsCancelOpen(true);
    setIsOpen(false);
  };

  const removeDestinationError = () => {
    const updatedErrors = [...errorMessages];
    delete updatedErrors[0]?.destinationError;
    setErrorMessages(updatedErrors);
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

  const onChangeDriver = () => {
    setIsChangeDriverOpen(true);
    setIsOpen(false);
  };

  const handleChangeDriver = () => {
    changeRequestDriverAPI(
      selectedRequest.request_id,
      // setIsConfirmationRejectOpen,
      selectedDriverId,
      setLoadingBarProgress,
      fetchRequestOfficeStaffAPI,
      setRequestList,
      setIsChangeDriverOpen,
      setIsOpen
    );
  };
  const dateParts = selectedRequest.date_reserved.split("T");
  const date_reserved = dateParts[0];
  const timeParts = dateParts[1].split(".");
  const time_reserved = timeParts[0];
  let departure_date_from_office = null;
  let departure_time_from_office = null;

  if (selectedRequest.departure_time_from_office) {
    const departureDateParts =
      selectedRequest.departure_time_from_office.split("T");
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

  const [showModal, setShowModal] = useState(false);

  const onChangeTime = () => {
    setShowModal(!showModal);
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
            <p className="close-icon" onClick={onRequestClose}>
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
              <h2>Travel date & time:</h2>
              <p>
                {formatDate(selectedRequest.travel_date)},{" "}
                {formatTime(selectedRequest.travel_time)}
              </p>
              <h2>to:</h2>
              <p>
                {formatDate(selectedRequest.return_date)},{" "}
                {formatTime(selectedRequest.return_time)}
              </p>
              <CommonButton
              width={10}
              height={7}
              underlinedStyle
              text="Reschedule"
              onClick={onChangeTime}
            />
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
          {selectedRequest.status !== "Pending" &&
            selectedRequest.status !== "Canceled" &&
            selectedRequest.status !== "Rejected" &&
            selectedRequest.status !== "Ongoing Vehicle Maintenance" &&
            selectedRequest.distance < 50 && (
              <>
                {selectedRequest.driver_full_name === null ? (
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
                ) : (
                  <div>
                    <h2>Driver:</h2>
                    <p>{selectedRequest.driver_full_name}</p>
                    <>
                      {selectedRequest.purpose === "Driver Absence" ? null : (
                        <CommonButton
                          width={10}
                          height={7}
                          underlinedStyle
                          text="Change driver"
                          onClick={onChangeDriver}
                        />
                      )}
                    </>
                  </div>
                )}

                <div className="departure-arrival-container">
                  <div>
                    <h2>Departure: </h2>
                    <p>
                      {departure_date_from_office && departure_time_from_office
                        ? `${formatDate(
                            departure_date_from_office
                          )}, ${formatTime(departure_time_from_office)}`
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h2>Arrival: </h2>
                    <p>
                      {arrival_date_to_office && arrival_time_to_office
                        ? `${formatDate(arrival_date_to_office)}, ${formatTime(
                            arrival_time_to_office
                          )}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </>
            )}

          {selectedRequest.status === "Pending" &&
            selectedRequest.distance >= 50 && (
              <>
                {selectedRequest.driver_full_name === null ? (
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
                    <div className="travel-order-note">
                      <h2>Note:</h2>
                      <h3>A travel order is required for this trip</h3>
                    </div>
                    <div className="button-details-container">
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
                        onClick={() =>
                          handleConfirmationApprove(selectedDriverId)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2>Driver:</h2>
                      <p>{selectedRequest.driver_full_name}</p>
                      <>
                        {selectedRequest.purpose === "Driver Absence" ? null : (
                          <CommonButton
                            width={10}
                            height={7}
                            underlinedStyle
                            text="Change driver"
                            onClick={onChangeDriver}
                          />
                        )}
                      </>
                    </div>
                    <div className="travel-order-note">
                      <h2>Note:</h2>
                      <h3>A travel order is required for this trip</h3>
                    </div>
                    <div className="button-details-container">
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
                        onClick={() =>
                          handleConfirmationApprove(selectedRequest.driver_id)
                        }
                      />
                    </div>
                  </>
                )}
              </>
            )}
          {selectedRequest.status !== "Pending" &&
            selectedRequest.status !== "Rejected" &&
            selectedRequest.status !== "Canceled" &&
            selectedRequest.status !== "Ongoing Vehicle Maintenance" &&
            selectedRequest.distance >= 50 && (
              <>
                {selectedRequest.driver_full_name === null ? (
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
                ) : (
                  <div>
                    <h2>Driver:</h2>
                    <p>{selectedRequest.driver_full_name}</p>
                    <>
                      {selectedRequest.purpose === "Driver Absence" ? null : (
                        <CommonButton
                          width={10}
                          height={7}
                          underlinedStyle
                          text="Change driver"
                          onClick={onChangeDriver}
                        />
                      )}
                    </>
                  </div>
                )}

                <div className="departure-arrival-container">
                  <div>
                    <h2>Departure: </h2>
                    <p>
                      {departure_date_from_office && departure_time_from_office
                        ? `${formatDate(
                            departure_date_from_office
                          )}, ${formatTime(departure_time_from_office)}`
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h2>Arrival: </h2>
                    <p>
                      {arrival_date_to_office && arrival_time_to_office
                        ? `${formatDate(arrival_date_to_office)}, ${formatTime(
                            arrival_time_to_office
                          )}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="travel-order-note">
                  <h2>Note:</h2>
                  <h3>A travel order is required for this trip</h3>
                </div>
              </>
            )}
          {selectedRequest.status === "Pending" &&
            selectedRequest.distance < 50 && (
              <>
                {selectedRequest.driver_full_name === null ? (
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
                    <div className="button-details-container">
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
                        onClick={() =>
                          handleConfirmationApprove(selectedDriverId)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2>Driver:</h2>
                      <p>{selectedRequest.driver_full_name}</p>
                      <>
                        {selectedRequest.purpose === "Driver Absence" ? null : (
                          <CommonButton
                            width={10}
                            height={7}
                            underlinedStyle
                            text="Change driver"
                            onClick={onChangeDriver}
                          />
                        )}
                      </>
                    </div>
                    <div className="button-details-container">
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
                        onClick={() =>
                          handleConfirmationApprove(selectedRequest.driver_id)
                        }
                      />
                    </div>
                  </>
                )}
              </>
            )}

          {selectedRequest.status !== "Ongoing Vehicle Maintenance" &&
            selectedRequest.status !== "Driver Absence" &&
            selectedRequest.status !== "Pending" &&
            selectedRequest.status !== "Rejected" &&
            selectedRequest.purpose !== "Vehicle Maintenance" &&
            selectedRequest.purpose !== "Driver Absence" &&
            selectedRequest.status !== "Canceled" &&
            selectedRequest.status !== "Completed" &&
            selectedRequest.vehicle_driver_status !== "On Trip" && (
              <div className="button-details-container">
                <CommonButton
                  width={8}
                  height={6}
                  tertiaryStyle
                  text="Cancel Trip"
                  onClick={onCancelTrip}
                />
                {!selectedRequest.main_merge && (
                  <CommonButton
                    width={8}
                    height={6}
                    secondaryStyle
                    text="Merge trip"
                    onClick={onMergeTripOpen}
                  />
                )}
                <CommonButton
                  width={12}
                  height={6}
                  primaryStyle
                  text="Download trip ticket"
                  onClick={handleDownloadTripTicket}
                />
              </div>
            )}
          {selectedRequest.vehicle_driver_status === "On Trip" && (
            <div>
              <CommonButton
                width={12}
                height={6}
                primaryStyle
                text="Download trip ticket"
                onClick={handleDownloadTripTicket}
              />
            </div>
          )}
          {selectedRequest.status === "Completed" &&
            selectedRequest.purpose !== "Vehicle Maintenance" &&
            selectedRequest.purpose !== "Driver Absence" && (
              <div>
                <CommonButton
                  width={12}
                  height={6}
                  primaryStyle
                  text="Download trip ticket"
                  onClick={handleDownloadTripTicket}
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
        </div>
      </Modal>
      <Modal className="merge-trip-modal" isOpen={isMergeTripOpen}>
        <div className="merge-trip-modal-container">
          <h1>Merge Trip</h1>
          <div className="merge-trip-modal-dropdown-container">
            <p>Requester's name: </p>
            <div className="merge-trip-modal-dropdown-child-container">
              <div onClick={handleFetchRequester}>
                <Dropdown
                  status={dropdownRequesters}
                  onCategoryChange={handleChooseRequester}
                  dropdownClassName="dropdown-custom"
                  menuClassName="menu-custom"
                  toggleClassName="dropdown-toggle-custom"
                />
              </div>
              <span className="set-trip-text-error-span">
                {errorMessages[0]?.requesterNameError}
              </span>
            </div>
          </div>

          <div className="merge-trip-modal-field-container">
            <p>Category: </p>
            <div className="merge-trip-modal-select-field-container">
              <select
                value={mergeTripData.type}
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  if (
                    selectedValue === "Round Trip" ||
                    selectedValue === "One-way - Drop" ||
                    selectedValue === "One-way - Fetch"
                  ) {
                    setMergeTripData((prevData: any) => ({
                      ...prevData,
                      type: selectedValue,
                    }));
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0]?.travelTypeError;
                    setErrorMessages(updatedErrors);
                  } else {
                    setMergeTripData((prevData: any) => ({
                      ...prevData,
                      type: "",
                    }));
                  }
                }}
              >
                <option>--------- Select Type --------</option>
                <option value="Round Trip">Round Trip</option>
                <option value="One-way - Drop">One-way - Drop</option>
                <option value="One-way - Fetch">One-way - Fetch</option>
              </select>
              <span className="set-trip-text-error">
                {errorMessages[0]?.travelTypeError}
              </span>
            </div>
          </div>
          <div className="merge-trip-modal-field-container">
            <p>Destination:</p>
            <div className="merge-trip-modal-select-field-container">
              <AutoCompleteAddressGoogle
                className="autocomplete-address-google-custom"
                travel_date={selectedRequest.travel_date}
                travel_time={selectedRequest.travel_time}
                setData={setMergeTripData}
                setAddressData={setAddressData}
                category={mergeTripData.type}
                removeDestinationError={removeDestinationError}
              />
              <span className="set-trip-text-error">
                {errorMessages[0]?.destinationError}
              </span>
            </div>
          </div>
          <div className="merge-trip-modal-field-container">
            <p>Purpose:</p>
            <div className="merge-trip-modal-select-field-container">
              <InputField
                className="merge-trip-modal-field-container-purpose"
                icon={faClipboard}
                value={mergeTripData.purpose}
                label="Purpose"
                placeholder="Purpose"
                onChange={(event) => {
                  setMergeTripData({
                    ...mergeTripData,
                    purpose: event.target.value,
                  });
                  if (event.target.value) {
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0]?.purposeError;
                    setErrorMessages(updatedErrors);
                  }
                }}
              />

              <span className="set-trip-text-error">
                {errorMessages[0]?.purposeError}
              </span>
            </div>
          </div>
          <div className="merge-trip-modal-field-container">
            <p>Passenger's name</p>
          </div>
          <div className="merge-trip-modal-passenger-names-container">
            {generatePassengerInputs()}
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
          <h1>Please provide the reason for the cancelation</h1>
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
      <Modal className="reason-modal" isOpen={isChangeDriverOpen}>
        <div className="reason-modal-container">
          <h1>Choose the new driver that you would like to replace with it</h1>
          <div onClick={handleFetchDrivers}>
            <Dropdown
              status={dropdownDrivers}
              onCategoryChange={handleChooseDriver}
              dropdownClassName="dropdown-custom"
              menuClassName="menu-custom"
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
              onClick={handleChangeDriver}
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
      <Confirmation
        isOpen={isConfirmationApprovedOpen}
        header="Request Approved!"
      />
      <Reschedule
      isOpen={showModal}
      header="Reschedule"
      onRequestClose={onChangeTime}
      onProceed={() => {
        onChangeTime(); // Close the modal after proceeding
      }}/>
    </>
  );
};
export default RequestFormDetails;
