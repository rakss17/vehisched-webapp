import React, { useState } from "react";
import Modal from "react-modal";
import { ModalProps } from "../../interfaces/interfaces";
import CommonButton from "../button/commonbutton";
import LoadingBar from "react-top-loading-bar";
import './reschedule.css'

const Reschedule: React.FC<ModalProps> = ({
  isOpen,
  header,
  onRequestClose,
  content,
}) => {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [travelDateandTime, setTravelDateandTime] = useState("");

 
  const handleSubmit = () => {
    setLoadingBarProgress(20);
    
  };

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <Modal className="modal-reschedule" isOpen={isOpen}>
        <h1>{header}</h1>
        <div>{content}</div>
        <div className="yesno-reschedule-btn">
          <CommonButton onClick={onRequestClose} text="Cancel" secondaryStyle />
          <CommonButton onClick={handleSubmit} text="Reschedule " primaryStyle />
        </div>
      </Modal>
    </>
  );
};
export default Reschedule;
