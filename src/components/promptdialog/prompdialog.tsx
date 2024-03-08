import React from "react";
import Modal from "react-modal";
import "./promptdialog.css";
import { ModalProps } from "../../interfaces/interfaces";
import CommonButton from "../button/commonbutton";

const PromptDialog: React.FC<ModalProps> = ({
  isOpen,
  header,
  content,
  footer,
  onRequestClose,
  onProceed,
}) => {
  return (
    <Modal className="modal-prompt-dialog" isOpen={isOpen}>
      <h1>{header}</h1>
      <p>{content}</p>
      <p>{footer}</p>
      <div className="yesno-btn">
        <CommonButton onClick={onRequestClose} text="No" secondaryStyle />
        <CommonButton onClick={onProceed} text="Yes" primaryStyle />
      </div>
    </Modal>
  );
};
export default PromptDialog;
