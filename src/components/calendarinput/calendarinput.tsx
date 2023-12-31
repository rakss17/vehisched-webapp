import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendarinput.css";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CalendarInputProps {
  className?: string; // className prop for customization
}

const CalendarInput: React.FC<CalendarInputProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className={`calendar-container ${className}`}>
        <DatePicker
          className={`calendar-input ${className}`}
          selected={selectedDate}
          onChange={handleDateChange}
        />
        <div className="calendar-icon-container">
          <FontAwesomeIcon
            className={`calendar-input-icon ${className}`}
            icon={faCalendarAlt}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarInput;
