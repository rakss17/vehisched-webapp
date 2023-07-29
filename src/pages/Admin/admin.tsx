import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Container from "../../components/container/container";
import Label from "../../components/label/label";
import "./admin.css";
import SearchBar from "../../components/searchbar/searchbar";

const fetchedRequesterData = [
  {
    id_number: "2020300100",
    last_name: "Ambulo",
    first_name: "Bohari",
    middle_initial: "S.",
    contact_number: "09123456789",
  },
];
const fetchedVIPData = [
  {
    id_number: "VIP20230001",
    last_name: "Smith",
    first_name: "Alice",
    middle_initial: "M.",
    contact_number: "09111223344",
  },
  {
    id_number: "VIP20230002",
    last_name: "Johnson",
    first_name: "Robert",
    middle_initial: "L.",
    contact_number: "09222334455",
  },
  {
    id_number: "VIP20230003",
    last_name: "Garcia",
    first_name: "Sophia",
    middle_initial: "N.",
    contact_number: "09333445566",
  },
  {
    id_number: "VIP20230004",
    last_name: "Lee",
    first_name: "Michael",
    middle_initial: "J.",
    contact_number: "09444556677",
  },
  {
    id_number: "VIP20230005",
    last_name: "Wang",
    first_name: "Lily",
    middle_initial: "K.",
    contact_number: "09555667788",
  },
  {
    id_number: "VIP20230005",
    last_name: "Wang",
    first_name: "Lily",
    middle_initial: "K.",
    contact_number: "09555667788",
  },
  {
    id_number: "VIP20230005",
    last_name: "Wang",
    first_name: "Lily",
    middle_initial: "K.",
    contact_number: "09555667788",
  },
];
const fetchedDriverData = [
  {
    id_number: "20230005",
    last_name: "Wange",
    first_name: "Lilyy",
    middle_initial: "A.",
    contact_number: "0955566773",
  },
];

export default function Admin() {
  const [displayAccounts, setDisplayAccounts] = useState(true);
  const [displayVehicles, setDisplayVehicles] = useState(false);
  const [accountsData, setAccountsData] = useState<any[]>([]);
  const [selectedNavigation, setSelectedNavigation] =
    useState<string>("Accounts");
  const [selectedAccountNavigation, setSelectedAccountNavigation] =
    useState<string>("Requester");
  const [displayRequesters, setDisplayRequesters] = useState(true);
  const [displayVIP, setDisplayVIP] = useState(false);
  const [displayDriver, setDisplayDriver] = useState(false);
  const [displayGateGuard, setDisplayGateGuard] = useState(false);
  const [displayOfficeStaff, setDisplayOfficeStaff] = useState(false);
  const [displayUnitHead, setDisplayUnitHead] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleButtonClick = (nav: string) => {
    switch (nav) {
      case "Accounts":
        setDisplayAccounts(true);
        setAccountsData(fetchedRequesterData);
        setDisplayVehicles(false);
        break;
      case "Vehicles":
        setAccountsData([]);
        setDisplayAccounts(false);
        setDisplayVehicles(true);
        break;

      default:
        setAccountsData([]);
        break;
    }
    setSelectedNavigation(nav);
  };

  const handleButton2Click = (nav: string) => {
    switch (nav) {
      case "Requester":
        setAccountsData(fetchedRequesterData);
        setDisplayRequesters(true);
        break;
      case "VIP":
        setAccountsData(fetchedVIPData);
        setDisplayRequesters(false);
        break;
      case "Driver":
        setAccountsData(fetchedDriverData);
        setDisplayRequesters(false);
        break;
      default:
        setAccountsData([]);
        break;
    }
    setSelectedAccountNavigation(nav);
  };
  useEffect(() => {
    handleButton2Click("Requester");
  }, []);
  const filteredAccountsData = accountsData.filter((account) => {
    const isSearchMatch =
      searchTerm === "" ||
      account.id_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.contact_number.toLowerCase().includes(searchTerm.toLowerCase());

    return isSearchMatch;
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <>
      <Header />
      <Container>
        <div className="label-margin-admin">
          <Label label="System Administration" />
        </div>
        <div className="nav-button-row-admin">
          <button
            onClick={() => handleButtonClick("Accounts")}
            className={selectedNavigation === "Accounts" ? "active" : ""}
          >
            ACCOUNTS
          </button>
          <button
            onClick={() => handleButtonClick("Vehicles")}
            className={selectedNavigation === "Vehicles" ? "active" : ""}
          >
            VEHICLES
          </button>
        </div>
        {displayAccounts && (
          <div className="display-accounts-container">
            <div className="accounts-row">
              <SearchBar onSearchChange={handleSearchChange} />
              <button>Add User {""}+</button>
            </div>
            <div className="usertype-button-row">
              <button
                onClick={() => handleButton2Click("Requester")}
                className={
                  selectedAccountNavigation === "Requester" ? "active" : ""
                }
              >
                Requester
              </button>
              <button
                onClick={() => handleButton2Click("VIP")}
                className={selectedAccountNavigation === "VIP" ? "active" : ""}
              >
                VIP
              </button>
              <button
                onClick={() => handleButton2Click("Driver")}
                className={
                  selectedAccountNavigation === "Driver" ? "active" : ""
                }
              >
                Driver
              </button>
              <button
                onClick={() => handleButton2Click("GateGuard")}
                className={
                  selectedAccountNavigation === "GateGuard" ? "active" : ""
                }
              >
                Gate Guard
              </button>
              <button
                onClick={() => handleButton2Click("OfficeStaff")}
                className={
                  selectedAccountNavigation === "OfficeStaff" ? "active" : ""
                }
              >
                Office Staff
              </button>
              <button
                onClick={() => handleButton2Click("UnitHead")}
                className={
                  selectedAccountNavigation === "UnitHead" ? "active" : ""
                }
              >
                Unit Head
              </button>
            </div>

            <div className="accounts-data-container">
              <table
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0 20px",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ fontWeight: "normal" }}>ID</th>
                    <th style={{ fontWeight: "normal" }}>Last Name</th>
                    <th style={{ fontWeight: "normal" }}>First Name</th>
                    <th style={{ fontWeight: "normal" }}>MI.</th>
                    <th style={{ fontWeight: "normal" }}>Contact No.</th>
                  </tr>
                </thead>
                {filteredAccountsData.length === 0 ? (
                  <p>No users available</p>
                ) : (
                  <tbody>
                    {filteredAccountsData.map((account) => (
                      <tr key={account.index} onClick={() => alert("clicked")}>
                        <td>{account.id_number}</td>
                        <td>{account.last_name}</td>
                        <td>{account.first_name}</td>
                        <td>{account.middle_initial}</td>
                        <td>{account.contact_number}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        )}
        {displayVehicles && <p>Vehicles</p>}
      </Container>
    </>
  );
}
