import { useState } from "react";
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

const fetchedAprrovedData = [
  {
    request_number: "10",
    travel_date: "April 16, 2024",
    vehicle: "Toyota hilux",
  },
];

export default function Request() {
  const [requestData, setRequestData] = useState<any[]>([]);

  const handleButtonClick = (status: string) => {
    switch (status) {
      case "Pending":
        setRequestData([
          "Request 1 (Pending)",
          "Request 2 (Pending)",
          "Request 3 (Pending)",
        ]);
        break;
      case "Approved":
        setRequestData(fetchedAprrovedData);
        break;
      case "Canceled":
        setRequestData(["Request 6 (Canceled)"]);
        break;
      case "Declined":
        setRequestData(["Request 7 (Declined)", "Request 8 (Declined)"]);
        break;
      default:
        setRequestData([]);
        break;
    }
  };

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <div className="label-margin">
          <Label label="Request" />
        </div>

        <div className="nav-button-row">
          <button onClick={() => handleButtonClick("Pending")}>Pending</button>
          <button onClick={() => handleButtonClick("Approved")}>
            Approved
          </button>
          <button onClick={() => handleButtonClick("Canceled")}>
            Canceled
          </button>
          <button onClick={() => handleButtonClick("Declined")}>
            Declined
          </button>
        </div>
        <div className="requests-container">
          <table>
            <thead>
              <tr>
                <p>Request No.</p>
                <p>Travel Date</p>
                <p>Vehicle</p>
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
      </Container>
    </>
  );
}
