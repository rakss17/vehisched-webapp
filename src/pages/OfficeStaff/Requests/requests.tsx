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

import RequestFormDetails from "../../../components/form/requestformdetails";
import Confirmation from "../../../components/confirmation/confirmation";

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

export type Request = {
  id: number;
  request_number: string;
  requested_by: string;
  travel_date: string;
  status: string;
};
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
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
      selectedCategory === "Logs" ||
      request.status === selectedCategory;

    const isSearchMatch =
      searchTerm === "" ||
      request.requested_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.request_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (selectedCategory === "Logs" &&
        (request.requested_by
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          request.request_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))) ||
      (selectedCategory !== "Logs" &&
        request.requested_by.toLowerCase().includes(searchTerm.toLowerCase()) &&
        request.request_number
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    return isCategoryMatch && isSearchMatch;
  });

  const handleCategoryChange = (status: string) => {
    setSelectedCategory(status === "All" ? null : status);

    if (status === "Logs") {
      const filteredList = fetchedRequests.filter(
        (request) => new Date(request.travel_date) < currentDate
      );
      setRequestList(filteredList);
    } else {
      setRequestList(fetchedRequests);
    }
  };

  const handleOpenRequestForm = (request: Request) => {
    setSelectedRequest(request);

    if (request.status === "Pending") {
      setIsRequestFormOpen(true);
      setIsConfirmationOpen(false);
    } else {
      setIsRequestFormOpen(true);
      setIsConfirmationOpen(false);
    }
  };

  const handleCloseRequestForm = () => {
    setIsRequestFormOpen(false);
  };
  const handleConfirmationApprove = () => {
    setIsRequestFormOpen(false);
    setIsConfirmationOpen(true);

    const updatedRequestList = requestList.map((request) =>
      request.id === selectedRequest?.id
        ? { ...request, status: "Approved" }
        : request
    );
    setRequestList(updatedRequestList);

    setTimeout(() => {
      setIsConfirmationOpen(false);
    }, 3000);
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
            status={["All", "Pending", "Approved", "Rejected", "Logs"]}
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
                  <>
                    <tr
                      key={request.id}
                      onClick={() => handleOpenRequestForm(request)}
                    >
                      <td>{request.request_number}</td>
                      <td>{request.requested_by}</td>
                      <td>{request.travel_date}</td>
                      <td>{request.status}</td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
      {isRequestFormOpen && (
        <RequestFormDetails
          isOpen={isRequestFormOpen}
          onRequestClose={handleCloseRequestForm}
          selectedRequest={selectedRequest}
          showButtons={selectedRequest?.status === "Pending"}
          onApprove={handleConfirmationApprove}
        />
      )}

      {isConfirmationOpen && (
        <Confirmation isOpen={isConfirmationOpen} header="Request Approved!" />
      )}
    </>
  );
}
