import React, { useState, useEffect } from "react";
import "./dropdownmenu.css";

interface DropdownProps {
  onChange: (selectedOption: string) => void;
  selectedAccount?: { role: string; office: string };
  options: string[];
  selectedKey: "role" | "office" | "vip_assigned_to" | "driver_assigned_to";
  selectedVehicle?: { vip_assigned_to: string; driver_assigned_to: string };
}

const DropdownMenu: React.FC<DropdownProps> = ({
  onChange,
  selectedAccount,
  options,
  selectedKey,
  selectedVehicle,
}) => {
  let initialSelectedOption = "------------Select------------";

  if (selectedKey === "vip_assigned_to" && selectedVehicle) {
    initialSelectedOption = selectedVehicle.vip_assigned_to;
  } else if (selectedKey === "driver_assigned_to" && selectedVehicle) {
    initialSelectedOption = selectedVehicle.driver_assigned_to;
  } else if (
    selectedAccount &&
    (selectedKey === "role" || selectedKey === "office")
  ) {
    initialSelectedOption = selectedAccount[selectedKey];
  }

  const [selectedOption, setSelectedOption] = useState<string>(
    initialSelectedOption
  );

  useEffect(() => {
    if (selectedKey === "vip_assigned_to") {
      setSelectedOption(selectedVehicle ? selectedVehicle[selectedKey] : "");
    } else if (selectedKey === "driver_assigned_to") {
      setSelectedOption(selectedVehicle ? selectedVehicle[selectedKey] : "");
    } else {
      setSelectedOption(selectedAccount ? selectedAccount[selectedKey] : "");
    }
  }, [selectedAccount, selectedVehicle, selectedKey]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    onChange(newOption);
  };

  return (
    <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
      <option value="">------------Select------------</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
