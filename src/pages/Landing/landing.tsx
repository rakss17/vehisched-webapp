import { useState } from "react";
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
import { useDispatch } from "react-redux";

export default function Landing() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<SigninParams>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = () => {
    SigninAPI(userData, navigate, dispatch);
  };
  return (
    <>
      <div className="container">
        <div className="appname">
          <p>Vehi-Sched</p>
          <span>Vehicle Scheduling System for USTP Motor Pool</span>
        </div>
        <div className="form">
          <p>Signin to your account</p>
          <div className="inputfielddd">
            <div className="inputusername">
              <div className="icon-container">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
              </div>
              <input
                value={userData.username}
                placeholder="Username"
                onChange={(event) => {
                  setUserData({ ...userData, username: event.target.value });
                }}
              ></input>
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
              <input type="checkbox" />
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
