import "./errorstyle.css";
import Container from "../../components/container/container";

export default function NotFound() {
  return (
    <>
      <Container>
        <div className="error-content">
          <div className="text">404 | Not Found</div>
        </div>
      </Container>
    </>
  );
}
