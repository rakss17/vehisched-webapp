import React, { useState, useEffect } from "react";
import "./dropdownmenu.css";

interface DropdownProps {
  onChange: (selectedOption: string) => void;
  selectedAccount?: { role: string };
}

const DropdownMenu: React.FC<DropdownProps> = ({
  onChange,
  selectedAccount,
}) => {
  const options = ["requester", "vip", "driver", "gate guard", "office staff"];

  // Initialize selectedOption based on the presence of selectedAccount
  const initialSelectedOption = selectedAccount
    ? selectedAccount.role
    : "------------Select------------";

  const [selectedOption, setSelectedOption] = useState<string>(
    initialSelectedOption
  );

  useEffect(() => {
    setSelectedOption(selectedAccount ? selectedAccount.role : "");
  }, [selectedAccount]);

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
