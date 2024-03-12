import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ModalProps, RequestFormProps } from "../../interfaces/interfaces";
import CommonButton from "../button/commonbutton";
import LoadingBar from "react-top-loading-bar";
import "./reschedule.css";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import format from "date-fns/format";
import { rescheduleRequestAPI } from "../api/api";
import { formatDate, formatTime } from "../functions/getTimeElapsed";

const Reschedule: React.FC<ModalProps> = ({
  isOpen,
  header,
  onRequestClose,
  selectedRequest,
  fetchRequestOfficeStaffAPI,
  setRequestList,
  travelDateDayGap,
}) => {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [data, setData] = useState<any>({
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
  });
  useEffect(() => {
    if (
      (selectedRequest?.travel_date,
      selectedRequest?.travel_time,
      selectedRequest?.return_date,
      selectedRequest?.return_time)
    ) {
      setData({
        ...data,
        travel_date: selectedRequest?.travel_date,
        travel_time: selectedRequest?.travel_time,
        return_date: selectedRequest?.return_date,
        return_time: selectedRequest?.return_time,
      });
    }
  }, [
    selectedRequest?.travel_date,
    selectedRequest?.travel_time,
    selectedRequest?.return_date,
    selectedRequest?.return_time,
  ]);

  useEffect(() => {
    if (
      (selectedRequest?.type === "One-way - Drop" ||
        selectedRequest?.type === "One-way - Fetch") &&
      (data.travel_date || data.travel_time)
    ) {
      const travelDateTime = `${data.travel_date}T${data.travel_time}`;
      const travelDate = new Date(travelDateTime);

      const returnDate = new Date(travelDate);
      returnDate.setDate(returnDate.getDate() + travelDateDayGap);

      const returnDateFormat = returnDate.toISOString().split("T")[0];

      const returnTimeFormat = returnDate.toTimeString().split(" ")[0];

      setData({
        ...data,
        return_date: returnDateFormat,
        return_time: returnTimeFormat,
      });
    }
  }, [
    selectedRequest?.type === "One-way - Drop",
    selectedRequest?.type === "One-way - Fetch",
  ]);

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
          {selectedRequest?.type === "Round Trip" ? (
            <>
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
            </>
          ) : (
            <>
              <div>
                <p>{travelDateDayGap}</p>
                <p>Estimated return date & time</p>
                <div>
                  <p>
                    {data.return_date
                      ? formatDate(data.return_date)
                      : formatDate(selectedRequest?.return_date)}
                  </p>
                  <p>
                    {data.return_time
                      ? formatTime(data.return_time)
                      : formatTime(selectedRequest?.return_time)}
                  </p>
                </div>
              </div>
            </>
          )}
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
