import React from "react";
import Modal from "react-modal";
import "./promptdialog.css";
import { ModalProps } from "../../interfaces/interfaces";

const PromptDialog: React.FC<ModalProps> = ({
  isOpen,
  header,
  content,
  footer,
  buttonText1,
  buttonText2,
  onRequestClose,
  onProceed,
}) => {
  return (
    <Modal className="modal-prompt-dialog" isOpen={isOpen}>
      <h1>{header}</h1>
      <p>{content}</p>
      <p>{footer}</p>
      <div>
        <button onClick={onRequestClose}>{buttonText2}</button>
        <button onClick={onProceed}>{buttonText1}</button>
      </div>
    </Modal>
  );
};
export default PromptDialog;
