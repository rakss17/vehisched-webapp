import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./requests.css";
import Label from "../../../components/label/label";
import SearchBar from "../../../components/searchbar/searchbar";

export default function Requests() {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Label label="Request" />
        <div className="request-container">
          <div className="request-row">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </Container>
    </>
  );
}
