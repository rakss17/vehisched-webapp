import { useState, useEffect, useCallback, useRef } from "react";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
  faUsersCog,
  faRoad,
  faSchool,
  faCircleExclamation,
  faM,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./requests.css";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";
import { SidebarItem } from "../../../interfaces/interfaces";
import RequestFormDetails from "../../../components/form/requestformdetails";
import Confirmation from "../../../components/confirmation/confirmation";
import { RequestFormProps } from "../../../interfaces/interfaces";
import {
  fetchRequestOfficeStaffAPI,
  fetchNotification,
  maintenanceAbsenceCompletedRequestAPI,
} from "../../../components/api/api";
import { NotificationCreatedCancelWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { formatDate } from "../../../components/functions/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HoverDescription from "../../../components/hoverdescription/hoverdescription";
import CommonButton from "../../../components/button/commonbutton";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Requests() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [requestList, setRequestList] = useState<RequestFormProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All"
  );
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [isTravelOrderNoteHovered, setIsTravelOrderNoteHovered] =
    useState(false);
  const [isMergedWithNoteHovered, setIsMergedWithNoteHovered] = useState(false);
  const [isOnTripHovered, setIsOnTripHovered] = useState(false);
  const [isAwaitingTripHovered, setIsAwaitingTripHovered] = useState(false);
  const [hoverIdentification, setHoverIdentification] = useState("");
  const [selectedRequest, setSelectedRequest] =
    useState<RequestFormProps | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationCompletedOpen, setIsConfirmationCompletedOpen] =
    useState(false);
  const requestId = selectedRequest?.request_id;
  const currentDate = new Date();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [notifList, setNotifList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  NotificationCreatedCancelWebsocket(
    () => {},
    setSelectedCategory,
    fetchNotification,
    setNotifList,
    setRequestList,
    setPage,
    setHasMore
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRequestElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((old) => old + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const newRequests = await fetchRequestOfficeStaffAPI(
          page,
          selectedCategory,
          searchTerm
        );
        console.log("new request", newRequests);
        if (newRequests.data && newRequests.data.length > 0) {
          setRequestList((old) => {
            const newData = newRequests.data.filter(
              (newItem: any) =>
                !old.some(
                  (oldItem) => oldItem.request_id === newItem.request_id
                )
            );
            return [...old, ...newData];
          });
          if (!newRequests.next_page) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching request list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, selectedCategory, searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setRequestList([]);
    setPage(1);
    setHasMore(true);
  };

  const handleCategoryChange = (status: string) => {
    setRequestList([]);
    setPage(1);
    setSelectedCategory(status);
    setHasMore(true);
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

  const navigate = useNavigate();
  const handleCreateRequest = () => {
    navigate("/RequestForm");
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
        <div className="margin-top"></div>
        <div className="request-row">
          <SearchBar
            onSearchChange={handleSearchChange}
            placeholder="Search by requester's name or office name or purpose"
          />
          {/* <div className="status-legend">
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
          </div> */}
          <Dropdown
            status={[
              "All",
              "Pending",
              "Awaiting Vehicle Alteration",
              "Approved",
              "Approved - Alterate Vehicle",
              "Canceled",
              "Rejected",
              "Ongoing Vehicle Maintenance",
              "Driver Absence",
              "Logs",
            ]}
            selectedLabel={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <CommonButton
            onClick={handleCreateRequest}
            text="Create Request"
            primaryStyle
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
                <th>Vehicle</th>
                <th>Travel Date</th>
                <th>Purpose</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requestList.length === 0 ? (
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
                requestList.map((request, index) => (
                  <>
                    <tr
                      key={request.request_id}
                      ref={
                        index === requestList.length - 1
                          ? lastRequestElementRef
                          : null
                      }
                      onClick={() => handleOpenRequestForm(request)}
                    >
                      <td>{request.vehicle_model}</td>
                      <td>{formatDate(request.travel_date)}</td>
                      <td style={{ wordWrap: "break-word", maxWidth: "150px" }}>
                        {request.purpose}
                      </td>
                      <td>
                        {request.vehicle_driver_status === "On Trip"
                          ? request.vehicle_driver_status
                          : request.status}
                      </td>
                      <td>
                        {request.status === "Completed" ||
                        request.status === "Canceled" ||
                        request.status === "Rejected" ||
                        request.status === "Driver Absence" ||
                        request.status === "Vehicle Maintenance" ? (
                          <div className="ontrip-completed"></div>
                        ) : (
                          <>
                            {request.status !== "Pending" && (
                              <>
                                {request.vehicle_driver_status === "On Trip" ? (
                                  <div className="ontrip-yes">
                                    <FontAwesomeIcon
                                      icon={faRoad}
                                      color="gray"
                                      className="fa-road"
                                      onMouseOver={() => {
                                        setIsOnTripHovered(true);
                                        setHoverIdentification(
                                          request.request_id
                                        );
                                      }}
                                      onMouseOut={() => {
                                        setIsOnTripHovered(false);
                                        setHoverIdentification("");
                                      }}
                                    />

                                    <FontAwesomeIcon
                                      icon={faCar}
                                      className="fa-car"
                                      onMouseOver={() => {
                                        setIsOnTripHovered(true);
                                        setHoverIdentification(
                                          request.request_id
                                        );
                                      }}
                                      onMouseOut={() => {
                                        setIsOnTripHovered(false);
                                        setHoverIdentification("");
                                      }}
                                    />
                                    {isOnTripHovered &&
                                      hoverIdentification ===
                                        request.request_id && (
                                        <HoverDescription
                                          description="On Trip"
                                          top={2}
                                          width={5}
                                          height={5}
                                        />
                                      )}
                                  </div>
                                ) : (
                                  <div className="ontrip-no">
                                    <FontAwesomeIcon
                                      color="gray"
                                      icon={faSchool}
                                      className="fa-school"
                                      onMouseOver={() => {
                                        setIsAwaitingTripHovered(true);
                                        setHoverIdentification(
                                          request.request_id
                                        );
                                      }}
                                      onMouseOut={() => {
                                        setIsAwaitingTripHovered(false);
                                        setHoverIdentification("");
                                      }}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCar}
                                      className="fa-car-pending"
                                      onMouseOver={() => {
                                        setIsAwaitingTripHovered(true);
                                        setHoverIdentification(
                                          request.request_id
                                        );
                                      }}
                                      onMouseOut={() => {
                                        setIsAwaitingTripHovered(false);
                                        setHoverIdentification("");
                                      }}
                                    />
                                    {isAwaitingTripHovered &&
                                      hoverIdentification ===
                                        request.request_id && (
                                        <HoverDescription
                                          description="Awaiting Trip"
                                          top={3}
                                          width={7}
                                          height={6}
                                        />
                                      )}
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </td>
                      <td>
                        {request.merged_with && (
                          <div style={{ position: "relative" }}>
                            <FontAwesomeIcon
                              keyTimes={request.request_id}
                              icon={faM}
                              color="#060e57"
                              onMouseOver={() => {
                                setIsMergedWithNoteHovered(true);
                                setHoverIdentification(request.request_id);
                              }}
                              onMouseOut={() => {
                                setIsMergedWithNoteHovered(false);
                                setHoverIdentification("");
                              }}
                            />
                            {isMergedWithNoteHovered &&
                              hoverIdentification === request.request_id && (
                                <HoverDescription
                                  description={`This request is merged with Request No. ${request.merged_with}`}
                                  right={0}
                                  width={12}
                                />
                              )}
                          </div>
                        )}
                      </td>
                      <td>
                        {request.distance >= 50 && (
                          <div style={{ position: "relative" }}>
                            <FontAwesomeIcon
                              keyTimes={request.request_id}
                              icon={faCircleExclamation}
                              color="#060e57"
                              onMouseOver={() => {
                                setIsTravelOrderNoteHovered(true);
                                setHoverIdentification(request.request_id);
                              }}
                              onMouseOut={() => {
                                setIsTravelOrderNoteHovered(false);
                                setHoverIdentification("");
                              }}
                            />
                            {isTravelOrderNoteHovered &&
                              hoverIdentification === request.request_id && (
                                <HoverDescription
                                  description="A travel order is required for this trip"
                                  right={0}
                                  width={10}
                                  height={8}
                                />
                              )}
                          </div>
                        )}
                      </td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
          {isLoading && requestList.length > 0 && (
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
              <Skeleton count={3} height={60} width={1250} />
            </SkeletonTheme>
          )}
        </div>
      </Container>

      <RequestFormDetails
        isOpen={isRequestFormOpen}
        setIsOpen={setIsRequestFormOpen}
        onRequestClose={handleCloseRequestForm}
        selectedRequest={selectedRequestDetails[0]}
        onComplete={handleCompleted}
        fetchRequestOfficeStaffAPI={fetchRequestOfficeStaffAPI}
        setRequestList={setRequestList}
      />

      <Confirmation isOpen={isConfirmationOpen} header="Request Approved!" />
      <Confirmation isOpen={isConfirmationCompletedOpen} header="Completed!" />
    </>
  );
}
