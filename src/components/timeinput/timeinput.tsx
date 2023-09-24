import React, { useState } from "react";
import TimePicker from "react-time-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { format, setHours, getHours, addHours, subHours } from "date-fns";
import "./timeinput.css";
import { TimeInputProps } from "../../interfaces/interfaces";

const TimeInput: React.FC<TimeInputProps> = ({ onChange }) => {
  const [selectedTime, setSelectedTime] = useState<any>(new Date());

  const handleTimeChange = (time: string | null) => {
    if (time) {
      const selectedTime = new Date(time);

      const time12HourFormat = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(selectedTime);

      console.log("Time received in RequestForm:", time12HourFormat);
    } else {
      console.log("No time selected.");
    }
  };

  const handleTimeIncrement = () => {
    if (selectedTime) {
      setSelectedTime(addHours(selectedTime, 1));
    }
    onChange(selectedTime);
  };

  const handleTimeDecrement = () => {
    if (selectedTime) {
      setSelectedTime(subHours(selectedTime, 1));
    }
    onChange(selectedTime);
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
    onChange(selectedTime);
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
