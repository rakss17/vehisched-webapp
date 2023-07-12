import { useState } from "react";
import "./dropdown.css";

type DropdownProps = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

export default function Dropdown(props: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(props.first);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={handleMenuToggle}>
        <span className="dropdown-default">{selectedOption}</span>
        <span className="downarrow">▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => handleMenuOptionClick(props.first)}>
            {props.first}
          </li>
          <li onClick={() => handleMenuOptionClick(props.second)}>
            {props.second}
          </li>
          <li onClick={() => handleMenuOptionClick(props.third)}>
            {props.third}
          </li>
          <li onClick={() => handleMenuOptionClick(props.fourth)}>
            {props.fourth}
          </li>
        </ul>
      )}
    </div>
  );
}
