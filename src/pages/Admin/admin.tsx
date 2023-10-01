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
import { SignupParams } from "../../interfaces/interfaces";
import {
  SignupAPI,
  fetchUsersAPI,
  fetchVehiclesAPI,
  updateUserAPI,
  fetchRoleByName,
  deleteUserAPI,
  addVehiclesAPI,
  updateVehicleAPI,
  deleteVehicleAPI,
  toggleUserActivationAPI,
} from "../../components/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingBar from "react-top-loading-bar";

export default function Admin() {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [displayAccounts, setDisplayAccounts] = useState(true);
  const [displayVehicles, setDisplayVehicles] = useState(false);
  const [accountsData, setAccountsData] = useState<any[]>([]);
  const [fetchedUsersData, setFetchedUsersData] = useState<SignupParams[]>([]);
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
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isDeleteVehicleOpen, setIsDeleteVehicleOpen] = useState(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationOpenActivated, setIsConfirmationOpenActivated] =
    useState(false);
  const [isConfirmationOpenDeactivated, setIsConfirmationOpenDeactivated] =
    useState(false);
  const [isConfirmationOpenEdit, setIsConfirmationOpenEdit] = useState(false);
  const [isConfirmationOpenVehicle, setIsConfirmationOpenVehicle] =
    useState(false);
  const [isConfirmationOpenVehicleEdit, setIsConfirmationOpenVehicleEdit] =
    useState(false);
  const [isConfirmationOpenDelete, setIsConfirmationOpenDelete] =
    useState(false);
  const [isConfirmationOpenVehicleDelete, setIsConfirmationOpenVehicleDelete] =
    useState(false);
  const [selectedAccount, setSelectedAccount] = useState<SignupParams>();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();
  const [userData, setUserData] = useState<SignupParams>({
    username: "",
    password: "vehisched123",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    mobile_number: null,
    role: "",
  });
  const [userUpdate, setUserUpdate] = useState<SignupParams>({
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    mobile_number: null,
    role: "",
  });
  const [vehicleData, setVehicleData] = useState<Vehicle>({
    plate_number: "",
    vehicle_name: "",
    vehicle_type: "",
    capacity: null,
    is_vip: false,
    vehicle_image: null,
  });
  const [vehicleUpdate, setVehicleUpdate] = useState<Vehicle>({
    plate_number: "",
    vehicle_name: "",
    vehicle_type: "",
    capacity: null,
    status: "",
    is_vip: false,
    vehicle_image: null,
  });
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.usersInfo.data);
  const userId = selectedAccount?.id ?? "";
  const vehicles = useSelector((state: RootState) => state.vehiclesData.data);
  const vehicleId = selectedVehicle?.plate_number ?? "";

  const handleDropdownChange = (selectedOption: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      role: selectedOption,
    }));
  };
  const handleDropdownChange2 = (selectedOption: string) => {
    setUserUpdate((prevUserData) => ({
      ...prevUserData,
      role: selectedOption,
    }));
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setVehicleData({
        ...vehicleData,
        vehicle_image: selectedFile,
      });
    }
  };
  const handleImageUpdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setVehicleUpdate({
        ...vehicleUpdate,
        vehicle_image: selectedFile,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchUsersAPI() as any);
  }, [dispatch]);

  useEffect(() => {
    setFetchedUsersData(users);
  }, [users]);

  useEffect(() => {
    dispatch(fetchVehiclesAPI() as any);
  }, [dispatch]);

  useEffect(() => {
    setVehiclesData(vehicles);
  }, [vehicles]);

  useEffect(() => {
    filteredRole = fetchedUsersData.filter((role) => role.role === "requester");
    setAccountsData(filteredRole);
  }, [fetchedUsersData]);

  let filteredRole: any[] = [];
  const handleButtonClick = (nav: string) => {
    switch (nav) {
      case "Accounts":
        setDisplayAccounts(true);
        filteredRole = fetchedUsersData.filter(
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
    switch (nav) {
      case "Requester":
        filteredRole = fetchedUsersData.filter(
          (role) => role.role === "requester"
        );
        break;
      case "VIP":
        filteredRole = fetchedUsersData.filter((role) => role.role === "vip");
        break;
      case "Driver":
        filteredRole = fetchedUsersData.filter(
          (role) => role.role === "driver"
        );
        break;
      case "GateGuard":
        filteredRole = fetchedUsersData.filter(
          (role) => role.role === "gate guard"
        );
        break;
      case "OfficeStaff":
        filteredRole = fetchedUsersData.filter(
          (role) => role.role === "office staff"
        );
        break;
      default:
        setAccountsData([filteredRole]);
        break;
    }
    setSelectedAccountNavigation(nav);
    setAccountsData(filteredRole);
  };

  const filteredAccountsData = accountsData.filter((account) => {
    const isSearchMatch =
      searchAccountTerm === "" ||
      account.email.toLowerCase().includes(searchAccountTerm.toLowerCase()) ||
      account.last_name
        .toLowerCase()
        .includes(searchAccountTerm.toLowerCase()) ||
      account.first_name
        .toLowerCase()
        .includes(searchAccountTerm.toLowerCase());

    return isSearchMatch;
  });
  const filteredVehicleList = vehiclesData.filter((vehicle) => {
    const isSearchMatch =
      searchVehicleTerm === "" ||
      vehicle.vehicle_name
        ?.toLowerCase()
        .includes(searchVehicleTerm.toLowerCase()) ||
      vehicle.vehicle_type
        ?.toLowerCase()
        .includes(searchVehicleTerm.toLowerCase()) ||
      vehicle.status?.toLowerCase().includes(searchVehicleTerm.toLowerCase());

    return isSearchMatch;
  });

  const handleSearchAccount = (term: string) => {
    setSearchAccountTerm(term);
  };
  const handleSearchVehicle = (term: string) => {
    setSearchVehicleTerm(term);
  };
  const handleEllipsisMenu = (category: string, account: any) => {
    if (category === "Edit") {
      setIsEditOpen(true);
      setSelectedAccount(account);
    } else if (category === "Delete") {
      setIsDeleteOpen(true);
      setSelectedAccount(account);
    } else if (category === "Deactivate") {
      setIsDeactivateOpen(true);
      setSelectedAccount(account);
    } else if (category === "Activate") {
      setIsActivateOpen(true);
      setSelectedAccount(account);
    }
  };

  const handleEllipsisMenuVehicle = (category: string, vehicle: any) => {
    if (category === "Edit") {
      setIsEditVehicleOpen(true);
      setSelectedVehicle(vehicle);
    } else if (category === "Delete") {
      setIsDeleteVehicleOpen(true);
      setSelectedVehicle(vehicle);
    }
  };
  const handleAddUser = () => {
    setIsAddOpen(true);
  };
  const handleAddUserButton = () => {
    setLoadingBarProgress(20);
    setIsAddOpen(false);
    SignupAPI(userData, setIsConfirmationOpen, setLoadingBarProgress);
  };
  const handleEditUserButton = () => {
    setIsEditOpen(false);
    setLoadingBarProgress(20);
    const updatedUserData = {
      username: userUpdate.username || (selectedAccount?.username ?? ""),
      email: userUpdate.email || (selectedAccount?.email ?? ""),
      first_name: userUpdate.first_name || (selectedAccount?.first_name ?? ""),
      middle_name:
        userUpdate.middle_name || (selectedAccount?.middle_name ?? ""),
      last_name: userUpdate.last_name || (selectedAccount?.last_name ?? ""),
      mobile_number:
        userUpdate.mobile_number || (selectedAccount?.mobile_number ?? ""),
      role_name: null,
    };

    const roleName = userUpdate.role || (selectedAccount?.role ?? "");

    fetchRoleByName(roleName)
      .then((res) => {
        updatedUserData.role_name = res.role_name;
        console.log("Updated user data:", updatedUserData);
        return updateUserAPI(
          updatedUserData,
          userId,
          setIsConfirmationOpenEdit,
          setLoadingBarProgress
        );
      })
      .then(() => {})
      .catch((error) => {});
  };
  const handleAddVehicleButton = () => {
    setLoadingBarProgress(20);
    setIsAddVehicleOpen(false);
    addVehiclesAPI(
      vehicleData,
      setIsConfirmationOpenVehicle,
      setLoadingBarProgress
    );
  };

  const handleEditVehicleButton = () => {
    setLoadingBarProgress(20);
    setIsEditVehicleOpen(false);
    const updatedVehicleData = {
      plate_number:
        vehicleUpdate.plate_number || (selectedVehicle?.plate_number ?? ""),
      vehicle_name:
        vehicleUpdate.vehicle_name || (selectedVehicle?.vehicle_name ?? ""),
      capacity: vehicleUpdate.capacity || (selectedVehicle?.capacity ?? ""),
      status: vehicleUpdate.status || (selectedVehicle?.status ?? ""),
      vehicle_type:
        vehicleUpdate.vehicle_type || (selectedVehicle?.vehicle_type ?? ""),
      is_vip: vehicleUpdate.is_vip || (selectedVehicle?.is_vip ?? ""),
      vehicle_image: vehicleUpdate.vehicle_image,
    };
    updateVehicleAPI(
      updatedVehicleData,
      vehicleId,
      setIsConfirmationOpenVehicleEdit,
      setLoadingBarProgress
    );
  };
  const handleDeleteUserButton = () => {
    setLoadingBarProgress(20);
    setIsDeleteOpen(false);
    deleteUserAPI(
      userId,
      setIsConfirmationOpenDelete,
      setFetchedUsersData,
      setLoadingBarProgress
    );
  };
  const handleActivateUserButton = () => {
    setLoadingBarProgress(20);
    setIsActivateOpen(false);
    toggleUserActivationAPI(
      userId,
      setIsConfirmationOpenActivated,
      setIsConfirmationOpenDeactivated,
      setLoadingBarProgress
    );
  };
  const handleDeactivateUserButton = () => {
    setLoadingBarProgress(20);
    setIsDeactivateOpen(false);
    toggleUserActivationAPI(
      userId,
      setIsConfirmationOpenActivated,
      setIsConfirmationOpenDeactivated,
      setLoadingBarProgress
    );
  };
  const handleDeleteVehicleButton = () => {
    setLoadingBarProgress(20);
    setIsDeleteVehicleOpen(false);
    deleteVehicleAPI(
      vehicleId,
      setIsConfirmationOpenVehicleDelete,
      setSelectedNavigation,
      setLoadingBarProgress
    );
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
    setIsDeactivateOpen(false);
    setIsDeleteVehicleOpen(false);
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Available":
        return "green";
      case "On trip":
        return "#060e57";
      case "Unavailable":
        return "red";
      default:
        return "black";
    }
  };
  return (
    <>
      <LoadingBar
        color="#007bff"
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
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
                    <th style={{ fontWeight: "normal" }}>Username</th>
                    <th style={{ fontWeight: "normal" }}>Email</th>
                    <th style={{ fontWeight: "normal" }}>Last Name</th>
                    <th style={{ fontWeight: "normal" }}>First Name</th>
                    <th style={{ fontWeight: "normal" }}>Middle Name</th>
                    <th style={{ fontWeight: "normal" }}>Contact No.</th>
                    <th style={{ fontWeight: "normal" }}>Status</th>
                  </tr>
                </thead>
                {filteredAccountsData.length === 0 ? (
                  <p>No users available</p>
                ) : (
                  <tbody>
                    {filteredAccountsData.map((account) => (
                      <tr key={account.index}>
                        <td>{account.username}</td>
                        <td>{account.email}</td>
                        <td>{account.last_name}</td>
                        <td>{account.first_name}</td>
                        <td>{account.middle_name}</td>
                        <td>{account.mobile_number}</td>
                        <td>
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: account.is_active
                                ? "green"
                                : "red",
                              marginLeft: "50px",
                            }}
                          ></div>
                          {account.is_active ? true : false}
                        </td>
                        <div>
                          <Ellipsis
                            onCategoryChange={(category) =>
                              handleEllipsisMenu(category, account)
                            }
                            status={
                              account.is_active
                                ? ["Edit", "Deactivate", "Delete"]
                                : ["Edit", "Activate", "Delete"]
                            }
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
                        <p className="vehicle-name">
                          {vehicle.plate_number}
                          <br></br> {vehicle.vehicle_name}
                        </p>
                        <p className="vehicle-detail">
                          Seating Capacity: {vehicle.capacity}
                        </p>
                        <p className="vehicle-detail">
                          Type: {vehicle.vehicle_type}
                        </p>
                        <p
                          className="vehicle-status"
                          style={{
                            color: getStatusColor(vehicle.status),
                          }}
                        >
                          {vehicle.status}
                        </p>
                      </div>
                      <img
                        className="vehicle-image"
                        src={vehicle.vehicle_image}
                      />
                      <div className="ellipsis-container">
                        <Ellipsis
                          onCategoryChange={(category) =>
                            handleEllipsisMenuVehicle(category, vehicle)
                          }
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
        lastNameProps={{
          onChange: (event) =>
            setUserData({ ...userData, last_name: event.target.value }),
          value: userData.last_name,
          placeholder: "Last Name",
          type: "text",
        }}
        firstNameProps={{
          onChange: (event) =>
            setUserData({ ...userData, first_name: event.target.value }),
          value: userData.first_name,
          placeholder: "First Name",
          type: "text",
        }}
        middleNameProps={{
          onChange: (event) =>
            setUserData({ ...userData, middle_name: event.target.value }),
          value: userData.middle_name,
          placeholder: "Middle Name",
          type: "text",
        }}
        emailProps={{
          onChange: (event) =>
            setUserData({ ...userData, email: event.target.value }),
          value: userData.email,
          placeholder: "Email Address",
          type: "text",
        }}
        usernameProps={{
          onChange: (event) =>
            setUserData({ ...userData, username: event.target.value }),
          value: userData.username,
          placeholder: "Username",
          type: "text",
        }}
        contactNumberProps={{
          onChange: (event) =>
            setUserData({ ...userData, mobile_number: event.target.value }),
          placeholder: "Mobile Number",
          value: userData.mobile_number,
          type: "number",
        }}
        roleDropdownProps={{
          onChange: handleDropdownChange,
        }}
      />
      <AddEdit
        isOpen={isEditOpen}
        onRequestClose={handleCancel}
        header="Edit User"
        buttonText="Update User +"
        onRequestAddEdit={handleEditUserButton}
        lastNameProps={{
          onChange: (event) =>
            setUserUpdate({ ...userUpdate, last_name: event.target.value }),
          value: userUpdate.last_name,
          placeholder: selectedAccount?.last_name ?? "",
          type: "text",
        }}
        firstNameProps={{
          onChange: (event) =>
            setUserUpdate({ ...userUpdate, first_name: event.target.value }),
          value: userUpdate.first_name,
          placeholder: selectedAccount?.first_name ?? "",
          type: "text",
        }}
        middleNameProps={{
          onChange: (event) =>
            setUserUpdate({ ...userUpdate, middle_name: event.target.value }),
          value: userUpdate.middle_name,
          placeholder: selectedAccount?.middle_name ?? "",
          type: "text",
        }}
        emailProps={{
          onChange: (event) =>
            setUserUpdate({ ...userUpdate, email: event.target.value }),
          value: userUpdate.email,
          placeholder: selectedAccount?.email ?? "",
          type: "text",
        }}
        usernameProps={{
          onChange: (event) =>
            setUserUpdate({ ...userUpdate, username: event.target.value }),
          value: userUpdate.username,
          placeholder: selectedAccount?.username ?? "",
          type: "text",
        }}
        contactNumberProps={{
          onChange: (event) =>
            setUserUpdate({ ...userUpdate, mobile_number: event.target.value }),
          placeholder: selectedAccount?.mobile_number ?? "",
          value: userUpdate.mobile_number,
          type: "number",
        }}
        roleDropdownProps={{
          onChange: handleDropdownChange2,
          selectedAccount: selectedAccount,
        }}
      />
      <AddEditVehicle
        isOpen={isAddVehicleOpen}
        onRequestClose={handleCancel}
        header="Add Vehicle"
        buttonText="Add Vehicle +"
        onRequestAddEdit={handleAddVehicleButton}
        plateNoProps={{
          onChange: (event) =>
            setVehicleData({
              ...vehicleData,
              plate_number: event.target.value,
            }),
          value: vehicleData.plate_number,
          placeholder: "Plate Number",
          type: "text",
        }}
        modelProps={{
          onChange: (event) =>
            setVehicleData({
              ...vehicleData,
              vehicle_name: event.target.value,
            }),
          value: vehicleData.vehicle_name,
          placeholder: "Vehicle Name",
          type: "text",
        }}
        seatingCapacityProps={{
          onChange: (event) =>
            setVehicleData({ ...vehicleData, capacity: event.target.value }),
          placeholder: "Seating Capacity",
          value: vehicleData.capacity,
          type: "number",
        }}
        typeProps={{
          onChange: (event) =>
            setVehicleData({
              ...vehicleData,
              vehicle_type: event.target.value,
            }),
          placeholder: "Type",
          value: vehicleData.vehicle_type,
          type: "text",
        }}
        vipProps={{
          onChange: (event) =>
            setVehicleData({
              ...vehicleData,
              is_vip: event.target.checked,
            }),
          checked: vehicleData.is_vip,
          type: "checkbox",
        }}
        uploadImageProps={{
          type: "file",
          accept: "image/*",
          onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            handleImageChange(event),
        }}
      />
      <AddEditVehicle
        isOpen={isEditVehicleOpen}
        onRequestClose={handleCancel}
        header="Edit Vehicle"
        buttonText="Update Vehicle +"
        onRequestAddEdit={handleEditVehicleButton}
        plateNoProps={{
          onChange: (event) =>
            setVehicleUpdate({
              ...vehicleUpdate,
              plate_number: event.target.value,
            }),
          value: vehicleUpdate.plate_number,
          placeholder: selectedVehicle?.plate_number ?? "",
          type: "text",
        }}
        modelProps={{
          onChange: (event) =>
            setVehicleUpdate({
              ...vehicleUpdate,
              vehicle_name: event.target.value,
            }),
          value: vehicleUpdate.vehicle_name,
          placeholder: selectedVehicle?.vehicle_name ?? "",
          type: "text",
        }}
        seatingCapacityProps={{
          onChange: (event) =>
            setVehicleUpdate({
              ...vehicleUpdate,
              capacity: event.target.value,
            }),
          placeholder: selectedVehicle?.capacity ?? "",
          value: vehicleUpdate.capacity,
          type: "number",
        }}
        typeProps={{
          onChange: (event) =>
            setVehicleUpdate({
              ...vehicleUpdate,
              vehicle_type: event.target.value,
            }),
          placeholder: selectedVehicle?.vehicle_type ?? "",
          value: vehicleUpdate.vehicle_type,
          type: "text",
        }}
        vipProps={{
          onChange: (event) =>
            setVehicleUpdate({
              ...vehicleUpdate,
              is_vip: event.target.checked,
            }),
          checked: selectedVehicle?.is_vip ?? "",
          type: "checkbox",
        }}
        uploadImageProps={{
          type: "file",
          accept: "image/*",
          onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            handleImageUpdateChange(event),
        }}
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
        isOpen={isDeactivateOpen}
        content="Are you sure you want to deactivate this user?"
        buttonText1="Yes"
        buttonText2="No"
        onRequestClose={handleClose}
        onRequestDelete={handleDeactivateUserButton}
      />
      <PromptDialog
        isOpen={isActivateOpen}
        content="Are you sure you want to activate this user?"
        buttonText1="Yes"
        buttonText2="No"
        onRequestClose={handleClose}
        onRequestDelete={handleActivateUserButton}
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
        isOpen={isConfirmationOpenActivated}
        header="User Activated!"
      />
      <Confirmation
        isOpen={isConfirmationOpenDeactivated}
        header="User Deactivated!"
      />
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
