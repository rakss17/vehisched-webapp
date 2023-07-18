import { useState, useEffect } from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

type SidebarItem = {
  icon: any;
  text: string;
  path: string;
};

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={`containerSB ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar">
          <button className="toggle-button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} className="icon-bar" />
          </button>
          <div className="sidebar-buttons">
            {isSidebarOpen || window.innerWidth > 768
              ? sidebarData.map((item, index) => (
                  <button
                    className={`sidebar-button ${
                      item.text === activeButton ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => handleButtonClick(item)}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="sidebar-icon"
                    />
                    <span className="sidebar-text">{item.text}</span>
                  </button>
                ))
              : null}
          </div>
        </div>
      </div>
      {isSidebarOpen && <div className="blur-overlay" />}
    </>
  );
};

export default Sidebar;
