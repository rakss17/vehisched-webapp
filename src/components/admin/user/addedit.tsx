import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./addedit.css";
import DropdownMenu from "../dropdownmenu";
import { AddEditProps } from "../../../interfaces/interfaces";
import { fetchOfficeAPI } from "../../api/api";
import CommonButton from "../../button/commonbutton";

const AddEdit: React.FC<AddEditProps> = ({
  isOpen,
  onRequestClose,
  header,
  onRequestAddEdit,
  lastNameProps,
  firstNameProps,
  middleNameProps,
  emailProps,
  usernameProps,
  contactNumberProps,
  roleDropdownProps,
  officeDropdownProps,
  errorMessages = [],
}) => {
  const [officeData, setOfficeData] = useState<any[]>([]);

  useEffect(() => {
    fetchOfficeAPI(setOfficeData);
  }, []);
  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (key !== "Backspace" && key !== "Tab" && isNaN(key)) {
      event.preventDefault();
    }
  };

  const calculateModalStyles = () => {
    const modalStyles = {
      content: {
        height: calculateModalHeight(),
        marginTop: calculateMarginTop(),
      },
    };
    return modalStyles;
  };

  const calculateModalHeight = () => {
    if (errorMessages.length > 0) {
      return 73 + errorMessages.length * 5 + "vh";
    } else {
      return "73vh";
    }
  };

  const calculateMarginTop = () => {
    const defaultMarginTop = "15vh";

    if (errorMessages.length >= 2) {
      return "5vh";
    } else {
      return defaultMarginTop;
    }
  };

  return (
    <Modal
      className="modal-add-edit"
      isOpen={isOpen}
      style={calculateModalStyles()}
    >
      <h1>{header}</h1>
      <div className="content">
        {errorMessages && errorMessages.length > 0 && (
          <div className="error-messages">
            <ul>
              {errorMessages.map((errorMessage, index) => (
                <ul key={index}>{errorMessage}</ul>
              ))}
            </ul>
          </div>
        )}
        <div className="left-right">
          <div className="right">
            <div>
              <div className="row">
                <label>Email Address: </label>
                <input {...emailProps} />
              </div>
              <div className="row">
                <label>Username: </label>
                <input {...usernameProps} />
              </div>
            </div>
            <div>
              <div className="row">
                <label>Last Name: </label>
                <input {...lastNameProps} />
              </div>
              <div className="row">
                <label>First Name: </label>
                <input {...firstNameProps} />
              </div>
            </div>
          </div>

          <div className="left">
            <div>
              <div className="row">
                <label>Middle Name: </label>
                <input {...middleNameProps} />
              </div>
              <div className="row">
                <label>Mobile Number: </label>
                <input {...contactNumberProps} onKeyDown={handleKeyDown} />
              </div>
            </div>
            <div>
              <div className="row">
                <label>Office: </label>
                <DropdownMenu
                  options={officeData}
                  selectedKey="office"
                  {...officeDropdownProps}
                />
              </div>
              <div className="row">
                <label>Role: </label>
                <DropdownMenu
                  options={[
                    "requester",
                    "vip",
                    "driver",
                    "gate guard",
                    "office staff",
                  ]}
                  selectedKey="role"
                  {...roleDropdownProps}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="btns">
          <CommonButton onClick={onRequestClose} secondaryStyle text="Close" />
          <CommonButton
            onClick={onRequestAddEdit}
            primaryStyle
            text="+ Add User"
          />
        </div>
      </div>
    </Modal>
  );
};
export default AddEdit;
