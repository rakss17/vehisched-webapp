import React, { useState } from "react";
import Modal from "react-modal";
import "./addedit.css";
import DropdownMenu from "../dropdownmenu";
import { AddEditProps } from "../../../interfaces/interfaces";

const AddEdit: React.FC<AddEditProps> = ({
  isOpen,
  onRequestClose,
  header,
  buttonText,
  onRequestAddEdit,
  lastNameProps,
  firstNameProps,
  middleNameProps,
  emailProps,
  usernameProps,
  contactNumberProps,
  roleDropdownProps,
}) => {
  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };

  return (
    <Modal className="modal-add-edit" isOpen={isOpen}>
      <h1>{header}</h1>
      <div>
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
      </div>
    </Modal>
  );
};
export default AddEdit;
