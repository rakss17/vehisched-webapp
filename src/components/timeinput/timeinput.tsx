import React, { useState } from "react";
import TimePicker from "react-time-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { format, setHours, setMinutes, getHours, getMinutes } from "date-fns";
import "./timeinput.css";
import { TimeInputProps } from "../../interfaces/interfaces";

const TimeInput: React.FC<TimeInputProps> = ({
  onChange,
  selectedDate,
  handleDateChange,
}) => {
  const [selectedTime, setSelectedTime] = useState<any>(new Date());

  const handleTimeChange = (time: string | null) => {
    if (time) {
      const [hours, minutes] = time.split(":");
      const selectedTimee = new Date(selectedTime);
      selectedTimee.setHours(parseInt(hours));
      selectedTimee.setMinutes(parseInt(minutes));
      setSelectedTime(selectedTimee);
      onChange(format(selectedTimee, "HH:mm"));
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

      if (incrementedTime.getHours() === 0) {
        if (selectedDate) {
          const currentDate = new Date(selectedDate);

          currentDate.setDate(currentDate.getDate() + 1);

          if (handleDateChange) {
            handleDateChange(currentDate);
          }
        }
      }
    }
  };

  const handleHourDecrement = () => {
    if (selectedTime) {
      const decrementedTime = new Date(selectedTime);
      decrementedTime.setHours(decrementedTime.getHours() - 1);
      setSelectedTime(decrementedTime);
      onChange(format(decrementedTime, "HH:mm"));

      if (decrementedTime.getHours() === 23) {
        if (selectedDate) {
          const currentDate = new Date(selectedDate);

          currentDate.setDate(currentDate.getDate() - 1);

          if (handleDateChange) {
            handleDateChange(currentDate);
          }
        }
      }
    }
  };

  const handleAmPmIncrement = () => {
    if (selectedTime) {
      const currentHour = getHours(selectedTime);
      const newTime = setHours(
        selectedTime,
        currentHour >= 12 ? currentHour - 12 : currentHour + 12
      );

      setSelectedTime(newTime);
      onChange(format(newTime, "HH:mm"));
    }
  };

  const handleAmPmDecrement = () => {
    if (selectedTime) {
      const currentHour = getHours(selectedTime);
      const newTime = setHours(
        selectedTime,
        currentHour >= 12 ? currentHour - 12 : currentHour + 12
      );

      setSelectedTime(newTime);
      onChange(format(newTime, "HH:mm"));
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
