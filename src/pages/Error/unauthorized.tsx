import "./errorstyle.css";
import Container from "../../components/container/container";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <Container>
        <div className="error-content">
          <div className="text">401 | Unauthorized</div>
          <button onClick={handleBack}>Go back</button>
        </div>
      </Container>
    </>
  );
}
