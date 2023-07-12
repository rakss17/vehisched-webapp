import React, { useState } from "react";
import "./dropdown.css";

type DropdownProps = {
  status: string[];
  onCategoryChange: (category: string) => void;
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
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={handleMenuToggle}>
        <span className="dropdown-default">{selectedOption}</span>
        <span className="downarrow">▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
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
