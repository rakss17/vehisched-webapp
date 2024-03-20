import { DateRange } from "react-date-range";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  CheckScheduleProps,
  SchedulePickerProps,
} from "../../interfaces/interfaces";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./schedulepicker.css";
import CommonButton from "../button/commonbutton";
import {
  convertTo12HourFormat,
  formatDateToYYYYMMDD,
} from "../functions/functions";
import CircularProgress from "@mui/material/CircularProgress";
import { checkTimeAvailability } from "../api/api";

const SchedulePicker: React.FC<SchedulePickerProps> = ({
  isOpen,
  selectedVehicleExisitingSchedule,
}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [disableDates, setDisableDates] = useState<any[]>([]);
  const [data, setData] = useState<CheckScheduleProps>({
    travel_date: null,
    return_date: null,
  });
  const [selectedTimes, setSelectedTimes] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [availableTimes, setAvailableTimes] = useState({
    travelDateTimes: [],
    returnDateTimes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [prevSelection, setPrevSelection] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    let disabledDatesArray: any = [];

    selectedVehicleExisitingSchedule.forEach((schedule: any) => {
      if (
        schedule.travel_date &&
        schedule.return_date &&
        schedule.travel_time &&
        schedule.return_time
      ) {
        const travelDate = new Date(schedule.travel_date);
        const returnDate = new Date(schedule.return_date);

        const travelTime = new Date(
          `${schedule.travel_date}T${schedule.travel_time}`
        );
        const returnTime = new Date(
          `${schedule.return_date}T${schedule.return_time}`
        );

        const shouldDisableDate = (date: Date) => {
          if (
            date.getTime() === travelDate.getTime() &&
            travelTime.getHours() === 0
          ) {
            return true;
          }

          if (
            date.getTime() === returnDate.getTime() &&
            returnTime.getHours() === 23
          ) {
            return true;
          }

          if (date > travelDate && date < returnDate) {
            return true;
          }
          return false;
        };

        let currentDate = new Date(travelDate);
        while (currentDate <= returnDate) {
          if (shouldDisableDate(currentDate)) {
            disabledDatesArray.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });

    // Update disableDates state with the array of Date objects
    setDisableDates(disabledDatesArray);
  }, [selectedVehicleExisitingSchedule]);

  // const calculateAvailableTimes = (date: any, isTravelDate: boolean) => {
  //   const availableTimes = [];

  //   for (let hour = 0; hour < 24; hour++) {
  //     for (let minute = 0; minute < 60; minute += 30) {
  //       const time = new Date(date);

  //       time.setHours(hour, minute);

  //       const isWithinBookingRange = selectedVehicleExisitingSchedule.some(
  //         (schedule: any) => {
  //           const bookingStart = new Date(
  //             `${schedule.travel_date}T${schedule.travel_time}`
  //           );
  //           const bookingEnd = new Date(
  //             `${schedule.return_date}T${schedule.return_time}`
  //           );

  //           if (selectedDates.travelDate === selectedDates.returnDate) {
  //             if (selectedTimes.start) {
  //               console.log("selectedTimes.start", selectedTimes.start);

  //               if (selectedTimes.start >= schedule.travel_time) {
  //                 console.log("schedule.travel_time", schedule.travel_time);
  //                 console.log("start timeee");
  //                 return time >= bookingStart;
  //               }
  //               if (selectedTimes.start >= schedule.return_time) {
  //                 console.log("triggered1");
  //                 console.log("schedule.return_time", schedule.return_time);
  //                 return time <= bookingEnd;
  //               }

  //               console.log("selected.start triggered", selectedTimes.start);
  //             }
  //             if (selectedTimes.end) {
  //               if (selectedTimes.end >= schedule.travel_time) {
  //                 console.log("start timeee");
  //                 return time >= bookingStart;
  //               }
  //               if (selectedTimes.end >= schedule.return_time) {
  //                 console.log("triggered1");
  //                 return time <= bookingEnd;
  //               }
  //               console.log("selected.end triggered", selectedTimes.end);
  //             }

  //             return time >= bookingStart && time <= bookingEnd;
  //           } else {
  //             return time >= bookingStart && time <= bookingEnd;
  //           }
  //         }
  //       );

  //       if (!isWithinBookingRange) {
  //         availableTimes.push(time);
  //       }
  //     }
  //   }

  //   return availableTimes;
  // };

  // useEffect(() => {
  //   // Initialize available times with empty arrays
  //   let travelDateTimes: any = [];
  //   let returnDateTimes: any = [];

  //   // Check if travelDate is selected
  //   if (selectedDates.travelDate) {
  //     travelDateTimes = calculateAvailableTimes(selectedDates.travelDate, true);
  //   }

  //   // Check if returnDate is selected
  //   if (selectedDates.returnDate) {
  //     returnDateTimes = calculateAvailableTimes(
  //       selectedDates.returnDate,
  //       false
  //     );
  //   }

  //   // Update the state with the calculated times
  //   setAvailableTimes({
  //     travelDateTimes,
  //     returnDateTimes,
  //   });
  // }, [selectedDates, selectedTimes]);

  // useEffect(() => {
  //   let travelDateTimes: any = [];
  //   let returnDateTimes: any = [];

  //   // Ensure selectedTimes.start and selectedTimes.end are valid dates
  //   const componentsStartDate = splitDate(selectedDates.travelDate);
  //   const startTime = selectedTimes.start
  //     ? `${componentsStartDate} ${selectedTimes.start} GMT+0800 (Philippine Standard Time)`
  //     : null;

  //   const componentsEndDate = splitDate(selectedDates.travelDate);
  //   const endTime = selectedTimes.end
  //     ? `${componentsEndDate} ${selectedTimes.end} GMT+0800 (Philippine Standard Time)`
  //     : null;

  //   // console.log("date components", components);

  //   // const startTime = selectedTimes.start ?

  //   // Check if both start and end times are selected

  //   // Only start time is selected, calculate available times for travel date
  //   travelDateTimes = calculateAvailableTimes(startTime, true);
  //   returnDateTimes = calculateAvailableTimes(endTime, false);
  //   console.log("2nd triggered");

  //   // Update the state with the calculated times
  //   setAvailableTimes({
  //     travelDateTimes,
  //     returnDateTimes,
  //   });
  // }, [selectedTimes]);

  const handleCheckTimeAvailability = () => {
    console.log(data);
    console.log(availableTimes);
    setIsLoading(true);
    checkTimeAvailability(
      formatDateToYYYYMMDD(data.travel_date),
      formatDateToYYYYMMDD(data.return_date),
      setAvailableTimes,
      setIsLoading
    );
  };

  console.log("Available Times state", availableTimes);

  return (
    <Modal className="schedule-picker-modal" isOpen={isOpen}>
      <DateRange
        onChange={(item: any) => {
          const localStartDate = localStorage.getItem("startDate");
          const localEndDate = localStorage.getItem("endDate");
          if (
            localStartDate !== formatDateToYYYYMMDD(item.selection.startDate) &&
            localEndDate !== formatDateToYYYYMMDD(item.selection.endDate)
          ) {
            localStorage.setItem("startDate", item.selection.startDate);
            localStorage.setItem("endDate", item.selection.endDate);
            setState([item.selection]);
            setData({
              travel_date: item.selection.startDate,
              return_date: item.selection.endDate,
            });
            setAvailableTimes({
              travelDateTimes: [],
              returnDateTimes: [],
            });
          }
        }}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="horizontal"
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        disabledDates={disableDates}
        rangeColors={["#060e57"]}
      />
      <div className="available-times-container">
        <h3>Available Times</h3>
        <div className="available-times-header-container">
          <h4>Start time</h4>
          <h4>End time</h4>
        </div>
        <div className="times-containers">
          {data.travel_date && data.return_date && (
            <>
              {availableTimes.travelDateTimes.length === 0 &&
              availableTimes.returnDateTimes.length === 0 ? (
                <div className="check-time-availability-container">
                  {isLoading ? (
                    <CircularProgress color="primary" size={45} />
                  ) : (
                    <CommonButton
                      width={13}
                      height={9}
                      primaryStyle
                      text="Check time availability"
                      onClick={handleCheckTimeAvailability}
                    />
                  )}
                </div>
              ) : (
                <>
                  <div className="travel-time-container">
                    {availableTimes.travelDateTimes.map(
                      (timeString: string) => {
                        // Convert the time string to a Date object

                        return (
                          <>
                            {selectedStartTime ===
                            convertTo12HourFormat(timeString) ? (
                              <>
                                <CommonButton
                                  key={convertTo12HourFormat(timeString)}
                                  width={9}
                                  height={7}
                                  primaryStyle
                                  text={convertTo12HourFormat(timeString)}
                                  onClick={(text: any) => {
                                    setSelectedStartTime(null);
                                    setSelectedTimes({
                                      ...selectedTimes,
                                      start: null,
                                    });
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <CommonButton
                                  key={convertTo12HourFormat(timeString)}
                                  width={9}
                                  height={7}
                                  whiteStyle
                                  text={convertTo12HourFormat(timeString)}
                                  onClick={(text: any) => {
                                    setSelectedStartTime(text);
                                    setSelectedTimes({
                                      ...selectedTimes,
                                      start: text,
                                    });
                                  }}
                                />
                              </>
                            )}
                          </>
                        );
                      }
                    )}
                  </div>

                  <div className="return-time-container">
                    {availableTimes.returnDateTimes.map(
                      (timeString: string) => {
                        // Convert the time string to a Date object

                        return (
                          <>
                            {selectedEndTime ===
                            convertTo12HourFormat(timeString) ? (
                              <>
                                <CommonButton
                                  key={convertTo12HourFormat(timeString)}
                                  width={9}
                                  height={7}
                                  primaryStyle
                                  text={convertTo12HourFormat(timeString)}
                                  onClick={(text: any) => {
                                    setSelectedEndTime(null);
                                    setSelectedTimes({
                                      ...selectedTimes,
                                      end: null,
                                    });
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <CommonButton
                                  key={convertTo12HourFormat(timeString)}
                                  width={9}
                                  height={7}
                                  whiteStyle
                                  text={convertTo12HourFormat(timeString)}
                                  onClick={(text: any) => {
                                    setSelectedEndTime(text);
                                    setSelectedTimes({
                                      ...selectedTimes,
                                      end: text,
                                    });
                                  }}
                                />
                              </>
                            )}
                          </>
                        );
                      }
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SchedulePicker;
