import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./requestformdetails.css";
import { Request } from "../../pages/OfficeStaff/Requests/requests";

interface RequestFormDetailsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedRequest: Request | null;
  showButtons: boolean;
  onApprove: () => void;
}

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
                  <td style={{ width: "20vw" }}>Bohari S. Ambulo</td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px" }}>Office/Dept: </th>
                  <td style={{ width: "5vw" }}>CEATSDA</td>
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
                  <td>
                    Bohari S. Ambulo, Michael Ray V. romeo, Mark Dave M Lorejo,
                    Tristan C. Araquil, Michael Ray V. romeo, Mark Dave M
                    Lorejo, Tristan C. Araquil
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
                      paddingRight: "90px",
                      paddingLeft: "2em",
                      verticalAlign: "top",
                    }}
                  >
                    Vehicle:
                  </th>
                  <td style={{ width: "20vw" }}>Toyota Hilux</td>
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
                    99
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
                    Cogon Public Market dawdawdawdaw dawdawdawdawd adaw dawd
                    awdaw ldjaw jdpawj dopawj dpaw dawjpdojawdjawdpoawjdpawjdawj
                    d2312312312
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
                  <td style={{ width: "20vw" }}>September 1, 2023</td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px" }}>Time: </th>
                  <td style={{ width: "5vw" }}>7:00 am</td>
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
                  <td>Pahulay kay gikapoy nas capstone</td>
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
