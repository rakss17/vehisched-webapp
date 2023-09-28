import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./requestformdetails.css";
import { RequestFormDetailsProps } from "../../interfaces/interfaces";

const RequestFormDetails: React.FC<RequestFormDetailsProps> = ({
  isOpen,
  onRequestClose,
  selectedRequest,
  showButtons,
  onApprove,
}) => {
  if (!selectedRequest) return null;
  return (
    <>
      <Modal className="modal-request-form" isOpen={isOpen}>
        <div>
          <div>
            <h1>Request Form</h1>
            <p onClick={onRequestClose}>
              <FontAwesomeIcon icon={faXmark} />
            </p>
          </div>

          <div>
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "25px",
                      whiteSpace: "nowrap",
                      paddingLeft: "1.3em",
                    }}
                  >
                    Requester's Name:
                  </th>
                  <td style={{ width: "20vw" }}>
                    {selectedRequest.requester_last_name},{" "}
                    {selectedRequest.requester_first_name}{" "}
                    {selectedRequest.requester_middle_name}
                  </td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px" }}>Office/Dept: </th>
                  <td style={{ width: "5vw" }}>
                    {selectedRequest.office_or_dept}
                  </td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "40px",
                      verticalAlign: "top",
                      paddingLeft: "4%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Passenger's Name:
                  </th>
                  <td>{selectedRequest.passenger_names}</td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "90px",
                      paddingLeft: "2em",
                      verticalAlign: "top",
                    }}
                  >
                    Vehicle:
                  </th>
                  <td style={{ width: "20vw" }}>{selectedRequest.vehicle}</td>
                </tr>

                <tr>
                  <th
                    style={{
                      paddingRight: "10px",
                      verticalAlign: "top",
                      whiteSpace: "nowrap",
                    }}
                  >
                    No. of Passengers:{" "}
                  </th>
                  <td
                    style={{
                      paddingRight: "65px",
                    }}
                  >
                    {selectedRequest.number_of_passenger}
                  </td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "60px",
                      verticalAlign: "top",
                      paddingLeft: "30px",
                    }}
                  >
                    Destination:
                  </th>
                  <td
                    style={{
                      width: "20vw",

                      height: "10vh",
                      verticalAlign: "top",
                    }}
                  >
                    {selectedRequest.destination}
                  </td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px", paddingLeft: "45px" }}>
                    Kilometer/s:
                  </th>
                  <td
                    style={{
                      paddingRight: "0px",

                      width: "5vw",
                    }}
                  >
                    1500000
                  </td>
                </tr>
              </tbody>

              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "25px",
                      whiteSpace: "nowrap",
                      paddingLeft: "0em",
                    }}
                  >
                    Date of Travel:
                  </th>
                  <td style={{ width: "20vw" }}>
                    {selectedRequest.travel_date}
                  </td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px" }}>Time: </th>
                  <td style={{ width: "5vw" }}>
                    {selectedRequest.travel_time}
                  </td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "60px",
                      verticalAlign: "top",
                      paddingLeft: "9%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Purpose:
                  </th>
                  <td>{selectedRequest.purpose}</td>
                </tr>
              </tbody>
              {showButtons && (
                <tbody className="table-button-container">
                  <tr>
                    <button>Attachments</button>
                    <button onClick={onApprove}>Approve</button>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RequestFormDetails;
