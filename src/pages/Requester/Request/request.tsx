import { useState, useEffect } from "react";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import "./request.css";
import Ellipsis from "../../../components/ellipsismenu/ellipsismenu";
import Confirmation from "../../../components/confirmation/confirmation";
import { SidebarItem } from "../../../interfaces/interfaces";
import { fetchRequestAPI } from "../../../components/api/api";

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardR" },
  { icon: faClipboardList, text: "Request", path: "/Request" },
];

export default function Request() {
  const [requestData, setRequestData] = useState<any[]>([]);
  const [requestFilteredData, setRequestFilteredData] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    fetchRequestAPI(setRequestFilteredData);
  }, []);

  const handleButtonClick = (status: string) => {
    let filteredData = [];

    switch (status) {
      case "Pending":
        filteredData = requestFilteredData.filter(
          (request) => request.status === "Pending"
        );
        break;
      case "Approved":
        filteredData = requestFilteredData.filter(
          (request) => request.status === "Approved"
        );
        break;
      case "Canceled":
        filteredData = requestFilteredData.filter(
          (request) => request.status === "Canceled"
        );
        break;
      case "Declined":
        filteredData = requestFilteredData.filter(
          (request) => request.status === "Declined"
        );
        break;
      default:
        // Set to empty for unknown status
        break;
    }
    setRequestData(filteredData);
    setSelectedStatus(status);
  };
  useEffect(() => {
    handleButtonClick("Pending");
  }, []);

  let filteredStatus: any[] = [];
  useEffect(() => {
    filteredStatus = requestFilteredData.filter(
      (request) => request.status === "Pending"
    );
    setRequestData(filteredStatus);
  }, [requestFilteredData]);

  const onHandleEllipsis = (requestNumber: string) => {
    setIsConfirmationOpen(true);
    const updatedRequestData = requestData.map((request) =>
      request.request_number === requestNumber
        ? { ...request, status: "Canceled" }
        : request
    );

    setRequestData(updatedRequestData);
    setTimeout(() => {
      setIsConfirmationOpen(false);
    }, 3000);
  };

  const filteredData = requestData.filter(
    (request) => request.status === selectedStatus
  );

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <div className="label-margin">
          <Label label="Request" />
        </div>
        <div className="request-child-container">
          <div className="nav-button-row">
            <button
              onClick={() => handleButtonClick("Pending")}
              className={selectedStatus === "Pending" ? "active" : ""}
            >
              Pending
            </button>
            <button
              onClick={() => handleButtonClick("Approved")}
              className={selectedStatus === "Approved" ? "active" : ""}
            >
              Approved
            </button>
            <button
              onClick={() => handleButtonClick("Canceled")}
              className={selectedStatus === "Canceled" ? "active" : ""}
            >
              Canceled
            </button>
            <button
              onClick={() => handleButtonClick("Declined")}
              className={selectedStatus === "Declined" ? "active" : ""}
            >
              Declined
            </button>
          </div>
          <div className="requests-container">
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 20px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ fontWeight: "normal" }}>Request No.</th>
                  <th style={{ fontWeight: "normal" }}>Travel Date</th>
                  <th style={{ fontWeight: "normal" }}>Vehicle</th>
                </tr>
              </thead>
              {filteredData.length === 0 ? (
                <p>No request available.</p>
              ) : (
                <tbody>
                  {filteredData.map((request, index) => (
                    <tr key={index}>
                      <td>{request.request_id}</td>
                      <td>{request.travel_date}</td>
                      <td>{request.vehicle}</td>
                      <td className="ellipsis-cell">
                        {selectedStatus === "Pending" ||
                        selectedStatus === "Approved" ? (
                          <Ellipsis
                            onCategoryChange={() =>
                              onHandleEllipsis(request.request_number)
                            }
                            status={["Cancel Request"]}
                          />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </Container>
      <Confirmation isOpen={isConfirmationOpen} header="Request Canceled!" />
    </>
  );
}
