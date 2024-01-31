import { useState, useRef, useEffect, RefObject } from "react";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import { SigninAPI } from "../../components/api/api";
import { SigninParams } from "../../interfaces/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingBar from "react-top-loading-bar";

export default function Landing() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<SigninParams>({
    username: "",
    password: "",
  });
  const usernameInputRef: RefObject<HTMLInputElement> = useRef(null);
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const role = personalInfo?.role;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/Admin");
      } else if (role === "office staff") {
        navigate("/DashboardOS");
        // } else if (role === "requester" || role === "vip") {
        //   navigate("/DashboardR");
        // }
      }
    }
  }, []);

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  const encryptPassword = (password: any) => {
    return btoa(password);
  };

  const decryptPassword = (encryptedPassword: any) => {
    return atob(encryptedPassword);
  };

  const handleSignin = () => {
    const encryptedPassword = encryptPassword(userData.password);
    const userDataToStore = { ...userData, password: encryptedPassword };

    SigninAPI(userData, navigate, dispatch, setLoadingBarProgress, setError);

    if (rememberMe) {
      localStorage.setItem("userData", JSON.stringify(userDataToStore));
    } else {
      localStorage.removeItem("userData");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSignin();
    }
  };
  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const userDataFromStorage = JSON.parse(savedUserData);
      // Decrypt the stored password before setting it in the state
      userDataFromStorage.password = decryptPassword(
        userDataFromStorage.password
      );
      setUserData(userDataFromStorage);
      setRememberMe(true);
    }
  }, []);
  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <div className="container">
        <div className="appname">
          <p>Vehi-Sched</p>
          <span>Vehicle Scheduling System for USTP Motor Pool</span>
        </div>
        <div className="form">
          <p className="signin-text">Signin to your account</p>
          {error && <p className="text-error">Invalid Credentials!</p>}
          <div className="inputfielddd">
            <div className="inputusername">
              <div className="icon-container">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
              </div>
              <input
                ref={usernameInputRef}
                value={userData.username}
                placeholder="Username"
                onChange={(event) => {
                  setUserData({ ...userData, username: event.target.value });
                }}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="password-container">
              <div className="icon-container">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
              </div>
              <input
                value={userData.password}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  setUserData({ ...userData, password: event.target.value });
                }}
                onKeyDown={handleKeyDown}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={handleToggleVisibility}
                className="eye-icon"
              />
            </div>
          </div>
          <div className="forgotpassword">
            <a className="forgottext">Forgot password?</a>
          </div>
          <div className="buttoncontainer">
            <div className="rememberme">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Remember me</span>
            </div>
            <button onClick={handleSignin}>Signin</button>
          </div>

          <div className="line"></div>
        </div>
      </div>
    </>
  );
}
