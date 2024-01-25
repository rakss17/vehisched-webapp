import "./header.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { persistor } from "../../redux/store";
import { clearUserData } from "../../redux/actions/userActions";
import LoadingBar from "react-top-loading-bar";
import { HeaderProps } from "../../interfaces/interfaces";

const Header: React.FC<HeaderProps> = ({ isDropDownHide }) => {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const username = personalInfo?.username;
  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuOptionClick = (option: string) => {
    if (option === "profile") {
      alert("Under Development!");
    } else if (option === "settings") {
      alert("Under Development!");
    } else if (option === "signout") {
      setLoadingBarProgress(20);
      localStorage.removeItem("token");
      localStorage.removeItem("guidelines");
      setLoadingBarProgress(50);
      dispatch(clearUserData());
      setLoadingBarProgress(70);
      persistor.purge();
      setLoadingBarProgress(100);
      window.location.href = "/";
    }

    setIsOpen(false);
  };

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <div className="containerHeader">
        <img src={logo} alt="logo" />
        <div className="container-appname-dropdown">
          <p>Vehi-Sched</p>
          {!isDropDownHide && (
            <>
              <div className="dropdown-header">
                <div
                  className="dropdown-toggle-header"
                  onClick={handleMenuToggle}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: "0px", marginTop: "3px" }}
                  />
                  <span className="username">{username}</span>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
