import React, { useState } from "react";
import Modal from "react-modal";
import { ModalProps, RequestFormProps } from "../../interfaces/interfaces";
import CommonButton from "../button/commonbutton";
import LoadingBar from "react-top-loading-bar";
import "./reschedule.css";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import format from "date-fns/format";
import { rescheduleRequestAPI } from "../api/api";

const Reschedule: React.FC<ModalProps> = ({
  isOpen,
  header,
  onRequestClose,
  selectedRequest,
  fetchRequestOfficeStaffAPI,
  setRequestList,
}) => {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [data, setData] = useState<any>({
    travel_date: selectedRequest?.travel_date,
    travel_time: selectedRequest?.travel_time,
    return_date: selectedRequest?.return_date,
    return_time: selectedRequest?.return_time,
  });
  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData((prevData: any) => ({
      ...prevData,
      travel_date: formattedDate,
    }));

    // checkAutocompleteDisability();
  };
  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData((prevData: any) => ({
      ...prevData,
      return_date: formattedDate,
    }));
  };

  const handleStartTimeChange = (time: string | null) => {
    if (time) {
      setData((prevData: any) => ({
        ...prevData,
        travel_time: time,
      }));
    }
  };

  const handleEndTimeChange = (time: string | null) => {
    if (time) {
      setData((prevData: any) => ({
        ...prevData,
        return_time: time,
      }));
    } else {
      console.log("No time selected.");
    }
  };

  const handleSubmit = () => {
    setLoadingBarProgress(20);
    console.log("data", data);
    rescheduleRequestAPI(
      selectedRequest?.request_id,
      onRequestClose,
      data,
      setLoadingBarProgress,
      fetchRequestOfficeStaffAPI,
      setRequestList
    );
  };

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <Modal className="modal-reschedule" isOpen={isOpen}>
        <h1>{header}</h1>
        <div>
          <div>
            <p>Travel date & time</p>
            <div>
              <CalendarInput
                containerClassName="calendar-container"
                calendarClassName="calendar-input"
                iconClassName="calendar-input-icon"
                onChange={handleStartDateChange}
                selectedDate={
                  data.travel_date ? new Date(data.travel_date) : null
                }
              />
              <TimeInput
                onChange={handleStartTimeChange}
                selectedDate={data.travel_date}
                handleDateChange={handleStartDateChange}
                timeSelected={selectedRequest?.travel_time}
              />
            </div>
          </div>
          <div>
            <p>Return date & time</p>
            <div>
              <CalendarInput
                containerClassName="calendar-container"
                calendarClassName="calendar-input"
                iconClassName="calendar-input-icon"
                selectedDate={
                  data.return_date ? new Date(data.return_date) : null
                }
                onChange={handleEndDateChange}
              />
              <TimeInput
                onChange={handleEndTimeChange}
                selectedDate={data.return_date}
                handleDateChange={handleEndDateChange}
                timeSelected={selectedRequest?.return_time}
              />
            </div>
          </div>
        </div>
        <div className="yesno-reschedule-btn">
          <CommonButton onClick={onRequestClose} text="Cancel" secondaryStyle />
          <CommonButton
            onClick={handleSubmit}
            text="Reschedule "
            primaryStyle
          />
        </div>
      </Modal>
    </>
  );
};
export default Reschedule;
