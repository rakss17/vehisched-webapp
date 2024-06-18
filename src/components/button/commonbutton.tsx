import React from "react";
import { ButtonProps } from "../../interfaces/interfaces";
import "./commonbutton.css";

const CommonButton: React.FC<ButtonProps> = ({
  onClick,
  text,
  primaryStyle,
  secondaryStyle,
  tertiaryStyle,
  whiteStyle,
  underlinedStyle,
  height,
  width,
}) => {
  const buttonStyle = {
    height: height ? `${height}vh` : "auto",
    width: width ? `${width}vw` : "auto",
  };

  const handleClick = () => {
    if (onClick) {
      onClick(text);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={buttonStyle}
      className={
        primaryStyle
          ? "primary-style"
          : secondaryStyle
          ? "secondary-style"
          : tertiaryStyle
          ? "tertiary-style"
          : whiteStyle
          ? "white-style"
          : underlinedStyle
          ? "underlined-style"
          : ""
      }
    >
      {text}
    </button>
  );
};

export default CommonButton;
