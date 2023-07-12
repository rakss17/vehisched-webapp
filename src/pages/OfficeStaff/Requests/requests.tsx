import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import "./requests.css";
import Label from "../../../components/label/label";
export default function Requests() {
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Label label="Request" />
      </Container>
    </>
  );
}
