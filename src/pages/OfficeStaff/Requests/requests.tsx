import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./requests.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";
import Dropdown from "../../../components/dropdown/dropdown";

export default function Requests() {
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
          <div className="request-lists">
            <div className="request-lists-header">
              <p>Request No.</p>
              <p>Requested by</p>
              <p>Travel Date</p>
              <p>Status</p>
            </div>
            <div className="request-lists-content"></div>
          </div>
        </div>
      </Container>
    </>
  );
}
