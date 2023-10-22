import React from "react"
import Modal from "react-modal"
import { ModalProps } from "../../interfaces/interfaces"
import './vehicle.css'
import CalendarInput from "../calendarinput/calendarinput"
import TimeInput from "../timeinput/timeinput"

const VehicleMaintenance: React.FC<ModalProps> = ({
    isOpen,
    onRequestClose,
    onRequestDelete,
}) => {
    return(
        <Modal className="vehicle-maintenance-modal" isOpen={isOpen}>
            <div className="vehicle-maintenance-container">
                <div className="maintenance-from">
                    <p>From: </p>
                    
                    <CalendarInput />
                    <div className="separate-time">
                    <TimeInput />
                    </div>

                </div>
                <div className="maintenance-to">
                    <p>To: </p>
                    <div>
                        <CalendarInput />
                        <TimeInput />
                    </div>
                    
                </div>
                <div>
                    <button onClick={onRequestClose}>Cancel</button>
                    <button>Submit</button>
                </div>
            </div>
            
        </Modal>
    )
}

export default VehicleMaintenance