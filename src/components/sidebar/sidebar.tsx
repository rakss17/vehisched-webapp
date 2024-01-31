import { useState, useEffect } from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarItem } from "../../interfaces/interfaces";

interface SidebarProps {
  sidebarData: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const activePath = sidebarData.find(
      (item) => item.path === location.pathname
    );
    if (activePath) {
      setActiveButton(activePath.text);
    }
  }, [location.pathname, sidebarData]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (item: SidebarItem) => {
    setActiveButton(item.text);
    navigate(item.path);
  };

  return (
    <>
      <div className={`containerSB ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar">
          <button className="toggle-button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} className="icon-bar" />
          </button>
          <div className="sidebar-buttons">
            {sidebarData.map((item, index) =>
              isSidebarOpen || window.innerWidth > 768 ? (
                <button
                  className={`sidebar-button ${
                    item.text === activeButton ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => handleButtonClick(item)}
                >
                  <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                  <span className="sidebar-text">{item.text}</span>
                  {item.notification &&
                    item.notification > 0 &&
                    item.text !== activeButton && (
                      <span className="notification">{item.notification}</span>
                    )}
                </button>
              ) : null
            )}
          </div>
        </div>
      </div>
      {/* {isSidebarOpen && <div className="blur-overlay" />} */}
    </>
  );
};

export default Sidebar;
