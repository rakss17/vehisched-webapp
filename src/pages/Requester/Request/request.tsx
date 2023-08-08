import { useState, useEffect } from "react";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import "./request.css";
import Ellipsis from "../../../components/ellipsismenu/ellipsismenu";
import Confirmation from "../../../components/confirmation/confirmation";

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
    status: "Pending",
  },
  {
    request_number: "03",
    travel_date: "August 18, 2023",
    vehicle: "Nissan Navara",
    status: "Pending",
  },
  {
    request_number: "04",
    travel_date: "August 19, 2023",
    vehicle: "Chevrolet Colorado",
    status: "Pending",
  },
  {
    request_number: "05",
    travel_date: "August 20, 2023",
    vehicle: "Honda Ridgeline",
    status: "Pending",
  },
  {
    request_number: "06",
    travel_date: "August 21, 2023",
    vehicle: "Mitsubishi Triton",
    status: "Pending",
  },
  {
    request_number: "07",
    travel_date: "August 22, 2023",
    vehicle: "Isuzu D-Max",
    status: "Pending",
  },
  {
    request_number: "08",
    travel_date: "August 23, 2023",
    vehicle: "Volkswagen Amarok",
    status: "Pending",
  },
  {
    request_number: "09",
    travel_date: "August 24, 2023",
    vehicle: "Mazda BT-50",
    status: "Pending",
  },
  {
    request_number: "10",
    travel_date: "August 25, 2023",
    vehicle: "GMC Canyon",
    status: "Pending",
  },
  {
    request_number: "11",
    travel_date: "August 26, 2023",
    vehicle: "RAM 1500",
    status: "Pending",
  },
];

const fetchedApprovedData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
    status: "Approved",
  },
  {
    request_number: "02",
    travel_date: "August 17, 2023",
    vehicle: "Ford Ranger",
    status: "Approved",
  },
  {
    request_number: "03",
    travel_date: "August 18, 2023",
    vehicle: "Nissan Navara",
    status: "Approved",
  },
  {
    request_number: "04",
    travel_date: "August 19, 2023",
    vehicle: "Chevrolet Colorado",
    status: "Approved",
  },
];
const fetchedCanceledData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
    status: "Canceled",
  },
];
const fetchedDeclinedData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
    status: "Declined",
  },
  {
    request_number: "10",
    travel_date: "August 25, 2023",
    vehicle: "GMC Canyon",
    status: "Declined",
  },
  {
    request_number: "11",
    travel_date: "August 26, 2023",
    vehicle: "RAM 1500",
    status: "Declined",
  },
];

export default function Request() {
  const [requestData, setRequestData] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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

  const onHandleEllipsis = (requestNumber: string) => {
    setIsConfirmationOpen(true);
    const updatedRequestData = requestData.map((request) =>
      request.request_number === requestNumber
        ? { ...request, status: "Canceled" }
        : request
    );

    setRequestData(updatedRequestData);
    setTimeout(() => {
      setIsConfirmationOpen(false);
    }, 3000);
  };

  const filteredData = requestData.filter(
    (request) => request.status === selectedStatus
  );

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
              {filteredData.length === 0 ? (
                <p>No request available.</p>
              ) : (
                <tbody>
                  {filteredData.map((request, index) => (
                    <tr key={index}>
                      <td>{request.request_number}</td>
                      <td>{request.travel_date}</td>
                      <td>{request.vehicle}</td>
                      <td className="ellipsis-cell">
                        {selectedStatus === "Pending" ||
                        selectedStatus === "Approved" ? (
                          <Ellipsis
                            onCategoryChange={() =>
                              onHandleEllipsis(request.request_number)
                            }
                            status={["Cancel Request"]}
                          />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </Container>
      <Confirmation isOpen={isConfirmationOpen} header="Request Canceled!" />
    </>
  );
}
