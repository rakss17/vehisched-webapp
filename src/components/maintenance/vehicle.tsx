import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ModalProps } from "../../interfaces/interfaces";
import "./vehicle.css";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import CommonButton from "../button/commonbutton";
import { format } from "date-fns";
import { vehicleMaintenanceAPI } from "../api/api";

const VehicleMaintenance: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  selectedVehicle,
  setIsVehicleMaintenanceOpen,
  setLoadingBarProgress,
  setIsConfirmationOpenVehicleMaintenance,
}) => {
  if (!selectedVehicle) return null;
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [data, setData] = useState<any>({
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
    plate_number: "",
  });

  useEffect(() => {
    setData((prevData: any) => ({
      ...prevData,
      plate_number: selectedVehicle.plate_number,
    }));
  }, []);

  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, travel_date: formattedDate });
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.travelDateError;
    setErrorMessages(updatedErrors);
  };
  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, return_date: formattedDate });
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.returnDateError;
    setErrorMessages(updatedErrors);
  };

  const handleStartTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, travel_time: time });
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelTimeError;
      setErrorMessages(updatedErrors);
    } else {
      console.log("No time selected.");
    }
  };
  const handleEndTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, return_time: time });
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.returnTimeError;
      setErrorMessages(updatedErrors);
    } else {
      console.log("No time selected.");
    }
  };

  const handleProceed = () => {
    let validationErrors: { [key: string]: string } = {};

    const allFieldsBlank =
      !data.travel_date &&
      !data.travel_time &&
      !data.return_date &&
      !data.return_time;

    if (allFieldsBlank) {
      validationErrors.all = "Required all fields!";
    } else {
      if (!data.travel_date) {
        validationErrors.travelDateError = "This field is required";
      }
      if (!data.travel_time) {
        validationErrors.travelTimeError = "This field is required";
      }

      if (!data.return_date) {
        validationErrors.returnDateError = "This field is required";
      }

      if (!data.return_time) {
        validationErrors.returnTimeError = "This field is required";
      }
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);
    if (Object.keys(validationErrors).length === 0) {
      setLoadingBarProgress(20);
      vehicleMaintenanceAPI(
        data,
        setIsConfirmationOpenVehicleMaintenance,
        setLoadingBarProgress,
        setIsVehicleMaintenanceOpen
      );
    }
  };
  return (
    <Modal className="vehicle-maintenance-modal" isOpen={isOpen}>
      <div className="vehicle-maintenance-container">
        <div className="vehicle-maintenance-brief-info">
          <strong>
            You are going to have a maintenance with this vehicle{" "}
            {selectedVehicle.plate_number}
          </strong>
          <p className="set-trip-text-error">{errorMessages[0]?.all}</p>
        </div>
        <div className="maintenance-from">
          <p>From: </p>
          <div>
            <CalendarInput
              selectedDate={
                data.travel_date ? new Date(data.travel_date) : null
              }
              onChange={handleStartDateChange}
              disableDaysBefore={0}
            />
            <p className="set-trip-text-error">
              {errorMessages[0]?.travelDateError}
            </p>
            {!errorMessages[0]?.travelDateError && <br></br>}

            <TimeInput
              onChange={handleStartTimeChange}
              selectedDate={data.travel_date}
              handleDateChange={handleStartDateChange}
            />
            <p className="set-trip-text-error">
              {errorMessages[0]?.travelTimeError}
            </p>
          </div>
        </div>
        <div className="maintenance-to">
          <p>To: </p>
          <div>
            <CalendarInput
              selectedDate={
                data.return_date ? new Date(data.return_date) : null
              }
              onChange={handleEndDateChange}
              disableDaysBefore={0}
            />
            <p className="set-trip-text-error">
              {errorMessages[0]?.returnDateError}
            </p>
            {!errorMessages[0]?.returnDateError && <br></br>}
            <TimeInput
              onChange={handleEndTimeChange}
              selectedDate={data.return_date}
              handleDateChange={handleEndDateChange}
            />
            <p className="set-trip-text-error">
              {errorMessages[0]?.returnTimeError}
            </p>
          </div>
        </div>
        <div className="maintenance-button">
          <CommonButton text="Cancel" secondaryStyle onClick={onRequestClose} />
          <CommonButton text="Proceed" primaryStyle onClick={handleProceed} />
        </div>
      </div>
    </Modal>
  );
};

export default VehicleMaintenance;
