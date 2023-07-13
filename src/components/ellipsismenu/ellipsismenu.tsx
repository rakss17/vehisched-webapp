import React, { useState } from "react";
import "./ellipsismenu.css";

type EllipsisProps = {
  status: string[];
  onCategoryChange: (category: string) => void;
};

export default function Ellipsis(props: EllipsisProps) {
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
    <div className="ellipsis">
      <div className="ellipsis-toggle" onClick={handleMenuToggle}>
        <div className="ellipsis-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      {isOpen && (
        <ul className="ellipsis-menu">
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
