import React, { useState, useEffect } from "react";
import "./dropdownmenu.css";

interface DropdownProps {
  onChange: (selectedOption: string) => void;
  selectedAccount?: { role: string; office: string };
  options: string[];
  selectedKey: "role" | "office" | "assigned_to";
  selectedVehicle?: { assigned_to: string };
}

const DropdownMenu: React.FC<DropdownProps> = ({
  onChange,
  selectedAccount,
  options,
  selectedKey,
  selectedVehicle,
}) => {
  const initialSelectedOption =
    selectedKey === "assigned_to"
      ? selectedVehicle
        ? selectedVehicle[selectedKey]
        : "------------Select------------"
      : selectedAccount
      ? selectedAccount[selectedKey]
      : "------------Select------------";

  const [selectedOption, setSelectedOption] = useState<string>(
    initialSelectedOption
  );

  useEffect(() => {
    if (selectedKey === "assigned_to") {
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
