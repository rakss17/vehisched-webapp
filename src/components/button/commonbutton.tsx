import React from "react";
import { ButtonProps } from "../../interfaces/interfaces";
import "./commonbutton.css";

const CommonButton: React.FC<ButtonProps> = ({
  onClick,
  text,
  primaryStyle,
  secondaryStyle,
}) => {
  return (
    <button
      onClick={onClick}
      className={
        primaryStyle ? "primary-style" : secondaryStyle ? "secondary-style" : ""
      }
    >
      {text}
    </button>
  );
};

export default CommonButton;
