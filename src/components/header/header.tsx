import "./header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuOptionClick = (option: string) => {
    if (option === "profile") {
      alert("Under Development!");
    } else if (option === "settings") {
      alert("Under Development!");
    } else if (option === "signout") {
      navigate("/");
    }

    setIsOpen(false);
  };

  return (
    <>
      <div className="containerHeader">
        <img src={logo} alt="logo" />
        <div className="container-appname-dropdown">
          <p>Vehi-Sched</p>
          <div className="dropdown-header">
            <div className="dropdown-toggle-header" onClick={handleMenuToggle}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: "0px", marginTop: "3px" }}
              />
              <span className="username">Ambulo, Bohari S.</span>
              <span>▼</span>
            </div>
            {isOpen && (
              <ul className="dropdown-menu-header">
                <li onClick={() => handleMenuOptionClick("profile")}>
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </li>
                <li onClick={() => handleMenuOptionClick("settings")}>
                  <FontAwesomeIcon icon={faCog} />
                  Settings
                </li>
                <li onClick={() => handleMenuOptionClick("signout")}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
