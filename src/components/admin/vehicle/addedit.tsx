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
const AddEditVehicle: React.FC<AddEditProps> = ({
  isOpen,
  onRequestClose,
  header,
  buttonText,
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
          <label>Plate No.: </label>
          <input></input>
        </div>
        <div>
          <label>Model: </label>
          <input></input>
        </div>
        <div>
          <label>Seating Capacity: </label>
          <input type="number" onKeyDown={handleKeyDown}></input>
        </div>
        <div>
          <label>Type: </label>
          <input></input>
        </div>
        <div>
          <label>VIP: </label>
          <input type="checkbox"></input>
        </div>
        <div>
          <button onClick={onRequestClose}>Cancel</button>
          <button>{buttonText}</button>
        </div>
      </div>
    </Modal>
  );
};
export default AddEditVehicle;
