import React, { useState, useEffect, useRef } from "react";
import "./ellipsismenu.css";

type EllipsisProps = {
  status: string[];
  onCategoryChange: (category: string) => void;
};

export default function Ellipsis(props: EllipsisProps) {
  const [selectedOption, setSelectedOption] = useState(props.status[0]);
  const [isOpen, setIsOpen] = useState(false);
  const ellipsisRef = useRef<HTMLDivElement>(null); // Explicitly specify the type

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onCategoryChange(option);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      ellipsisRef.current &&
      !ellipsisRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="ellipsis" ref={ellipsisRef}>
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
