import "./dashboardOS.css";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import CalendarSchedule from "../../../components/calendar/calendar";
import Container from "../../../components/container/container";

export default function DashboardOS() {
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <h1 className="label">Dashboard</h1>
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
