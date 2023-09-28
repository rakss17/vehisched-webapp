import axios from "axios";
import {
  RequestFormProps,
  SigninParams,
  SignupParams,
  Vehicle,
} from "../../interfaces/interfaces";
import { Dispatch } from "redux";
import { fetchUsersInfo } from "../../redux/slices/usersInfoSlices";
import { fetchPersonalInfo } from "../../redux/slices/personalInfoSlices";
import { fetchVehiclesData } from "../../redux/slices/vehiclesDataSlices";

export const serverSideUrl = "http://localhost:8000";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

const token = localStorage.getItem("token");

export async function SigninAPI(
  userData: SigninParams,
  navigate: any,
  dispatch: any,
  setLoadingBarProgress: (progress: number) => void,
  setError: any
) {
  try {
    setLoadingBarProgress(20);
    const response = await api.post("api/v1/accounts/token/login", userData);
    const token = response.data.auth_token;

    localStorage.setItem("token", token);

    const res = await api.get("api/v1/accounts/me/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    setLoadingBarProgress(40);
    dispatch(fetchPersonalInfo(res.data));
    setLoadingBarProgress(70);
    if (res.data.role === "requester" || res.data.role === "vip") {
      navigate("/DashboardR");
    } else if (res.data.role === "office staff") {
      navigate("/DashboardOS");
    } else if (res.data.role === "admin") {
      navigate("/Admin");
    }
    setLoadingBarProgress(100);
  } catch (error) {
    setLoadingBarProgress(20);
    setLoadingBarProgress(50);
    setLoadingBarProgress(100);
    setError(true);
  }
}

export function SignupAPI(userData: SignupParams, setIsConfirmationOpen: any) {
  api
    .post("api/v1/accounts/users/", userData)
    .then((response) => {
      setIsConfirmationOpen(true);
      setTimeout(() => {
        setIsConfirmationOpen(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function fetchUsersAPI() {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("api/v1/accounts/admin/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch(fetchUsersInfo(response.data.results));
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
}

export async function fetchDriversAPI(setDrivers: any) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("api/v1/accounts/drivers/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    setDrivers(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user list:", error);
  }
}

export async function updateUserAPI(
  userUpdate: any,
  userId: any,
  setIsConfirmationOpenEdit: any
) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.patch(
      `api/v1/accounts/update/${userId}/`,
      userUpdate,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setIsConfirmationOpenEdit(true);
    setTimeout(() => {
      setIsConfirmationOpenEdit(false);
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function fetchRoleByName(roleName: any) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(
      `api/v1/accounts/roles/by-name/?role_name=${roleName}`,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
}

export function deleteUserAPI(
  userId: any,
  setIsConfirmationOpenDelete: any,
  setFetchedUsersData: any
) {
  const token = localStorage.getItem("token");
  api
    .delete(`api/v1/accounts/delete/${userId}/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 204) {
        setIsConfirmationOpenDelete(true);
        setFetchedUsersData((prevUsersData: any) =>
          prevUsersData.filter((user: any) => user.id !== userId)
        );
        setTimeout(() => {
          setIsConfirmationOpenDelete(false);
          window.location.reload();
        }, 3000);
      } else if (response.status === 404) {
        console.error("User not found");
      } else {
        console.error("Error deleting user");
      }
    })
    .catch((error) => console.error("Error deleting user:", error));
}

export function fetchVehiclesAPI() {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("api/v1/vehicles/fetch-post/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch(fetchVehiclesData(response.data));
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
}

export function addVehiclesAPI(
  vehicleData: Vehicle,
  setIsConfirmationOpenVehicle: any
) {
  const formData = new FormData();
  Object.keys(vehicleData).forEach((key) => {
    formData.append(key, vehicleData[key]);
  });

  api
    .post("api/v1/vehicles/fetch-post/", formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      setIsConfirmationOpenVehicle(true);
      setTimeout(() => {
        setIsConfirmationOpenVehicle(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function updateVehicleAPI(
  updatedVehicleData: any,
  vehicleId: any,
  setIsConfirmationOpenVehicleEdit: any
) {
  const formData = new FormData();
  Object.keys(updatedVehicleData).forEach((key) => {
    if (key === "vehicle_image" && updatedVehicleData[key] === null) {
      return;
    }
    formData.append(key, updatedVehicleData[key]);
  });
  try {
    const token = localStorage.getItem("token");
    const response = await api.patch(
      `api/v1/vehicles/update-delete/${vehicleId}/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    setIsConfirmationOpenVehicleEdit(true);
    setTimeout(() => {
      setIsConfirmationOpenVehicleEdit(false);
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.log("Error updating user:", error);
    throw error;
  }
}

export async function deleteVehicleAPI(
  vehicleId: any,
  setIsConfirmationOpenVehicleDelete: any,
  setSelectedNavigation: any
) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(
      `api/v1/vehicles/update-delete/${vehicleId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setIsConfirmationOpenVehicleDelete(true);
    setTimeout(() => {
      setIsConfirmationOpenVehicleDelete(false);
      window.location.reload();
      setSelectedNavigation("Vehicles");
    }, 3000);
  } catch (error) {
    console.log("Error updating user:", error);
    throw error;
  }
}

export function postRequestFromAPI(
  data: RequestFormProps,
  setIsConfirmationOpen: any,
  navigate: any
) {
  const requestData = {
    ...data,
    passenger_names: JSON.stringify(data.passenger_names),
  };
  console.log(requestData);
  api
    .post("api/v1/request/fetch-post/", requestData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setIsConfirmationOpen(true);
      setTimeout(() => {
        setIsConfirmationOpen(false);
        navigate("/DashboardR");
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function fetchRequestAPI(setRequestFilteredData: any) {
  const token = localStorage.getItem("token");
  api
    .get("api/v1/request/fetch-post/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setRequestFilteredData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching request list:", error);
    });
}

export function fetchRequestOfficeStaffAPI(setRequestList: any) {
  const token = localStorage.getItem("token");
  api
    .get("api/v1/request/fetch/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setRequestList(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching request list:", error);
    });
}

export function approveRequestAPI(
  requestId: any,
  setIsRequestFormOpen: any,
  setIsConfirmationOpen: any
) {
  api
    .patch(
      `/api/v1/request/approve/${requestId}/`,
      {
        is_approved: true,
        status: "Approved",
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      setIsRequestFormOpen(false);
      setIsConfirmationOpen(true);

      setTimeout(() => {
        setIsConfirmationOpen(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
}
