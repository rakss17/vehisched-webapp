import { useState, useEffect, ChangeEvent } from "react";
import { RequesterTripMergingFormProps } from "../../interfaces/interfaces";
import "./requestertripmerging.css";
import Modal from "react-modal";
import InputField from "../inputfield/inputfield";
import {
  faUser,
  faUsers,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

const RequesterTripMergingForm: React.FC<RequesterTripMergingFormProps> = ({
  isOpen,
  onRequestClose,
  given_capacity,
}) => {
  const [numPassengers, setNumPassengers] = useState(0);
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [exceedsCapacity, setExceedsCapacity] = useState(false);
  const [data, setData] = useState<any>({
    number_of_passenger: null,
    passenger_name: "",
  });

  useEffect(() => {
    let updatedPassengerNames = [...data.passenger_name];
    if (numPassengers > data.passenger_name.length) {
      const additionalPassengers = new Array(
        numPassengers - data.passenger_name.length
      ).fill("");
      updatedPassengerNames =
        updatedPassengerNames.concat(additionalPassengers);
    } else if (numPassengers < data.passenger_name.length) {
      updatedPassengerNames = updatedPassengerNames.slice(0, numPassengers);
    }
    setData({
      ...data,
      passenger_name: updatedPassengerNames,
      number_of_passenger: numPassengers,
    });
  }, [numPassengers]);

  const handlePassengerChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.numberOfPassengersError;
      delete updatedErrors[0]?.all;
      setErrorMessages(updatedErrors);
    }
    const { value } = event.target;
    setNumPassengers(Number(value));

    if (Number(value) > given_capacity) {
      setExceedsCapacity(true);
    } else {
      setExceedsCapacity(false);
    }
  };

  const generatePassengerInputs = () => {
    const inputs = [];
    if (numPassengers <= given_capacity) {
      for (let i = 0; i < numPassengers; i++) {
        inputs.push(
          <div key={i} className="passenger-name-column">
            <InputField
              className="passenger_name_width"
              value={data.passenger_name[i]}
              key={i}
              icon={faUser}
              label={`Passenger ${i + 1}`}
              placeholder={`Passenger ${i + 1}`}
              onChange={(event) => {
                const newPassengerNames = [...data.passenger_name];
                newPassengerNames[i] = event.target.value;
                setData({ ...data, passenger_name: newPassengerNames });
                if (newPassengerNames[i]) {
                  const updatedErrors = { ...errorMessages };
                  delete updatedErrors[0]?.passengerNameError[i];
                  delete updatedErrors[0]?.all;
                  setErrorMessages(updatedErrors);
                }
              }}
            />
            <p className="set-trip-text-error">
              {errorMessages[0]?.passengerNameError[i]}
            </p>
          </div>
        );
      }
    }
    return inputs;
  };
  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };
  return (
    <Modal className="requester-trip-merging-form-modal" isOpen={isOpen}>
      <div className="requester-trip-merging-form-container">
        <h1>Trip Merging</h1>
        <div className="requester-trip-merging-form-input-passenger-number">
          <p className="requester-trip-merging-form-maximum-capacity-note">
            Vehicle maximum capacity: {given_capacity}
          </p>
          <InputField
            icon={faUsers}
            onKeyDown={handleKeyDown}
            label="No. of passengers"
            value={numPassengers}
            onChange={handlePassengerChange}
            type="number"
          />
          <p className="set-trip-text-error">
            {errorMessages[0]?.numberOfPassengersError}
          </p>

          {exceedsCapacity && (
            <p className="set-trip-text-error">
              Exceeds seating capacity of the vehicle
            </p>
          )}
        </div>
        <div className="requester-trip-merging-form-passengers-name-row">
          {generatePassengerInputs()}
        </div>
        <div className="requester-trip-merging-form-purpose-row">
          <InputField
            className="requesterr-trip-merging-form-purpose-width"
            icon={faClipboard}
            value={data.purpose}
            label="Purpose"
            placeholder="Purpose"
            onChange={(event) => {
              setData({ ...data, purpose: event.target.value });
              if (event.target.value) {
                const updatedErrors = { ...errorMessages };
                delete updatedErrors[0]?.purposeError;
                delete updatedErrors[0]?.all;
                setErrorMessages(updatedErrors);
              }
            }}
          />
          <p className="set-trip-text-error">
            {errorMessages[0]?.purposeError}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default RequesterTripMergingForm;
