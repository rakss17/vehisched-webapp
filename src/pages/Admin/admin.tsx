import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Container from "../../components/container/container";
import Label from "../../components/label/label";
import "./admin.css";
import SearchBar from "../../components/searchbar/searchbar";
import ToyotaHilux from "../../components/images/toyota-hilux.jpg";
import MitsubishiMontero from "../../components/images/mitsubishi-montero.jpg";
import Fortuner from "../../components/images/fortuner.jpg";
import ToyotaHiace from "../../components/images/toyota-hiace.png";
import Ellipsis from "../../components/ellipsismenu/ellipsismenu";

interface Vehicle {
  id: number;
  vehicle_name: string;
  capacity: number;
  vehicle_type: string;
  vehicle_image: string;
  status: string;
}
const fetchedVehicles: Vehicle[] = [
  {
    id: 1,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: ToyotaHilux,
    status: "On Trip",
  },
  {
    id: 2,
    vehicle_name: "KCU 2522 Montero Sport",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: MitsubishiMontero,
    status: "Available",
  },
  {
    id: 3,
    vehicle_name: "KAB 2855 Fortuner",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: Fortuner,
    status: "On Trip",
  },
  {
    id: 4,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: ToyotaHiace,
    status: "Available",
  },
  {
    id: 5,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: ToyotaHilux,
    status: "Unavailable",
  },
  {
    id: 6,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: ToyotaHiace,
    status: "Unavailable",
  },
];

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
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [selectedNavigation, setSelectedNavigation] =
    useState<string>("Accounts");
  const [selectedAccountNavigation, setSelectedAccountNavigation] =
    useState<string>("Requester");
  const [searchAccountTerm, setSearchAccountTerm] = useState("");
  const [searchVehicleTerm, setSearchVehicleTerm] = useState("");

  const fetchedVehicleList = () => {
    setVehiclesData(fetchedVehicles);
  };

  useEffect(() => {
    fetchedVehicleList();
  }, []);

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

        break;
      case "VIP":
        setAccountsData(fetchedVIPData);

        break;
      case "Driver":
        setAccountsData(fetchedDriverData);

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
      searchAccountTerm === "" ||
      account.id_number
        .toLowerCase()
        .includes(searchAccountTerm.toLowerCase()) ||
      account.last_name
        .toLowerCase()
        .includes(searchAccountTerm.toLowerCase()) ||
      account.first_name
        .toLowerCase()
        .includes(searchAccountTerm.toLowerCase()) ||
      account.contact_number
        .toLowerCase()
        .includes(searchAccountTerm.toLowerCase());

    return isSearchMatch;
  });
  const filteredVehicleList = vehiclesData.filter((vehicle) => {
    const isSearchMatch =
      searchVehicleTerm === "" ||
      vehicle.vehicle_name
        .toLowerCase()
        .includes(searchVehicleTerm.toLowerCase()) ||
      vehicle.vehicle_type
        .toLowerCase()
        .includes(searchVehicleTerm.toLowerCase()) ||
      vehicle.status.toLowerCase().includes(searchVehicleTerm.toLowerCase());

    return isSearchMatch;
  });

  const handleSearchAccount = (term: string) => {
    setSearchAccountTerm(term);
  };
  const handleSearchVehicle = (term: string) => {
    setSearchVehicleTerm(term);
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
              <SearchBar onSearchChange={handleSearchAccount} />
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
        {displayVehicles && (
          <>
            <div className="accounts-row">
              <SearchBar onSearchChange={handleSearchVehicle} />
              <button>Add Vehicle {""}+</button>
            </div>
            <div className="vehicles-container">
              {filteredVehicleList.length === 0 ? (
                <p className="vehicles-null">No vehicles available</p>
              ) : (
                filteredVehicleList.map((vehicle) => (
                  <a className="vehicle-card">
                    <div className="vehicle-row">
                      <div className="vehicle-column">
                        <p className="vehicle-name">{vehicle.vehicle_name}</p>
                        <p className="vehicle-detail">
                          Seating Capacity: {vehicle.capacity}
                        </p>
                        <p className="vehicle-detail">
                          Type: {vehicle.vehicle_type}
                        </p>
                        <p className="vehicle-status">{vehicle.status}</p>
                      </div>
                      <img
                        className="vehicle-image"
                        src={vehicle.vehicle_image}
                      />
                      <div className="ellipsis-container">
                        <Ellipsis status={["Edit", "Delete"]} />
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
