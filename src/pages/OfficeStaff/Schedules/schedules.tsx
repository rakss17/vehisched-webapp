import React, { useState } from "react";
import "./schedules.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";

interface TableData {
  label: string;
  content: { [key: string]: string }[];
  columns: string[];
}

export default function Schedules() {
  const [activeButton, setActiveButton] = useState<string>("Today");
  const [searchTerm, setSearchTerm] = useState("");

  const handleButtonClick = (label: string) => {
    setActiveButton(label);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const tableData: TableData[] = [
    {
      label: "Today",
      content: [
        { "Request No.": "1", "Requested by": "bohari", Time: "1:00pm" },
      ],
      columns: ["Request No.", "Requested by", "Time"],
    },
    {
      label: "Upcoming",
      content: [
        {
          "Request No.": "2",
          "Requested by": "john",
          Time: "2:00pm",
          Date: "2023-07-15",
        },
        {
          "Request No.": "3",
          "Requested by": "jane",
          Time: "3:00pm",
          Date: "2023-07-16",
        },
      ],
      columns: ["Request No.", "Requested by", "Time", "Date"],
    },
  ];

  const activeTableData = tableData.find((data) => data.label === activeButton);

  const filteredContent = activeTableData?.content.filter((schedule) =>
    Object.values(schedule)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <div className="schedules-margin-top">
          <Label label="Schedules" />
        </div>
        <div className="schedules-container">
          <div className="schedules-row">
            <div className="button-container">
              {tableData.map((data) => (
                <button
                  key={data.label}
                  className={activeButton === data.label ? "active" : ""}
                  onClick={() => handleButtonClick(data.label)}
                >
                  {data.label}
                </button>
              ))}
            </div>
            <div className="searchbar-container">
              <SearchBar onSearchChange={handleSearchChange} />
            </div>
          </div>

          <div className="table-container">
            {filteredContent && filteredContent.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr className="data-header">
                    {activeTableData?.columns.map((column, index) => (
                      <th key={index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredContent.map((schedule, index) => (
                    <tr className="schedule-list" key={index}>
                      <td>{schedule["Request No."]}</td>
                      <td>{schedule["Requested by"]}</td>
                      {activeButton === "Upcoming" && (
                        <td>{schedule["Date"]}</td>
                      )}
                      <td>{schedule["Time"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="schedules-null">No schedules available</p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
