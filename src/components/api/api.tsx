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
import { fetchDriversData } from "../../redux/slices/driversDataSlices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const serverSideUrl = "http://localhost:8000";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

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

export function SignupAPI(
  userData: SignupParams,
  setIsConfirmationOpen: any,
  setLoadingBarProgress: (progress: number) => void
) {
  api
    .post("api/v1/accounts/users/", userData)
    .then((response) => {
      setLoadingBarProgress(20);
      setLoadingBarProgress(50);
      setIsConfirmationOpen(true);
      setLoadingBarProgress(70);
      setTimeout(() => {
        setLoadingBarProgress(90);
        setIsConfirmationOpen(false);
        setLoadingBarProgress(100);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      setLoadingBarProgress(20);
      setLoadingBarProgress(50);
      setLoadingBarProgress(100);
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

export async function fetchDriversAPI(setDriversData: any) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("api/v1/accounts/drivers/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    setDriversData(response.data);
  } catch (error) {
    console.error("Error fetching user list:", error);
  }
}

export async function updateUserAPI(
  userUpdate: any,
  userId: any,
  setIsConfirmationOpenEdit: any,
  setLoadingBarProgress: (progress: number) => void
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
    setLoadingBarProgress(50);
    setIsConfirmationOpenEdit(true);
    setTimeout(() => {
      setLoadingBarProgress(100);
      setIsConfirmationOpenEdit(false);
      window.location.reload();
    }, 3000);
  } catch (error) {
    setLoadingBarProgress(20);
    setLoadingBarProgress(50);
    setLoadingBarProgress(100);
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
  setFetchedUsersData: any,
  setLoadingBarProgress: (progress: number) => void
) {
  const token = localStorage.getItem("token");
  setLoadingBarProgress(20);
  api
    .delete(`api/v1/accounts/delete/${userId}/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 204) {
        setLoadingBarProgress(50);
        setIsConfirmationOpenDelete(true);
        setFetchedUsersData((prevUsersData: any) =>
          prevUsersData.filter((user: any) => user.id !== userId)
        );
        setTimeout(() => {
          setLoadingBarProgress(70);
          setLoadingBarProgress(100);
          setIsConfirmationOpenDelete(false);
          window.location.reload();
        }, 3000);
      } else if (response.status === 404) {
        setLoadingBarProgress(20);
        setLoadingBarProgress(50);
        setLoadingBarProgress(100);
        console.error("User not found");
      } else {
        setLoadingBarProgress(20);
        setLoadingBarProgress(50);
        setLoadingBarProgress(100);
        console.error("Error deleting user");
      }
    })
    .catch((error) => console.error("Error deleting user:", error));
}

export function toggleUserActivationAPI(
  userId: any,
  setIsConfirmationOpenActivated: any,
  setIsConfirmationOpenDeactivated: any,
  setLoadingBarProgress: any
) {
  const token = localStorage.getItem("token");
  api
    .post(`api/v1/accounts/toggle_activation/${userId}/`, null, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.data.is_active === true) {
        setIsConfirmationOpenActivated(true);
        setTimeout(() => {
          setLoadingBarProgress(70);
          setLoadingBarProgress(100);
          setIsConfirmationOpenActivated(false);
          window.location.reload();
        }, 3000);
      } else if (response.data.is_active === false) {
        setIsConfirmationOpenDeactivated(true);
        setTimeout(() => {
          setLoadingBarProgress(70);
          setLoadingBarProgress(100);
          setIsConfirmationOpenDeactivated(false);
          window.location.reload();
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
      console.log(response.data);

      dispatch(fetchVehiclesData(response.data));
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
}

export function addVehiclesAPI(
  vehicleData: Vehicle,
  setIsConfirmationOpenVehicle: any,
  setLoadingBarProgress: (progress: number) => void
) {
  const token = localStorage.getItem("token");
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
      setLoadingBarProgress(50);
      setIsConfirmationOpenVehicle(true);
      setTimeout(() => {
        setLoadingBarProgress(100);
        setIsConfirmationOpenVehicle(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      setLoadingBarProgress(20);
      setLoadingBarProgress(50);
      setLoadingBarProgress(100);
      console.log(error);
    });
}

export async function updateVehicleAPI(
  updatedVehicleData: any,
  vehicleId: any,
  setIsConfirmationOpenVehicleEdit: any,
  setLoadingBarProgress: (progress: number) => void
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
    setLoadingBarProgress(50);
    setIsConfirmationOpenVehicleEdit(true);
    setTimeout(() => {
      setLoadingBarProgress(100);
      setIsConfirmationOpenVehicleEdit(false);
      window.location.reload();
    }, 3000);
  } catch (error) {
    setLoadingBarProgress(50);
    setLoadingBarProgress(100);
    console.log("Error updating user:", error);
    throw error;
  }
}

export async function deleteVehicleAPI(
  vehicleId: any,
  setIsConfirmationOpenVehicleDelete: any,
  setSelectedNavigation: any,
  setLoadingBarProgress: (progress: number) => void
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
    setLoadingBarProgress(50);
    setIsConfirmationOpenVehicleDelete(true);
    setTimeout(() => {
      setLoadingBarProgress(100);
      setIsConfirmationOpenVehicleDelete(false);
      window.location.reload();
      setSelectedNavigation("Vehicles");
    }, 3000);
  } catch (error) {
    setLoadingBarProgress(50);
    setLoadingBarProgress(100);
    console.log("Error updating user:", error);
    throw error;
  }
}

export function postRequestFromAPI(
  data: RequestFormProps,
  setIsConfirmationOpen: any,
  navigate: any,
  setLoadingBarProgress: (progress: number) => void
) {
  const token = localStorage.getItem("token");
  const requestData = {
    ...data,
    passenger_names: JSON.stringify(data.passenger_names),
  };
  api
    .post("api/v1/request/fetch-post/", requestData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setLoadingBarProgress(50);
      setIsConfirmationOpen(true);
      setLoadingBarProgress(100);
      setTimeout(() => {
        setIsConfirmationOpen(false);
        navigate("/DashboardR");
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred.";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      } else {
        toast.error("An unknown error occurred.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      }
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
export function fetchPendingRequestAPI(setPendingSchedule: any) {
  const token = localStorage.getItem("token");
  api
    .get("api/v1/request/fetch-post/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const pendingScheduleTrips = response.data.filter(
        (trip: any) => trip.status === "Pending"
      );
      setPendingSchedule(pendingScheduleTrips);
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
  selectedDriverId: any,
  setIsRequestFormOpen: any,
  setIsConfirmationOpen: any
) {
  const token = localStorage.getItem("token");
  api
    .patch(
      `/api/v1/request/approve/${requestId}/`,
      {
        is_approved: true,
        status: "Approved",
        driver_id: selectedDriverId,
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

export function cancelRequestAPI(
  requestId: any,
  setIsConfirmationOpen: any,
  setLoadingBarProgress: (progress: number) => void,
  selectedStatus: any
) {
  const token = localStorage.getItem("token");

  api
    .patch(
      `/api/v1/request/cancel/${requestId}/`,
      {
        status: "Canceled",
        selected_status: selectedStatus,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      setIsConfirmationOpen(true);
      setLoadingBarProgress(100);
      setTimeout(() => {
        setIsConfirmationOpen(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function toggleVehicleStatusAPI(
  vehicleId: any,
  setIsConfirmationOpen: any,
  setIsConfirmationOpenUnavailable: any,
  setLoadingBarProgress: any
) {
  const token = localStorage.getItem("token");
  api
    .post(`api/v1/vehicles/toggle_status/${vehicleId}/`, null, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.data.status === "Available") {
        setIsConfirmationOpen(true);
        setTimeout(() => {
          setLoadingBarProgress(70);
          setLoadingBarProgress(100);
          setIsConfirmationOpen(false);
          window.location.reload();
        }, 3000);
      } else if (response.data.status === "Unavailable") {
        setIsConfirmationOpenUnavailable(true);
        setTimeout(() => {
          setLoadingBarProgress(70);
          setLoadingBarProgress(100);
          setIsConfirmationOpenUnavailable(false);
          window.location.reload();
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function fetchNotification(setNotifList: any) {
  const token = localStorage.getItem("token");
  api
    .get("api/v1/notification/fetch/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setNotifList(response.data);
      const unreadNotifications = response.data.filter(
        (notification: any) => !notification.read_status
      );
      unreadNotifications.forEach((notification: any) => {
        console.log("Subject:", notification.subject);

        if (notification.subject.includes("has been created")) {
          toast.success(notification.subject, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else if (notification.subject.includes("has been canceled")) {
          toast.info(notification.subject, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching notif list:", error);
    });
}

export function checkVehicleAvailability(
  setVehiclesData: any,
  preferred_start_travel_date: any,
  preferred_start_travel_time: any,
  preferred_end_travel_date: any,
  preferred_end_travel_time: any
) {
  const token = localStorage.getItem("token");
  api
    .get("/api/v1/tripticket/check-vehicle-availability/", {
      params: {
        preferred_start_travel_date: preferred_start_travel_date,
        preferred_start_travel_time: preferred_start_travel_time,
        preferred_end_travel_date: preferred_end_travel_date,
        preferred_end_travel_time: preferred_end_travel_time,
      },
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setVehiclesData(response.data);
      console.log("kni", response.data);
    })
    .catch((error) => {
      console.error("Error fetching vehicle list:", error);
    });
}

export function fetchSchedule(setSchedule: any) {
  const token = localStorage.getItem("token");
  api
    .get("api/v1/tripticket/fetch-requester/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setSchedule(response.data);
    })
    .catch((error) => {
      console.error("Error fetching schedule list:", error);
    });
}

export function fetchScheduleOfficeStaff(setSchedule: any) {
  const token = localStorage.getItem("token");
  return api
    .get("api/v1/tripticket/fetch-office-staff/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setSchedule(response.data);
    })
    .catch((error) => {
      console.error("Error fetching schedule list:", error);
    });
}
