import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Container from "../../components/container/container";
import Label from "../../components/label/label";
import "./admin.css";
import SearchBar from "../../components/searchbar/searchbar";
import Ellipsis from "../../components/ellipsismenu/ellipsismenu";
import AddEdit from "../../components/admin/user/addedit";
import AddEditVehicle from "../../components/admin/vehicle/addedit";
import PromptDialog from "../../components/promptdialog/prompdialog";
import Confirmation from "../../components/confirmation/confirmation";
import { Vehicle } from "../../interfaces/interfaces";
import {
  fetchedVehicles,
  fetchedAccountData,
} from "../../components/mockdata.tsx/mockdata";

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
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isEditVehicleOpen, setIsEditVehicleOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteVehicleOpen, setIsDeleteVehicleOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationOpenEdit, setIsConfirmationOpenEdit] = useState(false);
  const [isConfirmationOpenVehicle, setIsConfirmationOpenVehicle] =
    useState(false);
  const [isConfirmationOpenVehicleEdit, setIsConfirmationOpenVehicleEdit] =
    useState(false);
  const [isConfirmationOpenDelete, setIsConfirmationOpenDelete] =
    useState(false);
  const [isConfirmationOpenVehicleDelete, setIsConfirmationOpenVehicleDelete] =
    useState(false);

  const fetchedVehicleList = () => {
    setVehiclesData(fetchedVehicles);
  };

  useEffect(() => {
    fetchedVehicleList();
  }, []);

  const handleButtonClick = (nav: string) => {
    let filteredRole: any[] = [];
    switch (nav) {
      case "Accounts":
        setDisplayAccounts(true);
        filteredRole = fetchedAccountData.filter(
          (role) => role.role === "requester"
        );
        setAccountsData(filteredRole);
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
    let filteredRole: any[] = [];
    switch (nav) {
      case "Requester":
        filteredRole = fetchedAccountData.filter(
          (role) => role.role === "requester"
        );
        break;
      case "VIP":
        filteredRole = fetchedAccountData.filter((role) => role.role === "vip");
        break;
      case "Driver":
        filteredRole = fetchedAccountData.filter(
          (role) => role.role === "driver"
        );
        break;
      case "GateGuard":
        filteredRole = fetchedAccountData.filter(
          (role) => role.role === "gate guard"
        );
        break;
      case "OfficeStaff":
        filteredRole = fetchedAccountData.filter(
          (role) => role.role === "office staff"
        );
        break;
      default:
        setAccountsData([]);
        break;
    }
    setSelectedAccountNavigation(nav);
    setAccountsData(filteredRole);
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
  const handleEllipsisMenu = (category: string) => {
    if (category === "Edit") {
      setIsEditOpen(true);
    } else if (category === "Delete") {
      setIsDeleteOpen(true);
    }
  };
  const handleEllipsisMenuVehicle = (category: string) => {
    if (category === "Edit") {
      setIsEditVehicleOpen(true);
    } else if (category === "Delete") {
      setIsDeleteVehicleOpen(true);
    }
  };
  const handleAddUser = () => {
    setIsAddOpen(true);
  };
  const handleAddUserButton = () => {
    setIsAddOpen(false);
    setIsConfirmationOpen(true);

    setTimeout(() => {
      setIsConfirmationOpen(false);
    }, 3000);
  };
  const handleEditUserButton = () => {
    setIsEditOpen(false);
    setIsConfirmationOpenEdit(true);

    setTimeout(() => {
      setIsConfirmationOpenEdit(false);
    }, 3000);
  };
  const handleAddVehicleButton = () => {
    setIsAddVehicleOpen(false);
    setIsConfirmationOpenVehicle(true);

    setTimeout(() => {
      setIsConfirmationOpenVehicle(false);
    }, 3000);
  };
  const handleEditVehicleButton = () => {
    setIsEditVehicleOpen(false);
    setIsConfirmationOpenVehicleEdit(true);

    setTimeout(() => {
      setIsConfirmationOpenVehicleEdit(false);
    }, 3000);
  };
  const handleDeleteUserButton = () => {
    setIsDeleteOpen(false);
    setIsConfirmationOpenDelete(true);

    setTimeout(() => {
      setIsConfirmationOpenDelete(false);
    }, 3000);
  };
  const handleDeleteVehicleButton = () => {
    setIsDeleteVehicleOpen(false);
    setIsConfirmationOpenVehicleDelete(true);

    setTimeout(() => {
      setIsConfirmationOpenVehicleDelete(false);
    }, 3000);
  };
  const handleCancel = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsAddVehicleOpen(false);
    setIsEditVehicleOpen(false);
  };
  const handleAddVehicle = () => {
    setIsAddVehicleOpen(true);
  };

  const handleClose = () => {
    setIsDeleteOpen(false);
    setIsDeleteVehicleOpen(false);
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
              <button onClick={handleAddUser}>Add User {""}+</button>
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
                    <th style={{ fontWeight: "normal" }}>Email</th>
                    <th style={{ fontWeight: "normal" }}>Last Name</th>
                    <th style={{ fontWeight: "normal" }}>First Name</th>
                    <th style={{ fontWeight: "normal" }}>Middle Name</th>
                    <th style={{ fontWeight: "normal" }}>Contact No.</th>
                  </tr>
                </thead>
                {filteredAccountsData.length === 0 ? (
                  <p>No users available</p>
                ) : (
                  <tbody>
                    {filteredAccountsData.map((account) => (
                      <tr key={account.index}>
                        <td>{account.id_number}</td>
                        <td>{account.email}</td>
                        <td>{account.last_name}</td>
                        <td>{account.first_name}</td>
                        <td>{account.middle_name}</td>
                        <td>{account.contact_number}</td>
                        <div>
                          <Ellipsis
                            onCategoryChange={handleEllipsisMenu}
                            status={["Edit", "Delete"]}
                          />
                        </div>
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
              <button onClick={handleAddVehicle}>Add Vehicle {""}+</button>
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
                        <Ellipsis
                          onCategoryChange={handleEllipsisMenuVehicle}
                          status={["Edit", "Delete"]}
                        />
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </>
        )}
      </Container>
      <AddEdit
        isOpen={isAddOpen}
        onRequestClose={handleCancel}
        header="Add User"
        buttonText="Add User +"
        onRequestAddEdit={handleAddUserButton}
      />
      <AddEdit
        isOpen={isEditOpen}
        onRequestClose={handleCancel}
        header="Edit User"
        buttonText="Update User +"
        onRequestAddEdit={handleEditUserButton}
      />
      <AddEditVehicle
        isOpen={isAddVehicleOpen}
        onRequestClose={handleCancel}
        header="Add Vehicle"
        buttonText="Add Vehicle +"
        onRequestAddEdit={handleAddVehicleButton}
      />
      <AddEditVehicle
        isOpen={isEditVehicleOpen}
        onRequestClose={handleCancel}
        header="Edit Vehicle"
        buttonText="Update Vehicle +"
        onRequestAddEdit={handleEditVehicleButton}
      />
      <PromptDialog
        isOpen={isDeleteOpen}
        content="Are you sure you want to delete this user?"
        buttonText1="Yes"
        buttonText2="No"
        onRequestClose={handleClose}
        onRequestDelete={handleDeleteUserButton}
      />
      <PromptDialog
        isOpen={isDeleteVehicleOpen}
        content="Are you sure you want to delete this vehicle?"
        buttonText1="Yes"
        buttonText2="No"
        onRequestClose={handleClose}
        onRequestDelete={handleDeleteVehicleButton}
      />
      <Confirmation isOpen={isConfirmationOpen} header="User Added!" />
      <Confirmation isOpen={isConfirmationOpenEdit} header="User Updated!" />
      <Confirmation
        isOpen={isConfirmationOpenVehicle}
        header="Vehicle Added!"
      />
      <Confirmation
        isOpen={isConfirmationOpenVehicleEdit}
        header="Vehicle Updated!"
      />
      <Confirmation isOpen={isConfirmationOpenDelete} header="User Deleted!" />
      <Confirmation
        isOpen={isConfirmationOpenVehicleDelete}
        header="Vehicle Deleted!"
      />
    </>
  );
}