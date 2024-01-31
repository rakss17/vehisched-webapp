import "./initialformvip.css";
import React, { useState } from "react";
import Modal from "react-modal";
import AutoCompleteAddressGoogle from "../addressinput/googleaddressinput";
import CalendarInput from "../calendarinput/calendarinput";
import TimeInput from "../timeinput/timeinput";
import { format } from "date-fns";
import CommonButton from "../button/commonbutton";
import { useNavigate } from "react-router-dom";
import { InitialFormVipProps } from "../../interfaces/interfaces";

const InitialFormVip: React.FC<InitialFormVipProps> = ({
  isOpen,
  onRequestClose,
  plateNumber,
  vehicleName,
  capacity,
}) => {
  const [isOneWayClick, setIsOneWayClick] = useState(false);
  const [isFetchSelect, setIsFetchSelect] = useState(false);
  const [isTravelDateSelected, setIsTravelDateSelected] = useState(true);
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [selectedTripButton, setSelectedTripButton] =
    useState<string>("Round Trip");

  const [data, setData] = useState<any>({
    travel_date: null,
    travel_time: null,
    return_date: null,
    return_time: null,
    category: "Round Trip",
  });
  const [addressData, setAddressData] = useState<any>({
    destination: "",
    distance: null,
  });
  const navigate = useNavigate();
  const handleSetTripModal = () => {
    let validationErrors: { [key: string]: string } = {};
    if (data.category === "Round Trip") {
      const allFieldsBlank =
        !data.travel_date &&
        !data.travel_time &&
        !data.return_date &&
        !data.return_time &&
        !data.capacity &&
        !addressData.destination;

      if (allFieldsBlank) {
        validationErrors.all = "Required all fields!";
      } else {
        if (!data.travel_date) {
          validationErrors.travelDateError = "This field is required";
        }
        if (!data.travel_time) {
          validationErrors.travelTimeError = "This field is required";
        }

        if (!data.return_date) {
          validationErrors.returnDateError = "This field is required";
        }

        if (!data.return_time) {
          validationErrors.returnTimeError = "This field is required";
        }

        if (!addressData.destination) {
          validationErrors.destinationError = "This field is required";
        }
      }
    } else if (
      data.category === "One-way" ||
      data.category === "One-way - Fetch" ||
      data.category === "One-way - Drop"
    ) {
      const allFieldsBlank =
        !data.travel_date &&
        !data.travel_time &&
        !data.capacity &&
        data.category !== "One-way - Fetch" &&
        data.category !== "One-way - Drop";
      !data.category && !addressData.destination;

      if (allFieldsBlank) {
        validationErrors.all = "Required all fields!";
      } else {
        if (!data.travel_date) {
          validationErrors.travelDateOnewayError = "This field is required";
        }
        if (!data.travel_time) {
          validationErrors.travelTimeOnewayError = "This field is required";
        }

        if (
          data.category !== "One-way - Fetch" &&
          data.category !== "One-way - Drop"
        ) {
          validationErrors.categoryError = "This field is required";
        }

        if (!addressData.destination) {
          validationErrors.destinationError = "This field is required";
        }
      }
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/RequestForm", {
        state: { plateNumber, vehicleName, capacity, data, addressData },
      });
    }
  };
  const checkAutocompleteDisability = () => {
    if (data.travel_date !== null && data.travel_time !== null) {
      setIsTravelDateSelected(false);
    }
  };
  const handleButtonClickTrip = (button: string) => {
    const updatedErrors = { ...errorMessages };

    switch (button) {
      case "Round Trip":
        setIsOneWayClick(false);
        delete updatedErrors[0];
        setErrorMessages(updatedErrors);
        setData({
          travel_date: null,
          travel_time: null,
          return_date: null,
          return_time: null,
          category: "",
        });
        setAddressData({
          destination: "",
          distance: null,
        });
        break;

      case "One-way":
        setIsOneWayClick(true);
        setIsTravelDateSelected(true);
        delete updatedErrors[0];
        setErrorMessages(updatedErrors);
        setData({
          travel_date: null,
          travel_time: null,
          return_date: null,
          return_time: null,
          category: "",
        });
        setAddressData({
          destination: "",
          distance: null,
        });
        break;

      default:
        break;
    }
    setData({ ...data, category: button });
    setSelectedTripButton(button);
  };
  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, travel_date: formattedDate });
    if (data.category === "Round Trip") {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelDateError;
      setErrorMessages(updatedErrors);
    } else if (
      data.category === "One-way" ||
      data.category === "One-way - Fetch" ||
      data.category === "One-way - Drop"
    ) {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelDateOnewayError;
      setErrorMessages(updatedErrors);
    }

    checkAutocompleteDisability();
  };
  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setData({ ...data, return_date: formattedDate });
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.returnDateError;
    setErrorMessages(updatedErrors);
  };

  const handleStartTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, travel_time: time });
      if (data.category === "Round Trip") {
        const updatedErrors = { ...errorMessages };
        delete updatedErrors[0]?.travelTimeError;
        setErrorMessages(updatedErrors);
      } else if (
        data.category === "One-way" ||
        data.category === "One-way - Fetch" ||
        data.category === "One-way - Drop"
      ) {
        const updatedErrors = { ...errorMessages };
        delete updatedErrors[0]?.travelTimeOnewayError;
        setErrorMessages(updatedErrors);
      }
      checkAutocompleteDisability();
    } else {
      console.log("No time selected.");
    }
  };
  const handleEndTimeChange = (time: string | null) => {
    if (time) {
      setData({ ...data, return_time: time });
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.returnTimeError;
      setErrorMessages(updatedErrors);
    } else {
      console.log("No time selected.");
    }
  };

  const removeDestinationError = () => {
    const updatedErrors = [...errorMessages];
    updatedErrors[0] = { ...updatedErrors[0], destinationError: undefined };
    setErrorMessages(updatedErrors);
  };
  return (
    <Modal className="initial-form-vip-modal" isOpen={isOpen}>
      <div className="modal-set-trip">
        <div className="modal-set-trip-body">
          <p className="set-trip-text-error">{errorMessages[0]?.all}</p>
          <div className="trip-category">
            <p>Category: </p>
            <div>
              <button
                onClick={() => handleButtonClickTrip("Round Trip")}
                className={selectedTripButton === "Round Trip" ? "active" : ""}
              >
                Round Trip
              </button>
              <button
                onClick={() => handleButtonClickTrip("One-way")}
                className={selectedTripButton === "One-way" ? "active" : ""}
              >
                One-way
              </button>
            </div>
          </div>
          {isOneWayClick && (
            <>
              <div className="one-way-sub-category">
                <p>Type: </p>
                <div>
                  <select
                    value={data.sub_category}
                    onChange={(event) => {
                      const selectedValue = event.target.value;

                      setData((prevData: any) => ({
                        ...prevData,
                        category:
                          selectedValue === "Drop"
                            ? "One-way - Drop"
                            : selectedValue === "Fetch"
                            ? "One-way - Fetch"
                            : "One-way",
                      }));
                      if (selectedValue === "Fetch") {
                        setIsFetchSelect(true);
                        const updatedErrors = { ...errorMessages };
                        delete updatedErrors[0]?.categoryError;
                        setErrorMessages(updatedErrors);
                      } else if (selectedValue === "Drop") {
                        setIsFetchSelect(false);
                        const updatedErrors = { ...errorMessages };
                        delete updatedErrors[0]?.categoryError;
                        setErrorMessages(updatedErrors);
                      } else {
                        setIsFetchSelect(false);
                      }
                    }}
                  >
                    <option>--------- Select Type --------</option>
                    <option value="Drop">Drop</option>
                    <option value="Fetch">Fetch</option>
                  </select>
                  <p className="set-trip-text-error">
                    {errorMessages[0]?.categoryError}
                  </p>
                </div>
              </div>
            </>
          )}
          <div className="trip-destination">
            {!isFetchSelect ? <p>Destination: </p> : <p>Your Location: </p>}

            <div className="trip-destination-autocomplete-oneway">
              <AutoCompleteAddressGoogle
                travel_date={data.travel_date}
                travel_time={data.travel_time}
                setData={setData}
                setAddressData={setAddressData}
                category={data.category}
                removeDestinationError={removeDestinationError}
              />

              {isTravelDateSelected ? (
                <p>Select travel date and time first</p>
              ) : (
                <p>{errorMessages[0]?.destinationError}</p>
              )}
            </div>
          </div>

          {selectedTripButton === "Round Trip" ? (
            <div className="date-from-roundtrip">
              {!isOneWayClick ? (
                <p>From: </p>
              ) : (
                <p className="travel-datee">Travel Date: </p>
              )}
              <div>
                <div className="separate-date">
                  <CalendarInput
                    selectedDate={
                      data.travel_date ? new Date(data.travel_date) : null
                    }
                    onChange={handleStartDateChange}
                    disableDaysBefore={3}
                  />
                  <p className="set-trip-text-error">
                    {errorMessages[0]?.travelDateError}
                  </p>
                </div>

                <div className="separate-time">
                  <TimeInput
                    onChange={handleStartTimeChange}
                    selectedDate={data.travel_date}
                    handleDateChange={handleStartDateChange}
                  />
                  <p className="set-trip-text-error">
                    {errorMessages[0]?.travelTimeError}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="date-from-oneway">
              {!isOneWayClick ? (
                <p>From: </p>
              ) : (
                <p className="travel-datee">Travel Date: </p>
              )}
              <div>
                <div className="separate-date">
                  <CalendarInput
                    selectedDate={
                      data.travel_date ? new Date(data.travel_date) : null
                    }
                    onChange={handleStartDateChange}
                    disableDaysBefore={3}
                  />
                  <p className="set-trip-text-error">
                    {errorMessages[0]?.travelDateOnewayError}
                  </p>
                </div>

                <div className="separate-time">
                  <TimeInput
                    onChange={handleStartTimeChange}
                    selectedDate={data.travel_date}
                    handleDateChange={handleStartDateChange}
                  />
                  <p className="set-trip-text-error">
                    {errorMessages[0]?.travelTimeOnewayError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isOneWayClick && (
            <div className="date-to">
              <p>To: </p>
              <div>
                <div className="separate-date">
                  <CalendarInput
                    selectedDate={
                      data.return_date ? new Date(data.return_date) : null
                    }
                    onChange={handleEndDateChange}
                    disableDaysBefore={3}
                  />
                  <p className="set-trip-text-error">
                    {errorMessages[0]?.returnDateError}
                  </p>
                </div>

                <div className="separate-time">
                  <TimeInput
                    onChange={handleEndTimeChange}
                    selectedDate={data.return_date}
                    handleDateChange={handleEndDateChange}
                  />
                  <p className="set-trip-text-error">
                    {errorMessages[0]?.returnTimeError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="modal-button-container">
            <CommonButton onClick={onRequestClose} text="Back" secondaryStyle />
            <CommonButton
              onClick={handleSetTripModal}
              text="Next"
              primaryStyle
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InitialFormVip;
