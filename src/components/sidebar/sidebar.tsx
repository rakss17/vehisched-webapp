import { useState } from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const sidebarData = [
  { icon: faColumns, text: "Dashboard" },
  { icon: faClipboardList, text: "Requests" },
  { icon: faCar, text: "Vehicles" },
  { icon: faCalendarAlt, text: "Schedules" },
  { icon: faUser, text: "Drivers" },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`containerSB ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar">
          <button className="toggle-button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} className="icon-bar" />
          </button>
          <div className="sidebar-buttons">
            {sidebarData.map((item, index) => (
              <button className="sidebar-button" key={index}>
                <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                <span className="sidebar-text">{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {isSidebarOpen && <div className="blur-overlay" />}
    </>
  );
}
