import React, { useState } from "react";
import Modal from "react-modal";
import { ModalProps } from "../../interfaces/interfaces";
import "./vehicle.css";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import CommonButton from "../button/commonbutton";
import { format } from "date-fns";
import { vehicleMaintenanceAPI } from "../api/api";
import { useNavigate } from "react-router-dom";

const VehicleMaintenance: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  selectedVehicle,
  setIsVehicleMaintenanceOpen,
  setLoadingBarProgress,
  setIsConfirmationOpenVehicleMaintenance,
}) => {
  if (!selectedVehicle) return null;
  const [data, setData] = useState<any>({
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
    plate_number: selectedVehicle.plate_number,
  });
  const navigate = useNavigate();
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
  const handleProceed = () => {
    setIsVehicleMaintenanceOpen(false);
    setLoadingBarProgress(20);
    vehicleMaintenanceAPI(
      data,
      setIsConfirmationOpenVehicleMaintenance,
      navigate,
      setLoadingBarProgress
    );
  };
  return (
    <Modal className="vehicle-maintenance-modal" isOpen={isOpen}>
      <div className="vehicle-maintenance-container">
        <div className="vehicle-maintenance-brief-info">
          <strong>
            You are going to have a maintenance with this vehicle{" "}
            {selectedVehicle.plate_number}
          </strong>
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
            <br></br>
            <TimeInput
              onChange={handleStartTimeChange}
              selectedDate={data.travel_date}
              handleDateChange={handleStartDateChange}
            />
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
            <br></br>
            <TimeInput
              onChange={handleEndTimeChange}
              selectedDate={data.return_date}
              handleDateChange={handleEndDateChange}
            />
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
