import React from "react";
import "./toastcontent.css";

interface ToastContentProps {
  message: string;
  timeago?: string;
}

const ToastContent: React.FC<ToastContentProps> = ({ message, timeago }) => {
  return (
    <div className="toast-content">
      <div className="toast-message">{message}</div>
      <div className="toast-timeago">{timeago}</div>
    </div>
  );
};

export default ToastContent;
