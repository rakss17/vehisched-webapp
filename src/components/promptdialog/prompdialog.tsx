import React from "react";
import Modal from "react-modal";
import "./promptdialog.css";
import { ModalProps } from "../../interfaces/interfaces";

const PromptDialog: React.FC<ModalProps> = ({
  isOpen,
  content,
  buttonText1,
  buttonText2,
  onRequestClose,
  onRequestDelete,
}) => {
  return (
    <Modal className="modal-prompt-dialog" isOpen={isOpen}>
      <h1>{content}</h1>
      <div>
        <button onClick={onRequestDelete}>{buttonText1}</button>
        <button onClick={onRequestClose}>{buttonText2}</button>
      </div>
    </Modal>
  );
};
export default PromptDialog;
