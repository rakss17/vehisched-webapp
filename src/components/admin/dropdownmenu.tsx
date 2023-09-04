import React, { useState } from "react";
import "./dropdownmenu.css";

interface DropdownProps {
  onChange: (selectedOption: string) => void;
}

const DropdownMenu: React.FC<DropdownProps> = ({ onChange }) => {
  const options = ["requester", "vip", "driver", "gate guard", "office staff"];

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

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
