import React, { useState } from "react";
import Modal from "react-modal";
import "./addofficerole.css";
import DropdownMenu from "../dropdownmenu";
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

  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };

  //   const calculateModalStyles = () => {
  //     const modalStyles = {
  //       content: {
  //         height: calculateModalHeight(),
  //         marginTop: calculateMarginTop(),
  //       },
  //     };
  //     return modalStyles;
  //   };

  //   const calculateModalHeight = () => {
  //     if (errorMessages.length > 0) {
  //       return 73 + errorMessages.length * 5 + "vh";
  //     } else {
  //       return "73vh";
  //     }
  //   };

  //   const calculateMarginTop = () => {
  //     const defaultMarginTop = "15vh";

  //     if (errorMessages.length >= 2) {
  //       return "5vh";
  //     } else {
  //       return defaultMarginTop;
  //     }
  //   };

  const handleAddOffice = () => {
    addOffice(name, setIsConfirmationOpen, setLoadingBarProgress);
    console.log(name);
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
              width={9}
              height={6}
              primaryStyle
              text="+ Add Office"
            />
          </div>
        </div>
        <div className="close-button">
          <CommonButton
            onClick={onRequestClose}
            width={6}
            height={6}
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
