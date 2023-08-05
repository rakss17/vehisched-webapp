import React, { useState } from "react";
import Modal from "react-modal";
import "./addedit.css";
import DropdownMenu from "../dropdownmenu";

interface AddEditProps {
  isOpen: boolean;
  onRequestClose: () => void;
  header: string;
  buttonText: string;
}
const AddEdit: React.FC<AddEditProps> = ({
  isOpen,
  onRequestClose,
  header,
  buttonText,
}) => {
  const handleDropdownChange = (selectedOption: string) => {
    console.log("Selected option:", selectedOption);
  };

  return (
    <Modal className="modal-add-edit" isOpen={isOpen}>
      <h1>{header}</h1>
      <div>
        <div>
          <label>Last Name: </label>
          <input></input>
        </div>
        <div>
          <label>First Name: </label>
          <input></input>
        </div>
        <div>
          <label>MI: </label>
          <input></input>
        </div>
        <div>
          <label>Contact Number: </label>
          <input></input>
        </div>
        <div>
          <label>Role: </label>
          <DropdownMenu onChange={handleDropdownChange} />
        </div>
        <div>
          <button onClick={onRequestClose}>Cancel</button>
          <button>{buttonText}</button>
        </div>
      </div>
    </Modal>
  );
};
export default AddEdit;
