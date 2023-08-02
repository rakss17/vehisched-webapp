import { useState, useEffect } from "react";
import {
  faColumns,
  faClipboardList,
  faCar,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./requests.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";
import Modal from "react-modal";

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

interface Request {
  id: number;
  request_number: string;
  requested_by: string;
  travel_date: string;
  status: string;
}
const fetchedRequests: Request[] = [
  {
    id: 1,
    request_number: "001",
    requested_by: "Bohari S Ambulo",
    travel_date: "2023-07-18",
    status: "Approved",
  },
  {
    id: 2,
    request_number: "002",
    requested_by: "Mark Dave M Lorejo",
    travel_date: "2023-06-19",
    status: "Pending",
  },
  {
    id: 3,
    request_number: "003",
    requested_by: "Michael Ray V Romeo",
    travel_date: "2023-07-20",
    status: "Rejected",
  },
  {
    id: 4,
    request_number: "004",
    requested_by: "Tristan C Araquil",
    travel_date: "2023-07-25",
    status: "Pending",
  },
  {
    id: 5,
    request_number: "005",
    requested_by: "Mike Emmanuel Ibahay",
    travel_date: "2023-07-30",
    status: "Approved",
  },
  {
    id: 6,
    request_number: "006",
    requested_by: "Anton Joseph Gabut",
    travel_date: "2023-07-31",
    status: "Rejected",
  },
  {
    id: 7,
    request_number: "007",
    requested_by: "Louie Jay B Galagar",
    travel_date: "2022-07-10",
    status: "Approved",
  },
  {
    id: 8,
    request_number: "008",
    requested_by: "Jayde Mike Engracia",
    travel_date: "2023-07-05",
    status: "Rejected",
  },
  {
    id: 9,
    request_number: "009",
    requested_by: "Juren Roy Abragan",
    travel_date: "2023-07-05",
    status: "Pending",
  },
  {
    id: 10,
    request_number: "010",
    requested_by: "Jonathan Ednilan",
    travel_date: "2023-07-05",
    status: "Pending",
  },
];
export default function Requests() {
  const [requestList, setRequestList] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const currentDate = new Date();

  const fetchRequestList = () => {
    setRequestList(fetchedRequests);
  };

  useEffect(() => {
    fetchRequestList();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredRequestList = requestList.filter((request) => {
    const isCategoryMatch =
      selectedCategory === null ||
      selectedCategory === "Request Logs" ||
      request.status === selectedCategory;

    const isSearchMatch =
      searchTerm === "" ||
      request.requested_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.request_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (selectedCategory === "Request Logs" &&
        (request.requested_by
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          request.request_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))) ||
      (selectedCategory !== "Request Logs" &&
        request.requested_by.toLowerCase().includes(searchTerm.toLowerCase()) &&
        request.request_number
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    return isCategoryMatch && isSearchMatch;
  });

  const handleCategoryChange = (status: string) => {
    setSelectedCategory(status === "All" ? null : status);

    if (status === "Request Logs") {
      const filteredList = fetchedRequests.filter(
        (request) => new Date(request.travel_date) < currentDate
      );
      setRequestList(filteredList);
    } else {
      setRequestList(fetchedRequests);
    }
  };

  const handleOpenRequestForm = () => {
    setIsRequestFormOpen(true);
  };

  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <div className="margin-top">
          <Label label="Request" />
        </div>
        <div className="request-row">
          <SearchBar onSearchChange={handleSearchChange} />
          <Dropdown
            status={["All", "Pending", "Approved", "Rejected", "Request Logs"]}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="request-container">
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
                <th>Travel Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequestList.length === 0 ? (
                <tr>
                  <td colSpan={4}>No request available</td>
                </tr>
              ) : (
                filteredRequestList.map((request) => (
                  <tr key={request.id} onClick={handleOpenRequestForm}>
                    <td>{request.request_number}</td>
                    <td>{request.requested_by}</td>
                    <td>{request.travel_date}</td>
                    <td>{request.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
      <Modal className="modal-request-form" isOpen={isRequestFormOpen}>
        <div>
          <h1>Vehicle Request Form</h1>
          <div>
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "25px",
                      whiteSpace: "nowrap",
                      paddingLeft: "1.3em",
                    }}
                  >
                    Requester's Name:
                  </th>
                  <td style={{ width: "20vw" }}>Bohari S. Ambulo</td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px" }}>Office/Dept: </th>
                  <td style={{ width: "5vw" }}>CEATSDA</td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "40px",
                      verticalAlign: "top",
                      paddingLeft: "4%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Passenger's Name:
                  </th>
                  <td>
                    Bohari S. Ambulo, Michael Ray V. romeo, Mark Dave M Lorejo,
                    Tristan C. Araquil, Michael Ray V. romeo, Mark Dave M
                    Lorejo, Tristan C. Araquil
                  </td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "90px",
                      paddingLeft: "2em",
                      verticalAlign: "top",
                    }}
                  >
                    Vehicle:
                  </th>
                  <td style={{ width: "20vw" }}>
                    Toyotaaaadwadddawdawd Hiluxdawdawdadawdawdawdada
                  </td>
                </tr>

                <tr>
                  <th
                    style={{
                      paddingRight: "10px",
                      verticalAlign: "top",
                      whiteSpace: "nowrap",
                    }}
                  >
                    No. of Passengers:{" "}
                  </th>
                  <td
                    style={{
                      paddingRight: "65px",
                    }}
                  >
                    99
                  </td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "60px",
                      verticalAlign: "top",
                      paddingLeft: "30px",
                    }}
                  >
                    Destination:
                  </th>
                  <td
                    style={{
                      width: "20vw",

                      height: "10vh",
                      verticalAlign: "top",
                    }}
                  >
                    Cogon Public Market dawdawdawdaw dawdawdawdawd adaw dawd
                    awdaw ldjaw jdpawj dopawj dpaw dawjpdojawdjawdpoawjdpawjdawj
                    d2312312312
                  </td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px", paddingLeft: "45px" }}>
                    Kilometer/s:
                  </th>
                  <td
                    style={{
                      paddingRight: "0px",

                      width: "5vw",
                    }}
                  >
                    1500000
                  </td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "25px",
                      whiteSpace: "nowrap",
                      paddingLeft: "1.3em",
                    }}
                  >
                    Requester's Name:
                  </th>
                  <td style={{ width: "20vw" }}>Bohari S. Ambulo</td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px" }}>Office/Dept: </th>
                  <td style={{ width: "5vw" }}>CEATSDA</td>
                </tr>
              </tbody>
              <tbody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0%",
                }}
              >
                <tr>
                  <th
                    style={{
                      paddingRight: "25px",
                      whiteSpace: "nowrap",
                      paddingLeft: "1.3em",
                    }}
                  >
                    Requester's Name:
                  </th>
                  <td style={{ width: "20vw" }}>Bohari S. Ambulo</td>
                </tr>
                <tr>
                  <th style={{ paddingRight: "10px" }}>Office/Dept: </th>
                  <td style={{ width: "5vw" }}>CEATSDA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
}
