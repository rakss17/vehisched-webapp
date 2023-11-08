import React, { useState, useEffect } from "react";
import "./dropdownmenu.css";

interface DropdownProps {
  onChange: (selectedOption: string) => void;
  selectedAccount?: { role: string; office: string };
  options: string[];
  selectedKey: "role" | "office";
}

const DropdownMenu: React.FC<DropdownProps> = ({
  onChange,
  selectedAccount,
  options,
  selectedKey,
}) => {
  const initialSelectedOption = selectedAccount
    ? selectedAccount[selectedKey]
    : "------------Select------------";

  const [selectedOption, setSelectedOption] = useState<string>(
    initialSelectedOption
  );

  useEffect(() => {
    setSelectedOption(selectedAccount ? selectedAccount[selectedKey] : "");
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
