import "./dashboardOS.css";
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

type SidebarItem = {
  icon: any;
  text: string;
  path: string;
};

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
  { icon: faClipboardList, text: "Requests", path: "/Requests" },
  { icon: faCar, text: "Vehicles", path: "/Vehicles" },
  { icon: faCalendarAlt, text: "Schedules", path: "/Schedules" },
  { icon: faUser, text: "Drivers", path: "/Drivers" },
];

export default function DashboardOS() {
  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
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
