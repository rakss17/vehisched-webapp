import React from "react";
import Modal from "react-modal";
import "./promptdialog.css";

interface PromptDialogProps {
  isOpen: boolean;
  content: string;
  buttonText1: string;
  buttonText2: string;
  onRequestClose: () => void;
}

const PromptDialog: React.FC<PromptDialogProps> = ({
  isOpen,
  content,
  buttonText1,
  buttonText2,
  onRequestClose,
}) => {
  return (
    <Modal className="modal-prompt-dialog" isOpen={isOpen}>
      <h1>{content}</h1>
      <div>
        <button>{buttonText1}</button>
        <button onClick={onRequestClose}>{buttonText2}</button>
      </div>
    </Modal>
  );
};
export default PromptDialog;
