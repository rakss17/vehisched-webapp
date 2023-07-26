import { faColumns, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
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
    </>
  );
}
