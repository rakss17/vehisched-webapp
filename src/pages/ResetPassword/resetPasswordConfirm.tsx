import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Header from "../../components/header/header";
import "./resetPasswordConfirm.css";
import { useParams } from "react-router-dom";
import CommonButton from "../../components/button/commonbutton";
import { resetPasswordConfirm } from "../../components/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [data, setData] = useState<any>({
    password: "",
    confirm_password: "",
    uid: "",
    token: "",
  });
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState<any[]>([]);

  useEffect(() => {
    setData((prevData: any) => ({
      ...prevData,
      uid: uid,
      token: token,
    }));
  }, []);

  const isPasswordValid = (value: any) => {
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  };

  const handleOnSubmit = () => {
    let validationErrors: { [key: string]: string } = {};

    if (!data.password) {
      validationErrors.newPasswordError = "This field is required.";
    } else {
      if (!isPasswordValid(data.password)) {
        validationErrors.invalidNewPassword = "Invalid password.";
      }
      if (data.password !== data.confirm_password) {
        validationErrors.doesNotMatchError = "Password does not match.";
      }
    }

    if (!data.confirm_password) {
      validationErrors.confirmNewPasswordError = "This field is required.";
    } else {
      if (data.confirm_password !== data.password) {
        validationErrors.doesNotMatchError = "Password does not match.";
      }
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);
    if (Object.keys(validationErrors).length === 0) {
      setLoadingBarProgress(20);
      resetPasswordConfirm(
        data.uid,
        data.token,
        data.password,
        setLoadingBarProgress
      );
    }
  };
  const handleOnClear = () => {
    setData((prevData: any) => ({
      ...prevData,
      password: "",
      confirm_password: "",
    }));
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0];
    setErrorMessages(updatedErrors);
  };
  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <Header isDropDownHide />
      <div className="reset-password-confirm-maincontainer">
        <div className="reset-password-confirm-container">
          <ToastContainer />
          <div className="reset-password-confirm-fields-container">
            <h1>Create a new password</h1>
            <ul>
              <li
                style={{
                  color: errorMessages[0]?.invalidNewPassword ? "red" : "black",
                }}
              >
                Must be more than 8 characters long
              </li>
              <li
                style={{
                  color: errorMessages[0]?.invalidNewPassword ? "red" : "black",
                }}
              >
                Must contain at least one number
              </li>
            </ul>
            <div className="reset-password-confirm-each-field-container">
              <p
                style={{
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                New password <p style={{ color: "red" }}> *</p>
              </p>
              <div className="reset-password-confirm-password-container">
                <input
                  value={data.password}
                  placeholder="Type here..."
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => {
                    setData({ ...data, password: event.target.value });
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0]?.newPasswordError;
                    setErrorMessages(updatedErrors);
                    if (isPasswordValid(event.target.value)) {
                      const updatedErrors = { ...errorMessages };
                      delete updatedErrors[0]?.invalidNewPassword;
                      setErrorMessages(updatedErrors);
                    }
                    if (event.target.value === data.confirm_password) {
                      const updatedErrors = { ...errorMessages };
                      delete updatedErrors[0]?.doesNotMatchError;
                      setErrorMessages(updatedErrors);
                    }
                  }}
                  style={{
                    borderColor:
                      errorMessages[0]?.newPasswordError ||
                      errorMessages[0]?.doesNotMatchError ||
                      errorMessages[0]?.invalidNewPassword
                        ? "red"
                        : "transparent",
                    borderWidth:
                      errorMessages[0]?.newPasswordError ||
                      errorMessages[0]?.doesNotMatchError ||
                      errorMessages[0]?.invalidNewPassword
                        ? 2
                        : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={handleToggleVisibility}
                  className="reset-password-confirm-eye-icon"
                />
              </div>
              {errorMessages[0]?.newPasswordError && (
                <p className="reset-password-confirm-error-message">
                  {errorMessages[0]?.newPasswordError}
                </p>
              )}
              {errorMessages[0]?.invalidNewPassword && (
                <p className="reset-password-confirm-error-message">
                  {errorMessages[0]?.invalidNewPassword}
                </p>
              )}
              {errorMessages[0]?.doesNotMatchError && (
                <p className="reset-password-confirm-error-message">
                  {errorMessages[0]?.doesNotMatchError}
                </p>
              )}
            </div>
            <div className="reset-password-confirm-each-field-container">
              <p
                style={{
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Confirm new password <p style={{ color: "red" }}> *</p>
              </p>
              <div className="reset-password-confirm-password-container">
                <input
                  value={data.confirm_password}
                  placeholder="Type here..."
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => {
                    setData({ ...data, confirm_password: event.target.value });
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0]?.confirmNewPasswordError;
                    setErrorMessages(updatedErrors);
                    if (event.target.value === data.password) {
                      const updatedErrors = { ...errorMessages };
                      delete updatedErrors[0]?.doesNotMatchError;
                      setErrorMessages(updatedErrors);
                    }
                  }}
                  style={{
                    borderColor:
                      errorMessages[0]?.confirmNewPasswordError ||
                      errorMessages[0]?.doesNotMatchError
                        ? "red"
                        : "transparent",
                    borderWidth:
                      errorMessages[0]?.confirmNewPasswordError ||
                      errorMessages[0]?.doesNotMatchError
                        ? 2
                        : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={handleToggleVisibility}
                  className="reset-password-confirm-eye-icon"
                />
              </div>
              {errorMessages[0]?.confirmNewPasswordError && (
                <p className="reset-password-confirm-error-message">
                  {errorMessages[0]?.confirmNewPasswordError}
                </p>
              )}
              {errorMessages[0]?.invalidConfirmNewPassword && (
                <p className="reset-password-confirm-error-message">
                  {errorMessages[0]?.invalidConfirmNewPassword}
                </p>
              )}
              {errorMessages[0]?.doesNotMatchError && (
                <p className="reset-password-confirm-error-message">
                  {errorMessages[0]?.doesNotMatchError}
                </p>
              )}
            </div>
          </div>
          <div className="reset-password-confirm-button-container">
            <CommonButton onClick={handleOnClear} text="Clear" secondaryStyle />
            <CommonButton onClick={handleOnSubmit} text="Submit" primaryStyle />
          </div>
        </div>
      </div>
    </>
  );
}
