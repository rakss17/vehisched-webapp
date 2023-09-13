import React, { useState } from "react";
import Modal from "react-modal";
import "./addedit.css";
import { AddEditVehicleProps } from "../../../interfaces/interfaces";

const AddEditVehicle: React.FC<AddEditVehicleProps> = ({
  isOpen,
  onRequestClose,
  header,
  buttonText,
  onRequestAddEdit,
  plateNoProps,
  modelProps,
  seatingCapacityProps,
  typeProps,
  vipProps,
}) => {
  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };

  return (
    <Modal className="modal-add-edit2" isOpen={isOpen}>
      <h1>{header}</h1>
      <div>
        <div>
          <label>Plate No.: </label>
          <input {...plateNoProps} />
        </div>
        <div>
          <label>Model: </label>
          <input {...modelProps} />
        </div>
        <div>
          <label>Seating Capacity: </label>
          <input {...seatingCapacityProps} onKeyDown={handleKeyDown} />
        </div>
        <div>
          <label>Type: </label>
          <input {...typeProps} />
        </div>
        <div>
          <label>VIP: </label>
          <input {...vipProps} type="checkbox" />
        </div>
        <div>
          <button onClick={onRequestClose}>Cancel</button>
          <button onClick={onRequestAddEdit}>{buttonText}</button>
        </div>
      </div>
    </Modal>
  );
};
export default AddEditVehicle;
