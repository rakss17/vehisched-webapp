import React, { useState } from "react";
import Modal from "react-modal";
import { ModalProps } from "../../interfaces/interfaces";
import CommonButton from "../button/commonbutton";
import "./forgotpass.css";
import { resetPassword } from "../api/api";
import LoadingBar from "react-top-loading-bar";

const ForgotPass: React.FC<ModalProps> = ({
  isOpen,
  header,
  onRequestClose,
}) => {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    setLoadingBarProgress(20);
    resetPassword(email, setEmail, setLoadingBarProgress);
  };

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <Modal className="modal-forgot-pass" isOpen={isOpen}>
        <h1>{header}</h1>
        <div className="forgotpass-content">
          <p className="Text">
            Enter your email address below and we'll email instructions to reset
            your password.
          </p>
          <input
            className="forgot-input"
            placeholder="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="yesno-forgot-btn">
          <CommonButton onClick={onRequestClose} text="Cancel" secondaryStyle />
          <CommonButton onClick={handleSubmit} text="Submit" primaryStyle />
        </div>
      </Modal>
    </>
  );
};
export default ForgotPass;
