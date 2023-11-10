import { useState, useEffect } from "react";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./requests.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";
import { SidebarItem } from "../../../interfaces/interfaces";
import RequestFormDetails from "../../../components/form/requestformdetails";
import Confirmation from "../../../components/confirmation/confirmation";
import { RequestFormProps } from "../../../interfaces/interfaces";
import {
  approveRequestAPI,
  fetchRequestOfficeStaffAPI,
  fetchNotification,
  maintenanceAbsenceCompletedRequestAPI,
  rejectRequestAPI,
} from "../../../components/api/api";
import { NotificationCreatedCancelWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export default function Requests() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [requestList, setRequestList] = useState<RequestFormProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestFormProps | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationCompletedOpen, setIsConfirmationCompletedOpen] =
    useState(false);
  const [isConfirmationRejectedOpen, setIsConfirmationRejectedOpen] =
    useState(false);
  const requestId = selectedRequest?.request_id;
  const currentDate = new Date();
  const [notifList, setNotifList] = useState<any[]>([]);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
  const sidebarData: SidebarItem[] = [
    { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
    {
      icon: faClipboardList,
      text: "Requests",
      path: "/Requests",
      notification: notifLength >= 1 ? notifLength : undefined,
    },
    { icon: faCar, text: "Vehicles", path: "/Vehicles" },
    { icon: faCalendarAlt, text: "Schedules", path: "/Schedules" },
    { icon: faUser, text: "Drivers", path: "/Drivers" },
    { icon: faUsersCog, text: "Administration", path: "/Admin" },
  ];
  useEffect(() => {
    fetchNotification(setNotifList);
  }, []);

  useEffect(() => {
    NotificationCreatedCancelWebsocket();
  }, []);

  useEffect(() => {
    fetchRequestOfficeStaffAPI(setRequestList);
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredRequestList = requestList.filter((request) => {
    const isCategoryMatch =
      selectedCategory === "All" ||
      request.status === selectedCategory ||
      request.purpose === selectedCategory ||
      selectedCategory === "Logs" ||
      selectedCategory === null;

    if (isCategoryMatch && selectedCategory === "Logs") {
      const [year, month, day] = request.travel_date.split("-");
      const [hours, minutes] = request.travel_time.split(":");
      const requestDate = new Date(year, month - 1, day, hours, minutes);
      return requestDate < currentDate;
    }
    const isSearchMatch =
      searchTerm === "" ||
      request.requester_full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.travel_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (selectedCategory === "Logs" &&
        (request.requester_full_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          request.travel_date
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))) ||
      (selectedCategory !== "Logs" &&
        request.requester_full_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      request.request_id.toString().includes(searchTerm.toLowerCase()) ||
      request.travel_date.toLowerCase().includes(searchTerm.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

  const handleCategoryChange = (status: string) => {
    setSelectedCategory(status);
  };

  const handleOpenRequestForm = (request: RequestFormProps) => {
    setSelectedRequest(request);

    if (request.status === "Pending") {
      setIsRequestFormOpen(true);
      setIsConfirmationOpen(false);
    } else {
      setIsRequestFormOpen(true);
      setIsConfirmationOpen(false);
    }
  };

  const handleCloseRequestForm = () => {
    setIsRequestFormOpen(false);
  };
  const handleConfirmationApprove = (selectedDriverId: any) => {
    approveRequestAPI(
      requestId,
      selectedDriverId,
      setIsRequestFormOpen,
      setIsConfirmationOpen
    );
  };

  const handleCompleted = () => {
    maintenanceAbsenceCompletedRequestAPI(
      requestId,
      setIsConfirmationCompletedOpen,
      setIsRequestFormOpen,
      setLoadingBarProgress
    );
  };

  const handleReject = () => {
    rejectRequestAPI(
      requestId,
      setIsConfirmationRejectedOpen,
      setIsRequestFormOpen,
      setLoadingBarProgress
    );
  };

  const selectedRequestDetails = selectedRequest
    ? requestList.filter(
        (request) => request.request_id === selectedRequest.request_id
      )
    : [];

  filteredRequestList.reverse();
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
        <div className="margin-top">
          <Label label="Request" />
        </div>
        <div className="request-row">
          <SearchBar onSearchChange={handleSearchChange} />
          <Dropdown
            status={[
              "All",
              "Pending",
              "Awaiting Vehicle Alteration",
              "Approved",
              "Approved - Alterate Vehicle",
              "Canceled",
              "Rejected",
              "Vehicle Maintenance",
              "Driver Absence",
              "Logs",
            ]}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="request-container">
          <table
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 20px",
            }}
          >
            <thead>
              <tr>
                <th>Request No.</th>
                <th>Requested by</th>
                <th>Travel Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequestList.length === 0 ? (
                <tr>
                  <td colSpan={4}>No request available</td>
                </tr>
              ) : (
                filteredRequestList.map((request) => (
                  <>
                    <tr
                      key={request.request_id}
                      onClick={() => handleOpenRequestForm(request)}
                    >
                      <td>{request.request_id}</td>
                      <td>{request.requester_full_name}</td>
                      <td>{request.travel_date}</td>
                      <td>{request.status}</td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>

      <RequestFormDetails
        isOpen={isRequestFormOpen}
        onRequestClose={handleCloseRequestForm}
        selectedRequest={selectedRequestDetails[0]}
        onApprove={(selectedDriverId) =>
          handleConfirmationApprove(selectedDriverId)
        }
        onComplete={handleCompleted}
        onReject={handleReject}
      />

      <Confirmation isOpen={isConfirmationOpen} header="Request Approved!" />
      <Confirmation isOpen={isConfirmationCompletedOpen} header="Completed!" />
      <Confirmation
        isOpen={isConfirmationRejectedOpen}
        header="Request Rejected!"
      />
    </>
  );
}
