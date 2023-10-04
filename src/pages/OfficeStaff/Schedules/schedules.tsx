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
import { fetchNotification } from "../../../components/api/api";

interface TableData {
  label: string;
  content: { [key: string]: string }[];
  columns: string[];
}

const fetchedTodayData = [
  {
    request_number: "1",
    requester_name: "Bohari S. Ambulo",
    time: "10:00 am",
  },
  {
    request_number: "2",
    requester_name: "Jane Doe",
    time: "11:30 am",
  },
  {
    request_number: "3",
    requester_name: "John Smith",
    time: "2:15 pm",
  },
  {
    request_number: "4",
    requester_name: "Alice Johnson",
    time: "3:45 pm",
  },
  {
    request_number: "5",
    requester_name: "Michael Lee",
    time: "4:30 pm",
  },
  {
    request_number: "5",
    requester_name: "Michael Lee",
    time: "4:30 pm",
  },
  {
    request_number: "5",
    requester_name: "Michael Lee",
    time: "4:30 pm",
  },
  {
    request_number: "5",
    requester_name: "Michael Lee",
    time: "4:30 pm",
  },
  {
    request_number: "5",
    requester_name: "Michael Lee",
    time: "4:30 pm",
  },
  {
    request_number: "5",
    requester_name: "Michael Lee",
    time: "4:30 pm",
  },
  {
    request_number: "5",
    requester_name: "Michael Lee",
    time: "4:30 pm",
  },
];

const fetchedUpcomingData = [
  {
    request_number: "1",
    requester_name: "Bohari S. Ambulo",
    time: "10:00 am",
    date: "2023-07-30",
  },
  {
    request_number: "2",
    requester_name: "Jane Doe",
    time: "11:30 am",
    date: "2023-07-30",
  },
  {
    request_number: "3",
    requester_name: "John Smith",
    time: "2:15 pm",
    date: "2023-07-30",
  },
  {
    request_number: "4",
    requester_name: "Alice Johnson",
    time: "3:45 pm",
    date: "2023-07-31",
  },
  {
    request_number: "5",
    requester_name: "Michael Lee",
    time: "4:30 pm",
    date: "2023-07-31",
  },
  {
    request_number: "6",
    requester_name: "Sarah Williams",
    time: "5:00 pm",
    date: "2023-07-31",
  },
  {
    request_number: "7",
    requester_name: "David Clark",
    time: "6:15 pm",
    date: "2023-08-01",
  },
  {
    request_number: "8",
    requester_name: "Emily Adams",
    time: "9:30 am",
    date: "2023-08-01",
  },
  {
    request_number: "9",
    requester_name: "Robert Turner",
    time: "1:00 pm",
    date: "2023-08-02",
  },
  {
    request_number: "10",
    requester_name: "Sophia Martinez",
    time: "7:45 pm",
    date: "2023-08-02",
  },
];

export default function Schedules() {
  const [schedulesData, setSchedulesData] = useState<any[]>([]);
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

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleButtonClick = (sched: string) => {
    switch (sched) {
      case "Today":
        setSchedulesData(fetchedTodayData);
        break;
      case "Upcoming":
        setSchedulesData(fetchedUpcomingData);
        break;

      default:
        setSchedulesData([]);
        break;
    }
    setSelectedSched(sched);
  };
  useEffect(() => {
    handleButtonClick("Today");
  }, []);
  const filteredSchedulesData = schedulesData.filter((schedule) => {
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
                      <td>{schedule.request_number}</td>
                      <td>{schedule.requester_name}</td>
                      <td>{schedule.time}</td>
                      {selectedSched === "Upcoming" && <td>{schedule.date}</td>}
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
