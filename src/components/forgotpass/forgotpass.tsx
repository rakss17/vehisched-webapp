import React from "react";
import Modal from "react-modal";
import { ModalProps } from "../../interfaces/interfaces";
import CommonButton from "../button/commonbutton";
import './forgotpass.css'

const ForgotPass: React.FC<ModalProps> = ({
  isOpen,
  header,
  content,
  footer,
  onRequestClose,
  onSubmit,
}) => {
  return (
    <Modal className="modal-forgot-pass" isOpen={isOpen}>
      <h1>{header}</h1>
      <div className="forgotpass-content">
        <p className="Text">Enter your email address below and we'll email instructions to reset your password.</p>
        <input className="forgot-input" placeholder="email"/>
      </div>
      <div className="yesno-forgot-btn">
        <CommonButton
        onClick={onRequestClose}
        text="Cancel"
        secondaryStyle
        />
        <CommonButton
        onClick={onSubmit}
        text="Submit"
        primaryStyle
        />
      </div>
    </Modal>
  );
};
export default ForgotPass;
