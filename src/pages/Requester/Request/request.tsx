import { useState, useEffect } from "react";
import {
  faColumns,
  faClipboardList,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { NotificationApprovalScheduleReminderWebsocket } from "../../../components/api/websocket";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useSpring, animated } from "@react-spring/web";

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardR" },
  {
    icon: faClipboardList,
    text: "Request",
    path: "/Request",
  },
];

export default function Request() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [requestData, setRequestData] = useState<any[]>([]);
  const [requestFilteredData, setRequestFilteredData] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [selectedRequest, setSelectedRequest] = useState<any>();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);
  const [expandedRequestIndex, setExpandedRequestIndex] = useState(null);
  const [isFifthyKilometers, setIsFifthyKilometers] = useState(false);
  const requestId = selectedRequest?.request_id ?? "";
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const userName = personalInfo?.username;
  const springProps = useSpring({
    height: expandedRequestIndex ? "auto" : "0vh",
  });

  useEffect(() => {
    fetchRequestAPI(setRequestFilteredData);
  }, []);

  NotificationApprovalScheduleReminderWebsocket(userName);

  const handleButtonClick = (status: string) => {
    let filteredData = [];

    switch (status) {
      case "Pending":
        filteredData = requestFilteredData.filter(
          (request) =>
            request.status === "Pending" ||
            request.status === "Awaiting Vehicle Alteration"
        );
        break;
      case "Approved":
        filteredData = requestFilteredData.filter(
          (request) =>
            request.status === "Approved" ||
            request.status === "Approved - Alterate Vehicle"
        );
        break;
      case "Canceled":
        filteredData = requestFilteredData.filter(
          (request) => request.status === "Canceled"
        );
        break;
      case "Rejected":
        filteredData = requestFilteredData.filter(
          (request) => request.status === "Rejected"
        );
        break;
      default:
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
      (request) =>
        request.status === "Pending" ||
        request.status === "Awaiting Vehicle Alteration"
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

  const onHandleAngleDown = (index: any, request: any) => {
    setExpandedRequestIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
    setSelectedRequestIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
    if (request.distance >= 50) {
      setIsFifthyKilometers(true);
    } else if (request.distance < 50) {
      setIsFifthyKilometers(false);
    }
  };
  const formatTime = (timeString: any) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

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
        <ToastContainer />
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
              onClick={() => handleButtonClick("Rejected")}
              className={selectedStatus === "Rejected" ? "active" : ""}
            >
              Rejected
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
                  <th></th>
                  <th>Request No.</th>
                  <th></th>
                  <th>Travel Date</th>
                  <th></th>
                  <th>Vehicle</th>
                  <th></th>
                </tr>
              </thead>
              {requestData.length === 0 ? (
                <p style={{ position: "absolute" }}>No request available.</p>
              ) : (
                <tbody>
                  {requestData.map((request, index) => (
                    <>
                      <tr
                        key={request.request_id}
                        className={
                          selectedRequestIndex === request.request_id
                            ? "selected-request"
                            : ""
                        }
                      >
                        <td className="angle-down">
                          {expandedRequestIndex === request.request_id ? (
                            <FontAwesomeIcon
                              icon={faAngleUp}
                              style={{ fontSize: "24px" }}
                              onClick={() =>
                                onHandleAngleDown(request.request_id, request)
                              }
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faAngleDown}
                              style={{ fontSize: "24px" }}
                              onClick={() =>
                                onHandleAngleDown(request.request_id, request)
                              }
                            />
                          )}
                        </td>

                        <td>{request.request_id}</td>
                        <td></td>
                        <td>{request.travel_date}</td>
                        <td></td>
                        <td>{request.vehicle}</td>
                        <td></td>
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
                      {selectedRequestIndex === request.request_id && (
                        <animated.div
                          style={springProps}
                          className={`request-more-info ${
                            selectedRequestIndex === request.request_id
                              ? "show"
                              : ""
                          }`}
                        >
                          {/* first child */}
                          <div className="request-more-info-first-child">
                            <div>
                              <strong>Destination:</strong>
                              <p>{request.destination}</p>
                            </div>
                            <div>
                              <strong>Distance: </strong>
                              <p>{request.distance} km</p>
                            </div>
                          </div>
                          {/* second child */}
                          <div className="request-more-info-second-child">
                            <div>
                              <strong>Date of Travel: </strong>
                              <p>
                                {request.travel_date},{" "}
                                {formatTime(request.travel_time)}{" "}
                                <strong>to: </strong>
                                {request.return_date},{" "}
                                {formatTime(request.return_time)}
                              </p>
                            </div>
                            <div>
                              <strong>Travel type: </strong>
                              <p>{request.type}</p>
                            </div>
                          </div>
                          {/* third child */}
                          <div className="request-more-info-third-child">
                            <div className="request-more-info-third-child-passengers">
                              <strong
                                style={{
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Passengers:{" "}
                              </strong>
                              <p
                                style={{
                                  wordBreak: "break-word",
                                }}
                              >
                                {request.passenger_name}
                              </p>
                            </div>
                            <div className="request-more-info-third-child-driver">
                              <div>
                                <strong>Driver: </strong>
                                <p>{request.driver_full_name}</p>
                              </div>
                              <div>
                                <strong>Contact No.: </strong>
                                <p>{request.driver_mobile_number}</p>
                              </div>
                            </div>
                          </div>
                          {/* fourth child */}
                          <div className="request-more-info-fourth-child">
                            <div className="request-more-info-fourth-child-purpose">
                              <strong
                                style={{
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Purpose:{" "}
                              </strong>
                              <p
                                style={{
                                  wordBreak: "break-word",
                                }}
                              >
                                {request.purpose}
                              </p>
                            </div>
                            <div>
                              <strong>Status: </strong>
                              <p>{request.status}</p>
                            </div>
                          </div>
                          {isFifthyKilometers && (
                            <div className="request-more-info-fifth-child">
                              <p>
                                <strong>Note:</strong> Requesters traveling to
                                destinations exceed 50 kilometers are required
                                to provide a travel order for the vehicle's fuel
                                and
                                <br></br>
                                the driver's per diem.
                              </p>
                            </div>
                          )}
                        </animated.div>
                      )}
                    </>
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
