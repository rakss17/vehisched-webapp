import React, { useState, useEffect, ChangeEvent } from "react";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./requests.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";

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
  const currentDate = new Date(); // Current date object

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

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <div className="margin-top">
          <Label label="Request" />
        </div>
        <div className="request-container">
          <div className="request-row">
            <SearchBar onSearchChange={handleSearchChange} />
            <Dropdown
              status={[
                "All",
                "Pending",
                "Approved",
                "Rejected",
                "Request Logs",
              ]}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <table className="request-lists">
            <thead>
              <tr className="request-lists-header">
                <p>Request No.</p>
                <p>Requested by</p>
                <p>Travel Date</p>
                <p>Status</p>
              </tr>
            </thead>
            <tbody className="request-lists-content">
              {filteredRequestList.length === 0 ? (
                <tr>
                  <td colSpan={4}>No request available</td>
                </tr>
              ) : (
                filteredRequestList.map((request) => (
                  <tr className="request-list" key={request.id}>
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
    </>
  );
}
