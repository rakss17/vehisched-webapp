import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import "./dashboardR.css";
import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";

type SidebarItem = {
  icon: any;
  text: string;
  path: string;
};

const sidebarData: SidebarItem[] = [
  { icon: faColumns, text: "Dashboard", path: "/DashboardOS" },
  { icon: faClipboardList, text: "Requests", path: "/Requests" },
];
export default function DashboardR() {
  return (
    <>
      <Header />
      <Sidebar sidebarData={sidebarData} />
    </>
  );
}
