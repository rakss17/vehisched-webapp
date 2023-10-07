import { useState, useEffect } from "react";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./schedules.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import { NotificationWebsocket } from "../../../components/api/websocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarItem } from "../../../interfaces/interfaces";
import {
  fetchNotification,
  fetchScheduleOfficeStaff,
} from "../../../components/api/api";

export default function Schedules() {
  const [schedulesData, setSchedulesData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [selectedSched, setSelectedSched] = useState<string>("Today");
  const [searchTerm, setSearchTerm] = useState("");
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
  ];
  useEffect(() => {
    fetchNotification(setNotifList);
  }, []);

  useEffect(() => {
    NotificationWebsocket();
  }, []);

  useEffect(() => {
    fetchScheduleOfficeStaff(setSchedulesData);
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleButtonClick = (sched: string) => {
    const currentDate = new Date().toISOString().split("T")[0];

    let filteredData;
    switch (sched) {
      case "Today":
        filteredData = schedulesData.filter(
          (schedule) =>
            schedule.travel_date === currentDate &&
            schedule.travel_time >= new Date().toLocaleTimeString()
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

  useEffect(() => {
    handleButtonClick("Today");
  }, []);
  const filteredSchedulesData = filteredData.filter((schedule) => {
    const isSearchMatch =
      searchTerm === "" ||
      schedule.request_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      schedule.requester_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      schedule.time.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedSched === "Today") {
      return isSearchMatch;
    } else if (selectedSched === "Upcoming") {
      return (
        isSearchMatch ||
        schedule.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });

  return (
    <>
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
                  <th>Request No.</th>
                  <th>Requested by</th>
                  <th>Time</th>
                  {selectedSched === "Upcoming" && <th>Date</th>}
                </tr>
              </thead>
              {filteredSchedulesData.length === 0 ? (
                <p className="schedules-null">No schedules available</p>
              ) : (
                <tbody>
                  {filteredSchedulesData.map((schedule, index) => (
                    <tr key={index}>
                      <td>{schedule.request_id}</td>
                      <td>{schedule.requester_name}</td>
                      <td>{schedule.travel_time}</td>
                      {selectedSched === "Upcoming" && (
                        <td>{schedule.travel_date}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}
