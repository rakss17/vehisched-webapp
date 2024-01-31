import "./accountactivated.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function AccountActivated() {
  const navigate = useNavigate();
  const handleWebApp = () => {
    navigate("/");
  };
  return (
    <>
      <div className="activated-container">
        <div>
          <div className="activated-header">
            <img src={logo} alt="logo" />
            <p>Vehi-Sched</p>
          </div>
          <div className="activated-child-container">
            <h1>Your account is successfully activated.</h1>
            <div>
              <p>
                Requesters have the option to choose either the web app or the
                mobile app.
              </p>
              <p>If you are an admin and office staff</p>
              <button onClick={handleWebApp}>Go to web app</button>
            </div>
            <div>
              <p> If you are a driver and gate guard</p>
              <p>
                Download the 'vehisched' mobile application {"("}APK{")"}.
              </p>
              <button>Download APK</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
