import React, { useState } from "react";
import Modal from "react-modal";
import "./addofficerole.css";
import { ModalProps } from "../../../interfaces/interfaces";
import CommonButton from "../../button/commonbutton";
import { addOffice } from "../../api/api";
import LoadingBar from "react-top-loading-bar";
import Confirmation from "../../confirmation/confirmation";
import { ToastContainer } from "react-toastify";

const AddOfficeRole: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [name, setName] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleAddOffice = () => {
    addOffice(name, setIsConfirmationOpen, setLoadingBarProgress);
  };

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <ToastContainer />
      <Modal className="modal-add-office-role" isOpen={isOpen}>
        <h1>Add Office/Role</h1>
        <div className="office-input">
          <p>Office</p>
          <div>
            <input
              onChange={(event) => {
                const office = event.target.value;
                const department = name.split(" - ")[1] || "";
                setName(`${office} - ${department}`);
              }}
              value={name.split(" - ")[0] || ""}
              placeholder="Office"
            />
            <p> - </p>
            <input
              onChange={(event) => {
                const department = event.target.value;
                const office = name.split(" - ")[0] || "";
                setName(`${office} - ${department}`);
              }}
              value={name.split(" - ")[1] || ""}
              placeholder="Department"
            />
          </div>
          <div>
            <CommonButton
              onClick={handleAddOffice}
              primaryStyle
              text="+ Add Office"
            />
          </div>
        </div>
        <div className="close-button">
          <CommonButton
            onClick={onRequestClose}
            secondaryStyle
            text="Close"
          />
        </div>
        {/* <div>
        {errorMessages && errorMessages.length > 0 && (
          <div className="error-messages">
            <ul>
              {errorMessages.map((errorMessage, index) => (
                <ul key={index}>{errorMessage}</ul>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label>Email Address: </label>
          <input {...emailProps} />
        </div>
        <div>
          <label>Username: </label>
          <input {...usernameProps} />
        </div>
        <div>
          <label>Last Name: </label>
          <input {...lastNameProps} />
        </div>
        <div>
          <label>First Name: </label>
          <input {...firstNameProps} />
        </div>
        <div>
          <label>Middle Name: </label>
          <input {...middleNameProps} />
        </div>
        <div>
          <label>Mobile Number: </label>
          <input {...contactNumberProps} onKeyDown={handleKeyDown} />
        </div>
        <div>
          <label>Role: </label>
          <DropdownMenu {...roleDropdownProps} />
        </div>
        <div>
          <button onClick={onRequestClose}>Cancel</button>
          <button onClick={onRequestAddEdit}>{buttonText}</button>
        </div>
      </div> */}
      </Modal>
      <Confirmation isOpen={isConfirmationOpen} header="Office Added!" />
    </>
  );
};
export default AddOfficeRole;
