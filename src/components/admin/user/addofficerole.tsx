import React, { useState } from "react";
import Modal from "react-modal";
import "./addofficerole.css";
import DropdownMenu from "../dropdownmenu";
import { ModalProps } from "../../../interfaces/interfaces";
import CommonButton from "../../button/commonbutton";

const AddOfficeRole: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,

}) => {
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

  return (
    <Modal
      className="modal-add-office-role"
      isOpen={isOpen}
    >
      <h1>Add Office/Role</h1>
      <div className="office-input">
        <p>Office</p>
        <div>
            <input placeholder="Office"/>
            <p> - </p>
            <input placeholder="Department"/>
        </div>
        <div>
            <CommonButton width={9} height={6} primaryStyle text="+ Add Office"/>
        </div>
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
  );
};
export default AddOfficeRole;
