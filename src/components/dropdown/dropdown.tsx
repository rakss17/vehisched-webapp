import React, { useState } from "react";
import "./dropdown.css";

type DropdownProps = {
  status: string[];
  onCategoryChange: (category: string) => void;
  dropdownClassName?: string;
  toggleClassName?: string;
  menuClassName?: string;
};

export default function Dropdown(props: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(props.status[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onCategoryChange(option);
  };

  return (
    <div className={`dropdown ${props.dropdownClassName}`}>
      <div
        className={`dropdown-toggle ${props.toggleClassName}`}
        onClick={handleMenuToggle}
      >
        <span className="dropdown-default">{selectedOption}</span>
        <span className="downarrow">▼</span>
      </div>
      {isOpen && (
        <ul className={`dropdown-menu ${props.menuClassName}`}>
          {props.status.map((option, index) => (
            <li key={index} onClick={() => handleMenuOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
