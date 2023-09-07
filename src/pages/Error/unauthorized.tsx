import "./errorstyle.css";
import Container from "../../components/container/container";

export default function Unauthorized() {
  return (
    <>
      <Container>
        <div className="error-content">
          <div className="text">401 | Unauthorized</div>
        </div>
      </Container>
    </>
  );
}
