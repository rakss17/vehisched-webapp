import React, { ReactNode } from "react";
import "./container.css";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

export default Container;
