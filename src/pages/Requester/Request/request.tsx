import { useState, useEffect } from "react";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import "./request.css";

type SidebarItem = {
  icon: any;
  text: string;
  path: string;
};

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardR" },
  { icon: faClipboardList, text: "Request", path: "/Request" },
];
const fetchedPendingData = [
  {
    request_number: "02",
    travel_date: "August 17, 2023",
    vehicle: "Ford Ranger",
  },
  {
    request_number: "03",
    travel_date: "August 18, 2023",
    vehicle: "Nissan Navara",
  },
  {
    request_number: "04",
    travel_date: "August 19, 2023",
    vehicle: "Chevrolet Colorado",
  },
  {
    request_number: "05",
    travel_date: "August 20, 2023",
    vehicle: "Honda Ridgeline",
  },
  {
    request_number: "06",
    travel_date: "August 21, 2023",
    vehicle: "Mitsubishi Triton",
  },
  {
    request_number: "07",
    travel_date: "August 22, 2023",
    vehicle: "Isuzu D-Max",
  },
  {
    request_number: "08",
    travel_date: "August 23, 2023",
    vehicle: "Volkswagen Amarok",
  },
  {
    request_number: "09",
    travel_date: "August 24, 2023",
    vehicle: "Mazda BT-50",
  },
  {
    request_number: "10",
    travel_date: "August 25, 2023",
    vehicle: "GMC Canyon",
  },
  {
    request_number: "11",
    travel_date: "August 26, 2023",
    vehicle: "RAM 1500",
  },
];

const fetchedApprovedData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
  },
  {
    request_number: "02",
    travel_date: "August 17, 2023",
    vehicle: "Ford Ranger",
  },
  {
    request_number: "03",
    travel_date: "August 18, 2023",
    vehicle: "Nissan Navara",
  },
  {
    request_number: "04",
    travel_date: "August 19, 2023",
    vehicle: "Chevrolet Colorado",
  },
];
const fetchedCanceledData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
  },
];
const fetchedDeclinedData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
  },
  {
    request_number: "10",
    travel_date: "August 25, 2023",
    vehicle: "GMC Canyon",
  },
  {
    request_number: "11",
    travel_date: "August 26, 2023",
    vehicle: "RAM 1500",
  },
];

export default function Request() {
  const [requestData, setRequestData] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");

  const handleButtonClick = (status: string) => {
    switch (status) {
      case "Pending":
        setRequestData(fetchedPendingData);
        break;
      case "Approved":
        setRequestData(fetchedApprovedData);
        break;
      case "Canceled":
        setRequestData(fetchedCanceledData);
        break;
      case "Declined":
        setRequestData(fetchedDeclinedData);
        break;
      default:
        setRequestData([]);
        break;
    }
    setSelectedStatus(status);
  };
  useEffect(() => {
    handleButtonClick("Pending");
  }, []);

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <div className="label-margin">
          <Label label="Request" />
        </div>
        <div className="request-child-container">
          <div className="nav-button-row">
            <button
              onClick={() => handleButtonClick("Pending")}
              className={selectedStatus === "Pending" ? "active" : ""}
            >
              Pending
            </button>
            <button
              onClick={() => handleButtonClick("Approved")}
              className={selectedStatus === "Approved" ? "active" : ""}
            >
              Approved
            </button>
            <button
              onClick={() => handleButtonClick("Canceled")}
              className={selectedStatus === "Canceled" ? "active" : ""}
            >
              Canceled
            </button>
            <button
              onClick={() => handleButtonClick("Declined")}
              className={selectedStatus === "Declined" ? "active" : ""}
            >
              Declined
            </button>
          </div>
          <div className="requests-container">
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 20px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ fontWeight: "normal" }}>Request No.</th>
                  <th style={{ fontWeight: "normal" }}>Travel Date</th>
                  <th style={{ fontWeight: "normal" }}>Vehicle</th>
                </tr>
              </thead>
              <tbody>
                {requestData.map((request, index) => (
                  <tr key={index}>
                    <td>{request.request_number}</td>
                    <td>{request.travel_date}</td>
                    <td>{request.vehicle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}
