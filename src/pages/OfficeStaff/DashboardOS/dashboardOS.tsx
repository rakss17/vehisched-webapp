import "./dashboardOS.css";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Header from "../../../components/header/header";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../../../components/sidebar/sidebar";
import CalendarSchedule from "../../../components/calendar/calendar";
import Label from "../../../components/label/label";
import { NotificationCreatedCancelWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RequestFormProps, SidebarItem } from "../../../interfaces/interfaces";
import {
  fetchEachVehicleSchedule,
  fetchNotification,
  maintenanceAbsenceCompletedRequestAPI,
} from "../../../components/api/api";
import RequestFormDetails from "../../../components/form/requestformdetails";
import Confirmation from "../../../components/confirmation/confirmation";
import LoadingBar from "react-top-loading-bar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardOS() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [schedulesData, setSchedulesData] = useState<any[]>([]);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [isConfirmationCompletedOpen, setIsConfirmationCompletedOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestFormProps | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [notifList, setNotifList] = useState<any[]>([]);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
  const requestId = selectedRequest?.request_id;
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
        const newRequests = await fetchEachVehicleSchedule(page);

        if (newRequests && newRequests.data) {
          const updatedData: any = {};

          Object.keys(newRequests.data).forEach((vehicleKey) => {
            const vehicleObj = newRequests.data[vehicleKey];
            if (vehicleObj) {
              updatedData[vehicleKey] = vehicleObj;
            } else {
              console.error(
                `Vehicle object for key ${vehicleKey} is undefined.`
              );
            }
          });

          setSchedulesData((prevData) => {
            const mergedData = { ...prevData };

            Object.keys(updatedData).forEach((vehicleKey: any) => {
              const newVehicle = updatedData[vehicleKey];
              const prevVehicle = prevData[vehicleKey];

              if (
                !prevVehicle ||
                prevVehicle.plate_number !== newVehicle.plate_number
              ) {
                mergedData[vehicleKey] = newVehicle;
              }
            });

            return mergedData;
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
  }, [page]);

  const handleCloseRequestForm = () => {
    setIsRequestFormOpen(false);
  };

  const selectedRequestDetails = selectedRequest
    ? Object.values(schedulesData).flatMap((vehicleSchedule) =>
        vehicleSchedule.schedules.filter(
          (schedule: any) => schedule.request_id === selectedRequest.request_id
        )
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
  const handleOpenRequestForm = (event: any) => {
    setIsRequestFormOpen(true);
    setSelectedRequest(event.scheduleDetails);
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
      <div className="dashboard-container">
        <ToastContainer />
        <div className="dashboard-label">
          <Label label="Dashboard" />
        </div>

        {Object.keys(schedulesData).length === 0 ? (
          <>
            {isLoading ? (
              <div className="calendar-skeleton-container">
                <div>
                  <div className="calendar-skeleton-label-container">
                    <SkeletonTheme baseColor="#d9d9d9" highlightColor="#f5f5f5">
                      <Skeleton count={1} height={60} width={400} />
                    </SkeletonTheme>
                  </div>

                  <SkeletonTheme baseColor="#d9d9d9" highlightColor="#f5f5f5">
                    <Skeleton count={1} height={500} width={600} />
                  </SkeletonTheme>
                </div>
                <div>
                  <div className="calendar-skeleton-label-container">
                    <SkeletonTheme baseColor="#d9d9d9" highlightColor="#f5f5f5">
                      <Skeleton count={1} height={60} width={400} />
                    </SkeletonTheme>
                  </div>
                  <SkeletonTheme baseColor="#d9d9d9" highlightColor="#f5f5f5">
                    <Skeleton count={1} height={500} width={600} />
                  </SkeletonTheme>
                </div>
              </div>
            ) : (
              <div className="no-sched">
                <p>No schedules found.</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="calendar-column-container">
              <>
                {Object.entries(schedulesData).map(
                  ([vehicleId, data], index) => (
                    <React.Fragment key={vehicleId}>
                      <div
                        key={index}
                        ref={
                          index === Object.keys(schedulesData).length - 1
                            ? lastRequestElementRef
                            : null
                        }
                      >
                        <p>{data.vehicle}</p>
                        <CalendarSchedule
                          schedulesData={data.schedules}
                          onSelectEvent={handleOpenRequestForm}
                        />
                      </div>
                    </React.Fragment>
                  )
                )}
                {isLoading && Object.keys(schedulesData).length > 0 && (
                  <div className="calendar-skeleton-container">
                    <div>
                      <div className="calendar-skeleton-label-container">
                        <SkeletonTheme
                          baseColor="#d9d9d9"
                          highlightColor="#f5f5f5"
                        >
                          <Skeleton count={1} height={60} width={400} />
                        </SkeletonTheme>
                      </div>

                      <SkeletonTheme
                        baseColor="#d9d9d9"
                        highlightColor="#f5f5f5"
                      >
                        <Skeleton count={1} height={500} width={600} />
                      </SkeletonTheme>
                    </div>
                    <div>
                      <div className="calendar-skeleton-label-container">
                        <SkeletonTheme
                          baseColor="#d9d9d9"
                          highlightColor="#f5f5f5"
                        >
                          <Skeleton count={1} height={60} width={400} />
                        </SkeletonTheme>
                      </div>
                      <SkeletonTheme
                        baseColor="#d9d9d9"
                        highlightColor="#f5f5f5"
                      >
                        <Skeleton count={1} height={500} width={600} />
                      </SkeletonTheme>
                    </div>
                  </div>
                )}
              </>
            </div>
          </>
        )}
      </div>
      <RequestFormDetails
        isOpen={isRequestFormOpen}
        setIsOpen={setIsRequestFormOpen}
        onRequestClose={handleCloseRequestForm}
        selectedRequest={selectedRequestDetails[0]}
        onComplete={handleCompleted}
        fetchRequestOfficeStaffAPI={fetchEachVehicleSchedule}
        setRequestList={setSchedulesData}
      />
      <Confirmation isOpen={isConfirmationCompletedOpen} header="Completed!" />
    </>
  );
}
