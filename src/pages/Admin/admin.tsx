import Header from "../../components/header/header";
import Container from "../../components/container/container";
import Label from "../../components/label/label";
import "./admin.css";

export default function Admin() {
  return (
    <>
      <Header />
      <Container>
        <Label label="System Administration" />
      </Container>
    </>
  );
}
