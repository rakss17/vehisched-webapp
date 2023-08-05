import React from "react";
import Modal from "react-modal";
import "./confirmation.css";

interface ConfirmationProps {
  isOpen: boolean;
  header?: string;
  content?: string;
  footer?: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  isOpen,
  header,
  content,
  footer,
}) => {
  return (
    <Modal className="modal-confirmation" isOpen={isOpen}>
      {header && <p>{header}</p>}
      {content && <p>{content}</p>}
      {footer && <p>{footer}</p>}
    </Modal>
  );
};

export default Confirmation;
