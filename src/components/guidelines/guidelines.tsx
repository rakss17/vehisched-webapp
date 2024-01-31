import { useState } from "react";
import "./guidelines.css";

const Guidelines = ({
  guidelinescloseModal,
}: {
  guidelinescloseModal: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowAlert(false);
  };

  const handleNextClick = () => {
    localStorage.setItem("guidelines", `${isChecked}`);
    if (!isChecked) {
      setShowAlert(true);
    } else {
      guidelinescloseModal();
    }
  };

  return (
    <div className="modal-guidelines">
      <h2>Reservation Guidelines</h2>

      <div className="modal-content">
        <h4>Reservation Eligibility for All Stakeholders:</h4>
        <p>
          All stakeholders, including students, faculty, and staff, have the
          opportunity to reserve vehicles for trips, provided that the trip’s
          purpose is official and aligns with the institution’s policies.
        </p>

        <h4>Advance Reservation and Spontaneous Trips:</h4>
        <p>
          Reservations should be made with a minimum of three day’s notice
          before the planned trip. However, the possibility of spontaneous trips
          may be considered, contingent on their necessity, urgency and
          significance.
        </p>

        <h4>Trip Cancellation Protocol:</h4>
        <p>
          In the event of trip cancellations, it is imperative promptly report
          them to enable other requestors to secure reservations.
        </p>

        <h4>Responsibility for Fuel and Travel Documents:</h4>
        <p>
          For trips that extend beyond a 50-kilometer destination, the requestor
          assumes responsibility for providing fuel. Furthermore, the requestor
          is tasked with overseeing the processing of travel documents for the
          driver, including the travel order and travel itinerary.
        </p>

        <h4>Enforcement of the “No Travel Order, No Travel” policy:</h4>
        <p>
          A stringent policy is in place for journeys surpassing a 50-kilometer
          distance mandating the presence of a travel order. This policy is
          designated to ensure adherence to essential documentation and
          authorization procedures.
        </p>

        <h4>Mandatory Seatbelt Compliance:</h4>
        <p>
          Ensuring the safety of all vehicle occupants, it is mandatory for each
          passenger to fasten their seatbelt while the vehicle is in motion, in
          compliance with safety and regulations. The driver bears the
          responsibility of upholding this rule, not only to protect all
          passengers on board but also to prevent potential violations that
          might result in penalties under statutory and regulatory laws.
        </p>

        <h4>Courtesy towards Designated Drivers:</h4>
        <p>
          Passengers are expected to display courtesy and respect towards the
          designated driver who is responsible for ensuring a safety journey.
          Passengers should follow their instructions and refrain from any
          actions that could distract or interfere with the driver’s focus on
          the road.
        </p>

        <h4>Completion of Trip Ticket Information:</h4>
        <p>
          Passengers are required to provide essential information on the trip
          ticket. This record is essential for monitoring vehicle usage and
          maintaining accountability throughout the trip.
        </p>
      </div>

      <div className="guidelines-footer">
        <div className="validation">
          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            &nbsp;I agree with the Vehicle Reservation Guidelines
          </label>
          {showAlert && (
            <p className="alert-text">
              Please agree to the guidelines before proceeding.
            </p>
          )}
        </div>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Guidelines;
