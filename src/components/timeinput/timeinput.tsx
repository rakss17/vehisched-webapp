import React, { useState } from "react";
import TimePicker from "react-time-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { format, setHours, setMinutes, getHours, getMinutes } from "date-fns";
import "./timeinput.css";
import { TimeInputProps } from "../../interfaces/interfaces";

const TimeInput: React.FC<TimeInputProps> = ({ onChange }) => {
  const [selectedTime, setSelectedTime] = useState<any>(new Date());

  const handleTimeChange = (time: string | null) => {
    if (time) {
      const selectedTime = new Date(time);
      console.log("Time received in RequestForm:", selectedTime);
    } else {
      console.log("No time selected.");
    }
  };

  const handleHourIncrement = () => {
    if (selectedTime) {
      const incrementedTime = new Date(selectedTime);
      incrementedTime.setHours(incrementedTime.getHours() + 1);
      setSelectedTime(incrementedTime);
      onChange(format(incrementedTime, "HH:mm"));
    }
  };

  const handleHourDecrement = () => {
    if (selectedTime) {
      const decrementedTime = new Date(selectedTime);
      decrementedTime.setHours(decrementedTime.getHours() - 1);
      setSelectedTime(decrementedTime);
      onChange(format(decrementedTime, "HH:mm"));
    }
  };

  const handleMinuteIncrement = () => {
    if (selectedTime) {
      const incrementedTime = new Date(selectedTime);
      incrementedTime.setMinutes(incrementedTime.getMinutes() + 1);
      setSelectedTime(incrementedTime);
      onChange(format(incrementedTime, "HH:mm"));
    }
  };

  const handleMinuteDecrement = () => {
    if (selectedTime) {
      const decrementedTime = new Date(selectedTime);
      decrementedTime.setMinutes(decrementedTime.getMinutes() - 1);
      setSelectedTime(decrementedTime);
      onChange(format(decrementedTime, "HH:mm"));
    }
  };

  const renderAMPM = () => {
    if (!selectedTime) return null;
    const ampm = format(selectedTime, "a");
    return <div className="ampm">{ampm}</div>;
  };

  return (
    <div className="time-input-wrapper">
      <div className="picker-wrapper">
        <TimePicker
          className="time-input"
          clearIcon={null}
          disableClock={true}
          format="h:mm a"
          onChange={handleTimeChange}
          value={selectedTime ? format(selectedTime, "h:mm a") : null}
        />
      </div>
      <div className="arrow-buttons">
        <button onClick={handleHourIncrement}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>

        <button onClick={handleHourDecrement}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
      <div className="am-pm-container">{renderAMPM()}</div>
      <div className="arrow-buttons-ampm">
        <button onClick={handleMinuteIncrement}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>

        <button onClick={handleMinuteDecrement}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
    </div>
  );
};

export default TimeInput;
