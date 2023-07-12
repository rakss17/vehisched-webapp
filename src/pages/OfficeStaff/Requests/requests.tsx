import React, { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./requests.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";

export default function Requests() {
  const [requestList, setRequestList] = useState<Request[]>([]);

  interface Request {
    id: number;
    request_number: string;
    requested_by: string;
    travel_date: string;
    status: string;
  }
  // const fetchRequestList = () => {
  //   const fetchedRequests = [
  //     {
  //       id: 1,
  //       request_number: "001",
  //       requested_by: "Bohari S Ambulo",
  //       travel_date: "2023-07-18",
  //       status: "Approved",
  //     },
  //     {
  //       id: 2,
  //       request_number: "002",
  //       requested_by: "Mark Dave M Lorejo",
  //       travel_date: "2023-07-19",
  //       status: "Pending",
  //     },
  //     {
  //       id: 3,
  //       request_number: "003",
  //       requested_by: "Michael Ray V Romeo",
  //       travel_date: "2023-07-20",
  //       status: "Rejected",
  //     },
  //     {
  //       id: 4,
  //       request_number: "004",
  //       requested_by: "Tristan C Araquil",
  //       travel_date: "2023-07-25",
  //       status: "Pending",
  //     },
  //     {
  //       id: 5,
  //       request_number: "005",
  //       requested_by: "Mike Emmanuel Ibahay",
  //       travel_date: "2023-07-30",
  //       status: "Approved",
  //     },
  //     {
  //       id: 6,
  //       request_number: "006",
  //       requested_by: "Anton Joseph Gabut",
  //       travel_date: "2023-07-31",
  //       status: "Rejected",
  //     },
  //     {
  //       id: 6,
  //       request_number: "006",
  //       requested_by: "Mike Emmanuel Ibahay",
  //       travel_date: "2023-07-30",
  //       status: "Approved",
  //     },
  //     {
  //       id: 1,
  //       request_number: "001",
  //       requested_by: "Bohari S Ambulo",
  //       travel_date: "2023-07-18",
  //       status: "Approved",
  //     },
  //     {
  //       id: 1,
  //       request_number: "001",
  //       requested_by: "Bohari S Ambulo",
  //       travel_date: "2023-07-18",
  //       status: "Approved",
  //     },
  //     {
  //       id: 1,
  //       request_number: "001",
  //       requested_by: "Bohari S Ambulo",
  //       travel_date: "2023-07-18",
  //       status: "Approved",
  //     },
  //     {
  //       id: 1,
  //       request_number: "001",
  //       requested_by: "Bohari S Ambulo",
  //       travel_date: "2023-07-18",
  //       status: "Approved",
  //     },
  //     {
  //       id: 1,
  //       request_number: "001",
  //       requested_by: "Bohari S Ambulo",
  //       travel_date: "2023-07-18",
  //       status: "Approved",
  //     },
  //   ];

  //   setRequestList(fetchedRequests);
  // };

  // useEffect(() => {
  //   fetchRequestList();
  // }, []);

  const handleRequestListClick = () => {};

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
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
            <SearchBar onSearch={handleSearch} />
            <Dropdown
              first="Pending"
              second="Approved"
              third="Rejected"
              fourth="Request Logs"
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
              {requestList.length === 0 ? (
                <td>No request available</td>
              ) : (
                requestList.map((request) => (
                  <tr
                    className="request-list"
                    key={request.id}
                    onClick={() => handleRequestListClick()}
                  >
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
