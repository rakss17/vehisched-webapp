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
import { SidebarItem } from "../../../interfaces/interfaces";
import RequestFormDetails from "../../../components/form/requestformdetails";
import Confirmation from "../../../components/confirmation/confirmation";
import { RequestFormProps } from "../../../interfaces/interfaces";
import { fetchRequestOfficeStaffAPI } from "../../../components/api/api";

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
  { icon: faClipboardList, text: "Requests", path: "/Requests" },
  { icon: faCar, text: "Vehicles", path: "/Vehicles" },
  { icon: faCalendarAlt, text: "Schedules", path: "/Schedules" },
  { icon: faUser, text: "Drivers", path: "/Drivers" },
];

export default function Requests() {
  const [requestList, setRequestList] = useState<RequestFormProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestFormProps | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const currentDate = new Date();

  useEffect(() => {
    fetchRequestOfficeStaffAPI(setRequestList);
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
      request.requester_last_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.requester_first_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.requester_middle_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.travel_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (selectedCategory === "Logs" &&
        (request.requester_last_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          request.requester_first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.requester_middle_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.travel_date
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))) ||
      (selectedCategory !== "Logs" &&
        request.requester_last_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        request.requester_first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        request.requester_middle_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        request.travel_date.toLowerCase().includes(searchTerm.toLowerCase()));

    return isCategoryMatch && isSearchMatch;
  });

  const handleCategoryChange = (status: string) => {
    setSelectedCategory(status === "All" ? null : status);

    if (status === "Logs") {
      const filteredList = requestList.filter(
        (request) => new Date(request.travel_date) < currentDate
      );
      setRequestList(filteredList);
    } else {
      setRequestList(requestList);
    }
  };

  const handleOpenRequestForm = (request: RequestFormProps) => {
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
      request.request_id === selectedRequest?.request_id
        ? { ...request, status: "Approved" }
        : request
    );
    setRequestList(updatedRequestList);

    setTimeout(() => {
      setIsConfirmationOpen(false);
    }, 3000);
  };

  const selectedRequestDetails = selectedRequest
    ? requestList.filter(
        (request) => request.request_id === selectedRequest.request_id
      )
    : [];
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
                      key={request.request_id}
                      onClick={() => handleOpenRequestForm(request)}
                    >
                      <td>{request.request_id}</td>
                      <td>
                        {request.requester_last_name},{" "}
                        {request.requester_first_name}{" "}
                        {request.requester_middle_name}
                      </td>
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
          selectedRequest={selectedRequestDetails[0]}
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
