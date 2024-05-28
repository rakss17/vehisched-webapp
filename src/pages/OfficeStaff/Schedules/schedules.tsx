import { useState, useEffect } from "react";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import "./schedules.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import { NotificationCreatedCancelWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RequestFormProps, SidebarItem } from "../../../interfaces/interfaces";
import {
  fetchNotification,
  fetchScheduleOfficeStaff,
  maintenanceAbsenceCompletedRequestAPI,
} from "../../../components/api/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDate } from "../../../components/functions/functions";
import RequestFormDetails from "../../../components/form/requestformdetails";
import LoadingBar from "react-top-loading-bar";
import Confirmation from "../../../components/confirmation/confirmation";

export default function Schedules() {
  const [schedulesData, setSchedulesData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedSched, setSelectedSched] = useState<string>("Today");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifList, setNotifList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestFormProps | null>(null);
  const requestId = selectedRequest?.request_id;
  const [isConfirmationCompletedOpen, setIsConfirmationCompletedOpen] =
    useState(false);
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
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

  NotificationCreatedCancelWebsocket(
    () => {},
    fetchNotification,
    setNotifList,
    () => {},
    () => {},
    () => {}
  );

  useEffect(() => {
    fetchScheduleOfficeStaff(setSchedulesData, setIsLoading);
  }, []);

  useEffect(() => {
    if (schedulesData.length > 0) {
      handleButtonClick("Today");
    }
  }, [schedulesData]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleButtonClick = (sched: string) => {
    const currentDate = new Date().toISOString().split("T")[0];

    let filteredData;
    switch (sched) {
      case "Today":
        filteredData = schedulesData.filter(
          (schedule) => schedule.travel_date === currentDate
        );
        break;
      case "Upcoming":
        filteredData = schedulesData.filter(
          (schedule) => schedule.travel_date > currentDate
        );
        break;

      default:
        filteredData = [];
        break;
    }
    setFilteredData(filteredData);
    setSelectedSched(sched);
  };

  const filteredSchedulesData = filteredData.filter((schedule) => {
    const isSearchMatch =
      searchTerm === "" ||
      schedule.request_id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      schedule.requester_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      schedule.travel_time.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedSched === "Today") {
      return isSearchMatch;
    } else if (selectedSched === "Upcoming") {
      return (
        isSearchMatch ||
        schedule.travel_date.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });
  const selectedRequestDetails = selectedRequest
    ? filteredSchedulesData.filter(
        (request) => request.request_id === selectedRequest.request_id
      )
    : [];

  const handleCompleted = () => {
    maintenanceAbsenceCompletedRequestAPI(
      requestId,
      setIsConfirmationCompletedOpen,
      setIsRequestFormOpen,
      setLoadingBarProgress
    );
  };
  const handleCloseRequestForm = () => {
    setIsRequestFormOpen(false);
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
        <div className="schedules-margin-top">
          <Label label="Schedules" />
        </div>
        <div className="schedules-container">
          <div className="schedules-row">
            <div className="button-container">
              <button
                onClick={() => handleButtonClick("Today")}
                className={selectedSched === "Today" ? "active" : ""}
              >
                Today
              </button>
              <button
                onClick={() => handleButtonClick("Upcoming")}
                className={selectedSched === "Upcoming" ? "active" : ""}
              >
                Upcoming
              </button>
            </div>
            <div className="searchbar-container">
              <SearchBar onSearchChange={handleSearchChange} />
            </div>
          </div>

          <div className="table-container">
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 20px",
              }}
            >
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Requested by</th>
                  <th>Time</th>
                  {selectedSched === "Upcoming" && <th>Date</th>}
                </tr>
              </thead>
              {filteredSchedulesData.length === 0 ? (
                <>
                  {isLoading ? (
                    <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                      <tr>
                        <td colSpan={4}>
                          <Skeleton count={10} height={60} />
                        </td>
                      </tr>
                    </SkeletonTheme>
                  ) : (
                    <tr>
                      <td colSpan={4}>No reservation found.</td>
                    </tr>
                  )}
                </>
              ) : (
                <tbody>
                  {filteredSchedulesData.map((schedule, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setIsRequestFormOpen(true);
                        setSelectedRequest(schedule);
                      }}
                    >
                      <td style={{ wordWrap: "break-word", maxWidth: "150px" }}>
                        {schedule.destination
                          ? schedule.destination.split(",")[0].trim()
                          : "N/A"}
                      </td>
                      <td>{schedule.requester_name}</td>
                      <td>{formatTime(schedule.travel_time)}</td>
                      {selectedSched === "Upcoming" && (
                        <td>{formatDate(schedule.travel_date)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </Container>
      <RequestFormDetails
        isOpen={isRequestFormOpen}
        setIsOpen={setIsRequestFormOpen}
        onRequestClose={handleCloseRequestForm}
        selectedRequest={selectedRequestDetails[0]}
        onComplete={handleCompleted}
        fetchRequestOfficeStaffAPI={fetchScheduleOfficeStaff}
        setRequestList={setSchedulesData}
      />
      <Confirmation isOpen={isConfirmationCompletedOpen} header="Completed!" />
    </>
  );
}
