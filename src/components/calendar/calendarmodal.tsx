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
  return (
    <>
      <Modal className="calendar-modal" isOpen={isOpen}>
        <div className="calendar-modal-container">
          <div>
            <p onClick={onRequestClose}>
              <FontAwesomeIcon icon={faXmark} />
              {""} Close
            </p>
          </div>
          <div>
            <CalendarSchedule schedulesData={selectedSchedule} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalendarModal;
