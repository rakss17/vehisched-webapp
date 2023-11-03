import React from "react";
import { ButtonProps } from "../../interfaces/interfaces";
import "./commonbutton.css";

const CommonButton: React.FC<ButtonProps> = ({
  onClick,
  text,
  primaryStyle,
  secondaryStyle,
  height,
  width,
}) => {
  const buttonStyle = {
    height: height ? `${height}vh` : "auto",
    width: width ? `${width}vw` : "auto",
  };

  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      className={
        primaryStyle ? "primary-style" : secondaryStyle ? "secondary-style" : ""
      }
    >
      {text}
    </button>
  );
};

export default CommonButton;
