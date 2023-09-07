import "./header.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { persistor } from "../../redux/store";
import { clearUserData } from "../../redux/actions/userActions";
import LoadingBar from "react-top-loading-bar";

export default function Header() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo.user);
  const users = useSelector((state: RootState) => state.user.users);
  const username = userInfo?.username;
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
          <div className="dropdown-header">
            <div className="dropdown-toggle-header" onClick={handleMenuToggle}>
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
        </div>
      </div>
    </>
  );
}
