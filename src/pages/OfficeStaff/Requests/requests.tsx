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
import { formatDate } from "../../../components/functions/getTimeElapsed";

export default function Requests() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [requestList, setRequestList] = useState<RequestFormProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestFormProps | null>(null);
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
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

  fetchNotification(setNotifList);

  NotificationCreatedCancelWebsocket();

  useEffect(() => {
    fetchRequestOfficeStaffAPI(setRequestList);

    const intervalId = setInterval(() => {
      fetchRequestOfficeStaffAPI(setRequestList);
    }, 60000);

    return () => clearInterval(intervalId);
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

    if (isCategoryMatch && selectedCategory === "Logs" && request.travel_date) {
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
      (request.travel_date &&
        request.travel_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.destination &&
        request.destination.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (selectedCategory === "Logs" &&
        (request.requester_full_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          (request.travel_date &&
            request.travel_date
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.destination &&
            request.destination
              .toLowerCase()
              .includes(searchTerm.toLowerCase())))) ||
      (selectedCategory !== "Logs" &&
        request.requester_full_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      request.request_id.toString().includes(searchTerm.toLowerCase()) ||
      (request.travel_date &&
        request.travel_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.destination &&
        request.destination.toLowerCase().includes(searchTerm.toLowerCase()));

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
    let validationErrors: { [key: string]: string } = {};

    if (!selectedDriverId) {
      validationErrors.driverSelectionError = "Please select a driver!";
    }
    console.log(selectedDriverId);
    if (selectedDriverId === null) {
      validationErrors.driverSelectionError = "Please select a driver!";
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);
    if (Object.keys(validationErrors).length === 0) {
      approveRequestAPI(
        requestId,
        selectedDriverId,
        setIsRequestFormOpen,
        setIsConfirmationOpen
      );
    }
  };

  const handleCompleted = () => {
    maintenanceAbsenceCompletedRequestAPI(
      requestId,
      setIsConfirmationCompletedOpen,
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
        <div className="margin-top"></div>
        <div className="request-row">
          <SearchBar onSearchChange={handleSearchChange} />
          <div className="status-legend">
            <div className="ontrip-yess-container">
              <div className="ontrip-yess"></div>
              <p>On Trip</p>
            </div>
            <div className="ontrip-noo-container">
              <div className="ontrip-noo"></div>
              <p>Awaiting Trip</p>
            </div>
            <div className="ontrip-gray-container">
              <div className="ontrip-gray"></div>
              <p>No Awaiting Trip</p>
            </div>
          </div>
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
                <th></th>
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
                      <td>{formatDate(request.travel_date)}</td>
                      <td>
                        {request.vehicle_driver_status === "On Trip"
                          ? request.vehicle_driver_status
                          : request.status}
                      </td>
                      <td>
                        {request.status === "Completed" ||
                        request.status === "Canceled" ||
                        request.status === "Rejected" ? (
                          <div className="ontrip-completed"></div>
                        ) : (
                          <>
                            {request.vehicle_driver_status === "On Trip" ? (
                              <div className="ontrip-yes"></div>
                            ) : (
                              <div className="ontrip-no"></div>
                            )}
                          </>
                        )}
                      </td>
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
        setIsOpen={setIsRequestFormOpen}
        onRequestClose={handleCloseRequestForm}
        selectedRequest={selectedRequestDetails[0]}
        onApprove={(selectedDriverId) =>
          handleConfirmationApprove(selectedDriverId)
        }
        onComplete={handleCompleted}
        errorMessages={errorMessages}
        setErrorMessages={setErrorMessages}
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
