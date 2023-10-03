import "./dashboardOS.css";
import { useEffect, useState } from "react";
import Header from "../../../components/header/header";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../../components/sidebar/sidebar";
import CalendarSchedule from "../../../components/calendar/calendar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import { NotificationWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarItem } from "../../../interfaces/interfaces";

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
  {
    icon: faClipboardList,
    text: "Requests",
    path: "/Requests",
    notification: 0,
  },
  { icon: faCar, text: "Vehicles", path: "/Vehicles" },
  { icon: faCalendarAlt, text: "Schedules", path: "/Schedules" },
  { icon: faUser, text: "Drivers", path: "/Drivers" },
];

export default function DashboardOS() {
  useEffect(() => {
    NotificationWebsocket();
  }, []);
  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <ToastContainer />
        <Label label="Dashboard" />
        <div className="dashboard-container">
          <div className="today-trip">
            <p>Today's Trip</p>
            <h2>10</h2>
          </div>
          <CalendarSchedule />
        </div>
      </Container>
    </>
  );
}
