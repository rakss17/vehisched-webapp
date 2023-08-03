import React from "react";
import Modal from "react-modal";
import "./confirmation.css";

interface ConfirmationProps {
  isOpen: boolean;
  content: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ isOpen, content }) => {
  return (
    <Modal className="modal-confirmation" isOpen={isOpen}>
      <p>{content}</p>
    </Modal>
  );
};

export default Confirmation;
