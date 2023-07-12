import "./dashboardOS.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import CalendarSchedule from "../../../components/calendar/calendar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";

export default function DashboardOS() {
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Label label="Dashboard" />
        <div className="dashboard-container">
          <div className="today-trip">
            <p>Today's Trip</p>
            <h2>10</h2>
          </div>
          <CalendarSchedule />
        </div>
      </Container>
    </>
  );
}
