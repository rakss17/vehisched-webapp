import React, { useState } from "react";
import Modal from "react-modal";
import "./addedit.css";
import DropdownMenu from "../dropdownmenu";

interface AddEditProps {
  isOpen: boolean;
  onRequestClose: () => void;
  header: string;
  buttonText: string;
  onRequestAddEdit: () => void;
}
const AddEdit: React.FC<AddEditProps> = ({
  isOpen,
  onRequestClose,
  header,
  buttonText,
  onRequestAddEdit,
}) => {
  const handleDropdownChange = (selectedOption: string) => {
    console.log("Selected option:", selectedOption);
  };
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
          <input type="number" onKeyDown={handleKeyDown}></input>
        </div>
        <div>
          <label>Role: </label>
          <DropdownMenu onChange={handleDropdownChange} />
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
