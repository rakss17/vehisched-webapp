import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Container from "../../../components/container/container";
import Label from "../../../components/label/label";
import "./request.css";

type SidebarItem = {
  icon: any;
  text: string;
  path: string;
};

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardR" },
  { icon: faClipboardList, text: "Request", path: "/Request" },
];

export default function Request() {
  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
      <Container>
        <Label label="Request" />

        <div className="nav-button-row">
          <button>Pending</button>
          <button>Approved</button>
          <button>Canceled</button>
          <button>Declined</button>
        </div>
      </Container>
    </>
  );
}
