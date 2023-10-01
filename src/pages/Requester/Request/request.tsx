import { useState, useEffect } from "react";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import LoadingBar from "react-top-loading-bar";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import "./request.css";
import Ellipsis from "../../../components/ellipsismenu/ellipsismenu";
import Confirmation from "../../../components/confirmation/confirmation";
import PromptDialog from "../../../components/promptdialog/prompdialog";
import { SidebarItem } from "../../../interfaces/interfaces";
import { cancelRequestAPI, fetchRequestAPI } from "../../../components/api/api";

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardR" },
  { icon: faClipboardList, text: "Request", path: "/Request" },
];

export default function Request() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [requestData, setRequestData] = useState<any[]>([]);
  const [requestFilteredData, setRequestFilteredData] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [selectedRequest, setSelectedRequest] = useState<any>();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const requestId = selectedRequest?.request_id ?? "";

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

  const onHandleEllipsis = (category: any, request: any) => {
    if (category === "Cancel Request") {
      setIsCancelOpen(true);
      setSelectedRequest(request);
    }
  };

  const handleCancelButton = () => {
    console.log(selectedRequest);
    setLoadingBarProgress(20);
    setIsCancelOpen(false);
    cancelRequestAPI(requestId, setIsConfirmationOpen, setLoadingBarProgress);
  };

  const handleClose = () => {
    setIsCancelOpen(false);
    setTimeout(() => {
      setIsConfirmationOpen(false);
    }, 3000);
  };

  const filteredData = requestData.filter(
    (request) => request.status === selectedStatus
  );

  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
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
                            onCategoryChange={(category) =>
                              onHandleEllipsis(category, request)
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
      <PromptDialog
        isOpen={isCancelOpen}
        content="Are you sure you want to cancel your request?"
        buttonText1="Yes"
        buttonText2="No"
        onRequestClose={handleClose}
        onRequestDelete={handleCancelButton}
      />
      <Confirmation isOpen={isConfirmationOpen} header="Request Canceled!" />
    </>
  );
}
