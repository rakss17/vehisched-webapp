import React from "react";
import { HoverDescriptionProps } from "../../interfaces/interfaces";

const HoverDescription: React.FC<HoverDescriptionProps> = ({
  description,
  top,
  left,
  right,
  bottom,
  width,
  height,
}) => {
  return (
    <div
      style={{
        backgroundColor: "gray",
        position: "absolute",
        right: `${right}vw`,
        left: `${left}vw`,
        top: `${top}vh`,
        bottom: `${bottom}vh`,
        width: `${width}vw` || "auto",
        height: `${height}vh`,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontSize: "1rem",
          color: "white",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default HoverDescription;
