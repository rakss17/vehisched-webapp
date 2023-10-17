import "./dashboardOS.css";
import { useEffect, useState } from "react";
import Header from "../../../components/header/header";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

import Sidebar from "../../../components/sidebar/sidebar";
import CalendarSchedule from "../../../components/calendar/calendar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import { NotificationCreatedCancelWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarItem } from "../../../interfaces/interfaces";
import {
  fetchNotification,
  fetchScheduleOfficeStaff,
} from "../../../components/api/api";
import { useNavigate } from "react-router-dom";

export default function DashboardOS() {
  const [schedulesData, setSchedulesData] = useState<any[]>([]);
  const [todayTrips, setTodayTrips] = useState<number>(0);
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
  const navigate = useNavigate();
  useEffect(() => {
    fetchNotification(setNotifList);
  }, []);
  useEffect(() => {
    NotificationCreatedCancelWebsocket();
  }, []);

  useEffect(() => {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    fetchScheduleOfficeStaff((data: any) => {
      const todayTrips = data.filter(
        (schedule: any) => schedule.travel_date === currentDate
      ).length;
      setTodayTrips(todayTrips);
      setSchedulesData(data);
    });
  }, []);

  const handleOnClickTodaysTrip = () => {
    navigate("/Schedules");
  };

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <ToastContainer />
        <Label label="Dashboard" />
        <div className="dashboard-container">
          <div onClick={handleOnClickTodaysTrip} className="today-trip">
            <p>Today's Trip</p>
            <h2>{todayTrips}</h2>
          </div>
          <CalendarSchedule schedulesData={schedulesData} />
        </div>
      </Container>
    </>
  );
}
