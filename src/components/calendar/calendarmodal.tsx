import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CalendarSchedule from "./calendar";
import "./calendarmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CalendarModal: React.FC<any> = ({
  isOpen,
  selectedSchedule,
  onRequestClose,
}) => {
  const [showMore, setShowMore] = useState(false);
  console.log("selectedschedule", selectedSchedule);

  const handleShowMore = () => {
    setShowMore(true);
  };
  const handleHide = () => {
    setShowMore(false);
  };
  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };
  return (
    <>
      <Modal className="calendar-modal" isOpen={isOpen}>
        <div className="close-container">
          <p onClick={onRequestClose}>
            <FontAwesomeIcon icon={faXmark} />
            {""} Close
          </p>
        </div>
        <div className="calendar-modal-container">
          <div>
            <CalendarSchedule schedulesData={selectedSchedule} />
          </div>
          <div className="schedule-info-container">
            {selectedSchedule.map((schedule: any) => (
              <div key={schedule.tripticket_id} className="schedule-card">
                <div className="main-info">
                  <div>
                    <strong>Trip No.: </strong>
                    <p>{schedule.tripticket_id}</p>
                  </div>
                  <div className="date-and-time-modal">
                    <strong>Date and time: </strong>
                    <p>
                      {schedule.travel_date}, {formatTime(schedule.travel_time)}{" "}
                      <strong>to</strong> {schedule.return_date},{" "}
                      {formatTime(schedule.return_time)}
                    </p>
                  </div>
                  {!showMore ? (
                    <div>
                      <strong onClick={handleShowMore}>Show more...</strong>
                    </div>
                  ) : (
                    <div>
                      <strong onClick={handleHide}>Hide</strong>
                    </div>
                  )}
                </div>
                {showMore && (
                  <div className="additional-info">
                    <div>
                      <strong>Vehicle: </strong>
                      <p>{schedule.vehicle}</p>
                    </div>
                    <div>
                      <strong>Driver: </strong>
                      <p>{schedule.driver}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalendarModal;
