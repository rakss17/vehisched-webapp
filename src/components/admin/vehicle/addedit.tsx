import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./addedit.css";
import { AddEditVehicleProps } from "../../../interfaces/interfaces";
import { fetchDriversForAssignmentAPI, fetchVIPAPI } from "../../api/api";
import DropdownMenu from "../dropdownmenu";

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
  uploadImageProps,
  vehicleErrorMessages = [],
  vipDropdownProps,
  isVipProps,
  driverDropdownProps,
}) => {
  const [vipData, setVIPData] = useState<any[]>([]);
  const [driversData, setDriversData] = useState<any[]>([]);

  useEffect(() => {
    fetchVIPAPI(setVIPData);
  }, []);

  useEffect(() => {
    fetchDriversForAssignmentAPI(setDriversData);
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
    if (vehicleErrorMessages.length > 0) {
      return 65 + vehicleErrorMessages.length * 5 + "vh";
    } else {
      return "68vh";
    }
  };

  const calculateMarginTop = () => {
    const defaultMarginTop = "15vh";

    if (vehicleErrorMessages.length >= 2) {
      return "8vh";
    } else {
      return defaultMarginTop;
    }
  };

  return (
    <Modal
      className="modal-add-edit2"
      isOpen={isOpen}
      style={calculateModalStyles()}
    >
      <h1>{header}</h1>
      <div>
        {vehicleErrorMessages.length > 0 && (
          <div className="v-error-messages">
            <ul>
              {vehicleErrorMessages.map((vehicleErrorMessages, index) => (
                <ul key={index}>{vehicleErrorMessages}</ul>
              ))}
            </ul>
          </div>
        )}
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
          <label>Driver: </label>
          <DropdownMenu
            options={driversData}
            selectedKey="driver_assigned_to"
            {...driverDropdownProps}
          />
        </div>
        <div>
          <label>VIP: </label>
          <input {...vipProps} />
        </div>

        {isVipProps && (
          <div>
            <label>Assign to: </label>
            <DropdownMenu
              options={vipData}
              selectedKey="vip_assigned_to"
              {...vipDropdownProps}
            />
          </div>
        )}

        <div>
          <label>Upload Image: </label>
          <input {...uploadImageProps} />
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
