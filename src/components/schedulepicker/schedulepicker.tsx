import { DateRange } from "react-date-range";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  CheckScheduleProps,
  RequestFormProps,
  SchedulePickerProps,
} from "../../interfaces/interfaces";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./schedulepicker.css";
import CommonButton from "../button/commonbutton";
import {
  convertTo12HourFormat,
  formatDateToYYYYMMDD,
  convertTo24HourFormat,
  formatDate,
  formatTime,
} from "../functions/functions";
import CircularProgress from "@mui/material/CircularProgress";
import useHeartbeat, {
  checkScheduleConflictsForOneway,
  checkTimeAvailability,
  checkVehicleOnProcess,
  postRequestFormAPI,
} from "../api/api";
import AutoCompleteAddressGoogle from "../addressinput/googleaddressinput";
import InputField from "../inputfield/inputfield";
import { faClipboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Confirmation from "../confirmation/confirmation";
import LoadingBar from "react-top-loading-bar";

const SchedulePicker: React.FC<SchedulePickerProps> = ({
  isOpen,
  selectedVehicleExisitingSchedule,
  setIsScheduleClick,
  selectedVehicleCapacity,
  selectedVehicleModel,
  selectedVehiclePlateNumber,
  selectedVehicleDriver,
}) => {
  console.log("selected vehicle", selectedVehicleExisitingSchedule);
  const [state, setState] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      key: "selection",
    },
  ]);
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const firstName = personalInfo?.first_name;
  const lastName = personalInfo?.last_name;
  const userID = personalInfo?.id;
  const userName = personalInfo?.username;
  const office = personalInfo?.office;
  const role = personalInfo?.role;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [disableDates, setDisableDates] = useState<any[]>([]);
  const [UnavailableTimeInRange, setUnavailableTimeInRange] = useState(null);
  const [isFromAutoComplete, setIsFromAutoComplete] = useState(false);
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [errorColor, setErrorColor] = useState(false);
  const [isCalendarDateRangePickerShow, setIsCalendarDateRangePickerShow] =
    useState(false);
  const [isOtherFieldsShow, setIsOtherFieldsShow] = useState(false);
  const [isDetailsConfirmationShow, setIsDetailsConfirmationShow] =
    useState(false);
  const [addressData, setAddressData] = useState<any>({
    destination: "",
    distance: null,
  });
  const [selectedTravelType, setSelectedTravelType] = useState("");
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RequestFormProps>({
    purpose: "",
    number_of_passenger: null,
    passenger_name: [],
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
    destination: addressData.destination,
    vehicle: selectedVehiclePlateNumber,
    type: "",
    distance: addressData.distance,
    merge_trip: false,
    role: role,
    driver_name: selectedVehicleDriver,
    office: office,
    requester_name: userID,
    vehicle_capacity: null,
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

  useEffect(() => {
    if (UnavailableTimeInRange) {
      console.log("parent", UnavailableTimeInRange);
      setState([
        {
          startDate: new Date(data.travel_date),
          endDate: new Date(UnavailableTimeInRange),
          key: "selection",
        },
      ]);
      setData({
        travel_date: data.travel_date,
        return_date: UnavailableTimeInRange,
      });
    } else if (
      UnavailableTimeInRange !== null &&
      (data.travel_date !== UnavailableTimeInRange ||
        data.return_date !== UnavailableTimeInRange)
    ) {
      setState([
        {
          startDate: new Date(data.travel_date),
          endDate: new Date(data.return_date),
          key: "selection",
        },
      ]);
    }
  }, [UnavailableTimeInRange, data.travel_date, data.return_date]);

  useHeartbeat(isOtherFieldsShow, isDetailsConfirmationShow);

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
  const generatePassengerInputs = () => {
    const inputs = [];
    for (let i = 0; i < selectedVehicleCapacity; i++) {
      inputs.push(
        <div key={i} className="passenger-name-column">
          <InputField
            className="passenger_name_width"
            value={(data.passenger_name && data.passenger_name[i]) || ""}
            key={i}
            icon={faUser}
            label={`Passenger ${i + 1}`}
            placeholder={`Passenger ${i + 1}`}
            onChange={(event) => {
              const newPassengerNames = [...(data.passenger_name || "")];
              newPassengerNames[i] = event.target.value;
              const countNumberOfPassenger = newPassengerNames.filter(
                (name) => name !== ""
              ).length;
              setData((prevData: any) => ({
                ...prevData,
                passenger_name: newPassengerNames,
                number_of_passenger: countNumberOfPassenger,
              }));
              const updatedErrors = { ...errorMessages };
              delete updatedErrors[0]?.passengerNameError;
              setErrorMessages(updatedErrors);
            }}
          />
        </div>
      );
    }
    return inputs;
  };

  useEffect(() => {
    if (
      (selectedTravelType === "One-way - Drop" ||
        selectedTravelType === "One-way - Fetch") &&
      isFromAutoComplete &&
      addressData.destination &&
      addressData.distance
    ) {
      console.log("isFrom", data.travel_date, data.return_date);
      checkScheduleConflictsForOneway(
        data.travel_date,
        data.travel_time,
        data.return_date,
        data.return_time,
        selectedVehiclePlateNumber,
        setIsLoading,
        setErrorColor
      );
    }
  }, [
    isFromAutoComplete,
    addressData.destination,
    addressData.distance,
    data.return_date,
    data.return_time,
  ]);

  useEffect(() => {
    if (addressData.destination && addressData.distance) {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.destinationError;
      setErrorMessages(updatedErrors);
    }
  }, [addressData.destination, addressData.distance]);

  const handleCheckTimeAvailability = () => {
    console.log(data);
    console.log(availableTimes);
    setIsLoading(true);
    checkTimeAvailability(
      data.travel_date,
      data.return_date,
      selectedVehiclePlateNumber,
      setAvailableTimes,
      setIsLoading,
      setUnavailableTimeInRange
    );
  };

  const handleChangeTravelType = (text: any) => {
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.travelTypeError;
    setErrorMessages(updatedErrors);
    if (text === "Round Trip") {
      setSelectedTravelType("Round Trip");
    } else if (text === "One-way - Drop") {
      setSelectedTravelType("One-way - Drop");
    } else if (text === "One-way - Fetch") {
      setSelectedTravelType("One-way - Fetch");
    }
  };

  const today = new Date();
  today.setDate(today.getDate() + 3);

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <Modal className="schedule-picker-modal" isOpen={isOpen}>
        {!isCalendarDateRangePickerShow &&
          !isOtherFieldsShow &&
          !isDetailsConfirmationShow && (
            <div className="select-travel-type-container">
              <h2>Select travel type</h2>
              <div className="select-travel-type-button-container">
                {selectedTravelType === "Round Trip" ? (
                  <>
                    <CommonButton
                      width={9}
                      height={7}
                      primaryStyle
                      text="Round Trip"
                      onClick={handleChangeTravelType}
                    />
                  </>
                ) : (
                  <>
                    <CommonButton
                      width={9}
                      height={7}
                      whiteStyle
                      text="Round Trip"
                      onClick={handleChangeTravelType}
                    />
                  </>
                )}

                {selectedTravelType === "One-way - Drop" ? (
                  <>
                    <CommonButton
                      width={11}
                      height={7}
                      primaryStyle
                      text="One-way - Drop"
                      onClick={handleChangeTravelType}
                    />
                  </>
                ) : (
                  <>
                    <CommonButton
                      width={11}
                      height={7}
                      whiteStyle
                      text="One-way - Drop"
                      onClick={handleChangeTravelType}
                    />
                  </>
                )}
                {selectedTravelType === "One-way - Fetch" ? (
                  <>
                    <CommonButton
                      width={12}
                      height={7}
                      primaryStyle
                      text="One-way - Fetch"
                      onClick={handleChangeTravelType}
                    />
                  </>
                ) : (
                  <>
                    <CommonButton
                      width={12}
                      height={7}
                      whiteStyle
                      text="One-way - Fetch"
                      onClick={handleChangeTravelType}
                    />
                  </>
                )}
              </div>
              <div className="error-text-container">
                <p className="error-text">
                  {errorMessages[0]?.travelTypeError}
                </p>
              </div>
              <div className="footer-button-container">
                <CommonButton
                  width={9}
                  height={7}
                  whiteStyle
                  text="Back"
                  onClick={() => {
                    setSelectedTravelType("");
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0]?.travelTypeError;
                    setErrorMessages(updatedErrors);
                    setIsScheduleClick(false);
                  }}
                />
                <CommonButton
                  width={9}
                  height={7}
                  primaryStyle
                  text="Next"
                  onClick={() => {
                    let validationErrors: { [key: string]: string } = {};
                    if (!selectedTravelType) {
                      validationErrors.travelTypeError =
                        "Please select travel type.";
                    }

                    const errorArray = [validationErrors];

                    setErrorMessages(errorArray);
                    if (Object.keys(validationErrors).length === 0) {
                      setIsCalendarDateRangePickerShow(true);
                    }
                  }}
                />
              </div>
            </div>
          )}
        {isCalendarDateRangePickerShow && (
          <>
            <div className="calendar-date-range-picker-container">
              <DateRange
                onChange={(item: any) => {
                  const localStartDate = localStorage.getItem("startDate");
                  const localEndDate = localStorage.getItem("endDate");
                  const updatedErrors = { ...errorMessages };
                  delete updatedErrors[0]?.travelDateError;
                  setErrorMessages(updatedErrors);
                  if (
                    localStartDate !==
                      formatDateToYYYYMMDD(item.selection.startDate) &&
                    localEndDate !==
                      formatDateToYYYYMMDD(item.selection.endDate)
                  ) {
                    localStorage.setItem("startDate", item.selection.startDate);
                    localStorage.setItem("endDate", item.selection.endDate);
                    if (selectedTravelType === "Round Trip") {
                      setState([item.selection]);
                      setData({
                        travel_date: formatDateToYYYYMMDD(
                          item.selection.startDate
                        ),
                        return_date: formatDateToYYYYMMDD(
                          item.selection.endDate
                        ),
                      });
                    } else if (
                      selectedTravelType === "One-way - Drop" ||
                      selectedTravelType === "One-way - Fetch"
                    ) {
                      setData({
                        travel_date: formatDateToYYYYMMDD(
                          item.selection.startDate
                        ),
                        return_date: formatDateToYYYYMMDD(
                          item.selection.startDate
                        ),
                      });
                      setState([
                        {
                          startDate: item.selection.startDate,
                          endDate: item.selection.startDate,
                          key: "selection",
                        },
                      ]);
                    }

                    setAvailableTimes({
                      travelDateTimes: [],
                      returnDateTimes: [],
                    });
                    setUnavailableTimeInRange(null);
                  }
                }}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                direction="horizontal"
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                showPreview={selectedTravelType === "Round Trip" ? true : false}
                disabledDates={disableDates}
                rangeColors={["#060e57"]}
                minDate={today}
              />
              <div className="available-times-container">
                <h3>Available Times</h3>
                <div className="available-times-header-container">
                  <h4>Start time</h4>

                  {selectedTravelType === "Round Trip" ? (
                    <h4>End time</h4>
                  ) : (
                    <h4></h4>
                  )}
                </div>
                <div className="times-containers">
                  {data.travel_date && (
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
                                          key={convertTo12HourFormat(
                                            timeString
                                          )}
                                          width={9}
                                          height={7}
                                          primaryStyle
                                          text={convertTo12HourFormat(
                                            timeString
                                          )}
                                          onClick={(text: any) => {
                                            setSelectedStartTime(null);
                                            setSelectedTimes({
                                              ...selectedTimes,
                                              start: null,
                                            });
                                            setData({
                                              ...data,
                                              travel_time: null,
                                            });
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <CommonButton
                                          key={convertTo12HourFormat(
                                            timeString
                                          )}
                                          width={9}
                                          height={7}
                                          whiteStyle
                                          text={convertTo12HourFormat(
                                            timeString
                                          )}
                                          onClick={(text: any) => {
                                            setSelectedStartTime(text);
                                            setSelectedTimes({
                                              ...selectedTimes,
                                              start: text,
                                            });
                                            console.log(
                                              "not yet converted",
                                              text
                                            );
                                            console.log(
                                              "converted already",
                                              convertTo24HourFormat(text)
                                            );
                                            setData({
                                              ...data,
                                              travel_time:
                                                convertTo24HourFormat(text),
                                            });
                                            const updatedErrors = {
                                              ...errorMessages,
                                            };
                                            delete updatedErrors[0]
                                              ?.travelTimeError;
                                            setErrorMessages(updatedErrors);
                                          }}
                                        />
                                      </>
                                    )}
                                  </>
                                );
                              }
                            )}
                          </div>
                          {selectedTravelType === "Round Trip" ? (
                            <>
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
                                              key={convertTo12HourFormat(
                                                timeString
                                              )}
                                              width={9}
                                              height={7}
                                              primaryStyle
                                              text={convertTo12HourFormat(
                                                timeString
                                              )}
                                              onClick={(text: any) => {
                                                setSelectedEndTime(null);
                                                setSelectedTimes({
                                                  ...selectedTimes,
                                                  end: null,
                                                });
                                                setData({
                                                  ...data,
                                                  return_time: null,
                                                });
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <CommonButton
                                              key={convertTo12HourFormat(
                                                timeString
                                              )}
                                              width={9}
                                              height={7}
                                              whiteStyle
                                              text={convertTo12HourFormat(
                                                timeString
                                              )}
                                              onClick={(text: any) => {
                                                setSelectedEndTime(text);
                                                setSelectedTimes({
                                                  ...selectedTimes,
                                                  end: text,
                                                });
                                                setData({
                                                  ...data,
                                                  return_time:
                                                    convertTo24HourFormat(text),
                                                });
                                                const updatedErrors = {
                                                  ...errorMessages,
                                                };
                                                delete updatedErrors[0]
                                                  ?.travelTimeError;
                                                setErrorMessages(updatedErrors);
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
                          ) : (
                            <div className="autocompleteaddress-container">
                              <p className="strong">
                                Please input destination to fetch estimated
                                return date and time of the vehicle
                              </p>
                              <AutoCompleteAddressGoogle
                                travel_date={data.travel_date}
                                travel_time={data.travel_time}
                                setData={setData}
                                setAddressData={setAddressData}
                                category={selectedTravelType}
                                removeDestinationError={() =>
                                  // setErrorMessages((prev) => ({
                                  //   ...prev,
                                  //   destinationError: undefined,
                                  // }))
                                  console.log("ye")
                                }
                                className="googledestination"
                                setIsFromAutoComplete={setIsFromAutoComplete}
                              />
                              <p className="strong">
                                Estimated return date and time:{" "}
                              </p>
                              <p className={errorColor ? "error-text" : ""}>
                                {data.return_date &&
                                  formatDate(data.return_date)}
                                {data.return_time && (
                                  <>
                                    , {convertTo12HourFormat(data.return_time)}
                                  </>
                                )}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="error-text-container">
              <p className="error-text">{errorMessages[0]?.travelDateError}</p>
            </div>
            <div className="error-text-container">
              <p className="error-text">{errorMessages[0]?.travelTimeError}</p>
            </div>
            <div className="error-text-container">
              <p className="error-text">{errorMessages[0]?.destinationError}</p>
            </div>
            <div className="footer-button-container2">
              <CommonButton
                width={9}
                height={7}
                whiteStyle
                text="Back"
                onClick={() => {
                  setIsCalendarDateRangePickerShow(false);
                  setUnavailableTimeInRange(null);
                  setState([
                    {
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    },
                  ]);
                  setAvailableTimes({
                    travelDateTimes: [],
                    returnDateTimes: [],
                  });
                  setIsFromAutoComplete(false);
                  setSelectedTravelType("");
                  setData({
                    travel_date: null,
                    return_date: null,
                    travel_time: null,
                    return_time: null,
                  });
                  setErrorColor(false);
                }}
              />
              <CommonButton
                width={9}
                height={7}
                primaryStyle
                text="Next"
                onClick={() => {
                  console.log("data with destination", data);
                  let validationErrors: { [key: string]: string } = {};
                  if (!data.travel_date && !data.return_date) {
                    validationErrors.travelDateError =
                      "Please select travel date.";
                  } else {
                    if (!data.travel_time && !data.return_time) {
                      validationErrors.travelTimeError =
                        "Please select travel time";
                    } else {
                      if (selectedTravelType === "Round Trip") {
                        if (!data.travel_time) {
                          validationErrors.travelTimeError =
                            "Please select start time";
                        } else if (!data.return_time) {
                          validationErrors.travelTimeError =
                            "Please select end time";
                        }

                        const [travelHours, travelMinutes] = data.travel_time
                          .split(":")
                          .map(Number);
                        const [returnHours, returnMinutes] = data.return_time
                          .split(":")
                          .map(Number);

                        const travelTimeInMinutes =
                          travelHours * 60 + travelMinutes;
                        const returnTimeInMinutes =
                          returnHours * 60 + returnMinutes;

                        if (
                          data.travel_date === data.return_date &&
                          travelTimeInMinutes > returnTimeInMinutes
                        ) {
                          validationErrors.travelTimeError =
                            "Please check the start time, it may be after the end time";
                        }
                      } else {
                        if (!data.travel_time) {
                          validationErrors.travelTimeError =
                            "Please select start time";
                        } else if (
                          !addressData.destination &&
                          !addressData.distance
                        ) {
                          validationErrors.destinationError =
                            "Please input destination";
                        }
                      }
                    }
                  }

                  const errorArray = [validationErrors];

                  setErrorMessages(errorArray);
                  if (Object.keys(validationErrors).length === 0) {
                    if (
                      (selectedTravelType === "One-way - Drop" ||
                        selectedTravelType === "One-way - Fetch") &&
                      isFromAutoComplete &&
                      addressData.destination &&
                      addressData.distance
                    ) {
                      console.log("isFrom", data.travel_date, data.return_date);
                      checkScheduleConflictsForOneway(
                        data.travel_date,
                        data.travel_time,
                        data.return_date,
                        data.return_time,
                        selectedVehiclePlateNumber,
                        setIsLoading,
                        setErrorColor
                      );
                      if (errorColor) {
                        setAddressData((prevData: any) => ({
                          ...prevData,
                          destination: "",
                          distance: null,
                        }));
                        setErrorColor(true);
                      } else {
                        const button_action = "select_vehicle";
                        checkVehicleOnProcess(
                          data.travel_date,
                          data.travel_time,
                          data.return_date,
                          data.return_time,
                          selectedVehiclePlateNumber,
                          userName,
                          button_action,
                          setIsLoading,
                          setIsCalendarDateRangePickerShow,
                          setIsOtherFieldsShow
                        );
                      }
                    } else {
                      const button_action = "select_vehicle";

                      checkVehicleOnProcess(
                        data.travel_date,
                        data.travel_time,
                        data.return_date,
                        data.return_time,
                        selectedVehiclePlateNumber,
                        userName,
                        button_action,
                        setIsLoading,
                        setIsCalendarDateRangePickerShow,
                        setIsOtherFieldsShow
                      );
                    }
                  }

                  // console.log("dataaaaaa", data);
                }}
              />
            </div>
          </>
        )}
        {isOtherFieldsShow && !isCalendarDateRangePickerShow && (
          <>
            <div className="other-fields-container">
              {selectedTravelType === "Round Trip" && (
                <>
                  <div className="other-fields-child-one">
                    <strong>Input destination</strong>

                    <AutoCompleteAddressGoogle
                      travel_date={data.travel_date}
                      travel_time={data.travel_time}
                      setData={setData}
                      setAddressData={setAddressData}
                      category={selectedTravelType}
                      removeDestinationError={() =>
                        // setErrorMessages((prev) => ({
                        //   ...prev,
                        //   destinationError: undefined,
                        // }))
                        console.log("ye")
                      }
                      className="googledestination"
                      setIsFromAutoComplete={setIsFromAutoComplete}
                    />
                    <div className="error-text-container-absolute">
                      <p className="error-text">
                        {errorMessages[0]?.destinationError}
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="other-fields-child-two">
                <strong>Input purpose</strong>
                <div className="purpose-width-container">
                  <InputField
                    className="purpose-width"
                    icon={faClipboard}
                    value={data.purpose}
                    label="Purpose"
                    placeholder="Purpose"
                    onChange={(event) => {
                      setData((prevData: any) => ({
                        ...prevData,
                        purpose: event.target.value,
                      }));
                      if (event.target.value) {
                        const updatedErrors = { ...errorMessages };
                        delete updatedErrors[0]?.purposeError;
                        setErrorMessages(updatedErrors);
                      }
                    }}
                  />
                </div>
                <div className="error-text-container-absolute">
                  <p className="error-text">{errorMessages[0]?.purposeError}</p>
                </div>
              </div>
              <div className="other-fields-child-three">
                <strong>Input passenger's name(s)</strong>

                <div className="passenger-input-fieldss">
                  {generatePassengerInputs()}
                  <div className="error-text-container-absolute-passenger">
                    <p className="error-text">
                      {errorMessages[0]?.passengerNameError}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-button-container2">
              <CommonButton
                width={9}
                height={7}
                whiteStyle
                text="Back"
                onClick={() => {
                  const button_action = "deselect_vehicle";
                  checkVehicleOnProcess(
                    data.travel_date,
                    data.travel_time,
                    data.return_date,
                    data.return_time,
                    selectedVehiclePlateNumber,
                    userName,
                    button_action,
                    setIsLoading,
                    setIsCalendarDateRangePickerShow,
                    setIsOtherFieldsShow
                  );
                }}
              />
              <CommonButton
                width={9}
                height={7}
                primaryStyle
                text="Next"
                onClick={() => {
                  let validationErrors: { [key: string]: string } = {};
                  if (!addressData.destination && !addressData.distance) {
                    validationErrors.destinationError =
                      "Please input destination";
                  }
                  if (!data.purpose) {
                    validationErrors.purposeError = "Please input purpose";
                  }
                  if (!data.passenger_name || data.number_of_passenger === 0) {
                    validationErrors.passengerNameError =
                      "Please input at least one passenger";
                  }
                  const errorArray = [validationErrors];

                  setErrorMessages(errorArray);
                  if (Object.keys(validationErrors).length === 0) {
                    setIsOtherFieldsShow(false);
                    setIsDetailsConfirmationShow(true);
                  }
                  console.log("final data", data);
                  setData((prevData: any) => ({
                    ...prevData,
                    requester_name: userID,
                    office: office,
                    type: selectedTravelType,
                    role: role,
                    destination: addressData.destination,
                    distance: addressData.distance,
                    driver_name: selectedVehicleDriver,
                    vehicle_capacity: selectedVehicleCapacity,
                    vehicle: selectedVehiclePlateNumber,
                    merge_trip: false,
                  }));
                }}
              />
            </div>
          </>
        )}
        {isDetailsConfirmationShow && !isCalendarDateRangePickerShow && (
          <>
            <div className="confirm-details-container">
              <h3>Reservation details</h3>
              <p>Please confirm details before submitting. Thank you.</p>
              <div className="details-row">
                <div>
                  <strong>Requester's name</strong>
                  <p>
                    {firstName} {lastName}
                  </p>
                </div>
                <div>
                  <strong>Office</strong>
                  <p>{office}</p>
                </div>
              </div>
              <div className="details-row">
                <div>
                  <strong>Vehicle</strong>
                  <p>
                    {selectedVehiclePlateNumber} {selectedVehicleModel}
                  </p>
                </div>
                <div>
                  <strong>Travel type</strong>
                  <p>{selectedTravelType}</p>
                </div>
              </div>
              <div className="details-row">
                <div>
                  <strong>Travel date and time</strong>
                  <p>
                    {formatDate(data.travel_date)},{" "}
                    {convertTo12HourFormat(data.travel_time)}
                  </p>
                </div>
                <div>
                  <strong>Return date and time</strong>
                  <p>
                    {formatDate(data.return_date)},{" "}
                    {convertTo12HourFormat(data.return_time)}
                  </p>
                </div>
              </div>
              <div className="details-row">
                <div>
                  <strong>Destination</strong>
                  <p>{addressData.destination}</p>
                </div>
                <div>
                  <strong>Distance</strong>
                  <p>{addressData.distance} km</p>
                </div>
              </div>
              <div className="inline-row">
                <strong>Passenger's name(s)</strong>
                <p>{data.passenger_name?.join(", ")}</p>
              </div>
              <div className="inline-row">
                <strong>Purpose</strong>
                <p>{data.purpose}</p>
              </div>
            </div>
            <div className="footer-button-container2">
              <CommonButton
                width={9}
                height={7}
                whiteStyle
                text="Back"
                onClick={() => {
                  setIsOtherFieldsShow(true);
                  setIsDetailsConfirmationShow(false);
                }}
              />
              <CommonButton
                width={9}
                height={7}
                primaryStyle
                text="Submit"
                onClick={() => {
                  // setIsOtherFieldsShow(false);
                  // setIsDetailsConfirmationShow(true)
                  console.log("final data", data);
                  setLoadingBarProgress(20);
                  postRequestFormAPI(
                    data,
                    setIsConfirmationOpen,
                    setLoadingBarProgress
                  );
                }}
              />
            </div>
          </>
        )}
      </Modal>
      <Confirmation
        isOpen={isConfirmationOpen}
        header="Reservation Submitted!"
        content="We will send you a notification about your reservation ASAP."
        footer="Thank you!"
      />
    </>
  );
};

export default SchedulePicker;
