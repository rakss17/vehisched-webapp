import React, { useState } from "react";
import TimePicker from "react-time-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  format,
  setHours,
  setMinutes,
  getHours,
  addHours,
  subHours,
} from "date-fns";
import "./timeinput.css";

const TimeInput: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(
      time ? new Date(new Date().toDateString() + " " + time) : null
    );
  };

  const handleTimeIncrement = () => {
    if (selectedTime) {
      setSelectedTime(addHours(selectedTime, 1));
    }
  };

  const handleTimeDecrement = () => {
    if (selectedTime) {
      setSelectedTime(subHours(selectedTime, 1));
    }
  };

  const handleAmPmIncrement = () => {
    if (selectedTime) {
      const currentHour = getHours(selectedTime);
      setSelectedTime(
        setHours(
          selectedTime,
          currentHour >= 12 ? currentHour - 12 : currentHour + 12
        )
      );
    }
  };

  const handleAmPmDecrement = () => {
    if (selectedTime) {
      const currentHour = getHours(selectedTime);
      setSelectedTime(
        setHours(
          selectedTime,
          currentHour >= 12 ? currentHour - 12 : currentHour + 12
        )
      );
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
        <button onClick={handleTimeIncrement}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>

        <button onClick={handleTimeDecrement}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
      <div className="am-pm-container">{renderAMPM()}</div>
      <div className="arrow-buttons-ampm">
        <button onClick={handleAmPmIncrement}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>

        <button onClick={handleAmPmDecrement}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
    </div>
  );
};

export default TimeInput;
