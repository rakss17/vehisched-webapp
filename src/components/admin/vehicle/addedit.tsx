import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./addedit.css";
import { AddEditVehicleProps } from "../../../interfaces/interfaces";
import { fetchDriversForAssignmentAPI, fetchVIPAPI } from "../../api/api";
import DropdownMenu from "../dropdownmenu";
import CommonButton from "../../button/commonbutton";

const AddEditVehicle: React.FC<AddEditVehicleProps> = ({
  isOpen,
  onRequestClose,
  header,
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
  buttonText,
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
      <div className="content2">
        {vehicleErrorMessages.length > 0 && (
          <div className="v-error-messages">
            <ul>
              {vehicleErrorMessages.map((vehicleErrorMessages, index) => (
                <ul key={index}>{vehicleErrorMessages}</ul>
              ))}
            </ul>
          </div>
        )}
        <div className="addvehicle-left-right">
          <div className="addvehicle-left">
            <div className="row2">
              <label>Plate No.: </label>
              <input {...plateNoProps} />
            </div>
            <div className="row2">
              <label>Model: </label>
              <input {...modelProps} />
            </div>
            <div className="row2">
              <label>Seating Capacity: </label>
              <input {...seatingCapacityProps} onKeyDown={handleKeyDown} />
            </div>
            <div className="vip">
              <label>VIP: </label>
              <input {...vipProps} />
            </div>
          </div>
          <div className="addvehicle-right">
            <div className="row2">
              <label>Type: </label>
              <input {...typeProps} />
            </div>
            <div className="row2">
              <label>Driver: </label>
              <DropdownMenu
                options={driversData}
                selectedKey="driver_assigned_to"
                {...driverDropdownProps}
              />
            </div>
            <div className="row2">
              <label>Upload Image: </label>
              <input {...uploadImageProps} />
            </div>
            <div className="vip2">
              <label>VIP: </label>
              <input {...vipProps} />
            </div>
            {isVipProps && (
              <div className="row2">
                <label>Assign to: </label>
                <DropdownMenu
                  options={vipData}
                  selectedKey="vip_assigned_to"
                  {...vipDropdownProps}
                />
              </div>
            )}
          </div>
        </div>

        <div className="addvehicle-btns">
          <CommonButton onClick={onRequestClose} secondaryStyle text="Cancel" />
          <CommonButton
            onClick={onRequestAddEdit}
            primaryStyle
            text={buttonText}
          />
        </div>
      </div>
    </Modal>
  );
};
export default AddEditVehicle;
