import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendarinput.css";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalendarInputProps } from "../../interfaces/interfaces";

const CalendarInput: React.FC<CalendarInputProps> = ({
  containerClassName,
  calendarClassName,
  iconClassName,
  onChange,
  disableDaysBefore = 0,
  selectedDate,
}) => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(selectedDate || new Date());
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    onChange(date);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + disableDaysBefore);

  return (
    <>
      <div className={`calendar-container ${containerClassName}`}>
        <DatePicker
          key={date?.toString()}
          className={`calendar-input ${calendarClassName}`}
          selected={date}
          onChange={handleDateChange}
          minDate={minDate}
        />

        <div className="calendar-icon-container">
          <FontAwesomeIcon
            className={`calendar-input-icon ${iconClassName}`}
            icon={faCalendarAlt}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarInput;
