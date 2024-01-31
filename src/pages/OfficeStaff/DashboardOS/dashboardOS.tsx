import "./dashboardOS.css";
import React, { useEffect, useState } from "react";
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

export default function DashboardOS() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [schedulesData, setSchedulesData] = useState<any[]>([]);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [isConfirmationCompletedOpen, setIsConfirmationCompletedOpen] =
    useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestFormProps | null>(null);
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
    () => {},
    fetchNotification,
    setNotifList
  );

  // useEffect(() => {
  //   const currentDate = format(new Date(), "yyyy-MM-dd");
  //   fetchScheduleOfficeStaff((data: any) => {
  //     const todayTrips = data.filter(
  //       (schedule: any) => schedule.travel_date === currentDate
  //     ).length;
  //     setTodayTrips(todayTrips);
  //     setSchedulesData(data);
  //   });
  // }, []);

  useEffect(() => {
    fetchEachVehicleSchedule(setSchedulesData);
  }, []);

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
        <div>
          <Label label="Dashboard" />
        </div>

        {/* <div onClick={handleOnClickTodaysTrip} className="today-trip">
            <p>Today's Trip</p>
            <h2>{todayTrips}</h2>
          </div> */}
        <div className="calendar-column-container">
          {Object.entries(schedulesData).map(([vehicleId, data]) => (
            <React.Fragment key={vehicleId}>
              <div>
                <p>{data.vehicle}</p>
                <CalendarSchedule
                  schedulesData={data.schedules}
                  onSelectEvent={handleOpenRequestForm}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
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
