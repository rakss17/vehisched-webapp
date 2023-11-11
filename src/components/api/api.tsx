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
import { getTimeElapsed } from "../functions/getTimeElapsed";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const serverSideUrl = "http://localhost:8000/media/";

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
      console.log(error);
    });
}
export function addOffice(
  name: any,
  setIsConfirmationOpen: any,
  setLoadingBarProgress: (progress: number) => void
) {
  const token = localStorage.getItem("token");
  api
    .post(
      "api/v1/accounts/create-list-office/",
      { name: name },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
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
      if (error.response && error.response.data) {
        setLoadingBarProgress(50);
        setLoadingBarProgress(100);
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
export async function fetchOfficeAPI(setOfficeData: any) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("api/v1/accounts/create-list-office/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    const officeData = response.data.map((office: any) => office.name);
    setOfficeData(officeData);
  } catch (error) {
    console.log(error);
  }
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
      dispatch(fetchUsersInfo(response.data));
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
}

export function fetchDriversScheduleAPI(
  setDriversData: any,
  travel_date: any,
  travel_time: any,
  return_date: any,
  return_time: any
) {
  const token = localStorage.getItem("token");
  api
    .get("/api/v1/trip/check-driver-availability/", {
      params: {
        preferred_start_travel_date: travel_date,
        preferred_start_travel_time: travel_time,
        preferred_end_travel_date: return_date,
        preferred_end_travel_time: return_time,
      },
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setDriversData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching driver list:", error);
    });
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
    if (key === "image" && updatedVehicleData[key] === null) {
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
    passenger_name: JSON.stringify(data.passenger_name),
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
      if (error.response && error.response.data) {
        setLoadingBarProgress(50);
        setLoadingBarProgress(100);
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
      const responseData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      const updatedData = responseData.map((item) => {
        if (item.passenger_name) {
          const validJson = item.passenger_name.replace(/'/g, '"');
          const passengerNamesArray = JSON.parse(validJson);
          item.passenger_name = passengerNamesArray.join(", ");
        }
        return item;
      });

      setRequestFilteredData(updatedData);
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
      const responseData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      const updatedData = responseData.map((item) => {
        if (item.passenger_name) {
          const validJson = item.passenger_name.replace(/'/g, '"');
          const passengerNamesArray = JSON.parse(validJson);
          item.passenger_name = passengerNamesArray.join(", ");
        }
        return item;
      });
      setRequestList(updatedData);
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
  setLoadingBarProgress: (progress: number) => void
) {
  const token = localStorage.getItem("token");

  api
    .patch(
      `/api/v1/request/cancel/${requestId}/`,
      {
        status: "Canceled",
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
        if (notification.subject.includes("has been created")) {
          const timeElapsed = getTimeElapsed(notification.created_at);
          let message = `${notification.subject} `;
          const timeUnits = ["minute", "hour", "day", "week", "month", "year"];
          for (let i = 0; i < timeUnits.length; i++) {
            if (timeElapsed.includes(timeUnits[i])) {
              message += `${timeElapsed.split(" ")[0]} ${timeUnits[i]}s ago`;
              break;
            }
          }
          if (!message.endsWith("ago")) {
            message += `${timeElapsed} ago`;
          }
          toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else if (notification.subject.includes("has been approved")) {
          const timeElapsed = getTimeElapsed(notification.created_at);
          let message = `${notification.subject} `;
          const timeUnits = ["minute", "hour", "day", "week", "month", "year"];
          for (let i = 0; i < timeUnits.length; i++) {
            if (timeElapsed.includes(timeUnits[i])) {
              message += `${timeElapsed.split(" ")[0]} ${timeUnits[i]}s ago`;
              break;
            }
          }
          if (!message.endsWith("ago")) {
            message += `${timeElapsed} ago`;
          }
          toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else if (notification.subject.includes("A travel is on the way")) {
          const timeElapsed = getTimeElapsed(notification.created_at);
          let message = `${notification.subject} `;
          const timeUnits = ["minute", "hour", "day", "week", "month", "year"];
          for (let i = 0; i < timeUnits.length; i++) {
            if (timeElapsed.includes(timeUnits[i])) {
              message += `${timeElapsed.split(" ")[0]} ${timeUnits[i]}s ago`;
              break;
            }
          }
          if (!message.endsWith("ago")) {
            message += `${timeElapsed} ago`;
          }
          toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else if (notification.subject.includes("1 hour")) {
          const timeElapsed = getTimeElapsed(notification.created_at);
          let message = `${notification.subject} `;
          const timeUnits = ["minute", "hour", "day", "week", "month", "year"];
          for (let i = 0; i < timeUnits.length; i++) {
            if (timeElapsed.includes(timeUnits[i])) {
              message += `${timeElapsed.split(" ")[0]} ${timeUnits[i]}s ago`;
              break;
            }
          }
          if (!message.endsWith("ago")) {
            message += `${timeElapsed} ago`;
          }
          toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else if (notification.subject.includes("12 hours")) {
          const timeElapsed = getTimeElapsed(notification.created_at);
          let message = `${notification.subject} `;
          const timeUnits = ["minute", "hour", "day", "week", "month", "year"];
          for (let i = 0; i < timeUnits.length; i++) {
            if (timeElapsed.includes(timeUnits[i])) {
              message += `${timeElapsed.split(" ")[0]} ${timeUnits[i]}s ago`;
              break;
            }
          }
          if (!message.endsWith("ago")) {
            message += `${timeElapsed} ago`;
          }
          toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else if (notification.subject.includes("24 hours")) {
          const timeElapsed = getTimeElapsed(notification.created_at);
          let message = `${notification.subject} `;
          const timeUnits = ["minute", "hour", "day", "week", "month", "year"];
          for (let i = 0; i < timeUnits.length; i++) {
            if (timeElapsed.includes(timeUnits[i])) {
              message += `${timeElapsed.split(" ")[0]} ${timeUnits[i]}s ago`;
              break;
            }
          }
          if (!message.endsWith("ago")) {
            message += `${timeElapsed} ago`;
          }
          toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          });
        } else if (notification.subject.includes("has been canceled")) {
          const timeElapsed = getTimeElapsed(notification.created_at);
          let message = `${notification.subject} `;
          const timeUnits = ["minute", "hour", "day", "week", "month", "year"];
          for (let i = 0; i < timeUnits.length; i++) {
            if (timeElapsed.includes(timeUnits[i])) {
              message += `${timeElapsed.split(" ")[0]} ${timeUnits[i]}s ago`;
              break;
            }
          }
          if (!message.endsWith("ago")) {
            message += `${timeElapsed} ago`;
          }
          toast.info(message, {
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
  preferred_end_travel_time: any,
  preferred_capacity: any,
  setLoadingBarProgress: any,
  handleButtonClick: any
) {
  const token = localStorage.getItem("token");
  api
    .get("/api/v1/trip/check-vehicle-availability/", {
      params: {
        preferred_start_travel_date: preferred_start_travel_date,
        preferred_start_travel_time: preferred_start_travel_time,
        preferred_end_travel_date: preferred_end_travel_date,
        preferred_end_travel_time: preferred_end_travel_time,
        preferred_capacity: preferred_capacity,
      },
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setLoadingBarProgress(50);
      setVehiclesData(response.data);
      setLoadingBarProgress(100);
      handleButtonClick("Available Vehicle");
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        setLoadingBarProgress(50);
        setLoadingBarProgress(100);
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
      console.log("Error fetching vehicle list:", error);
    });
}

export function fetchSchedule(
  setSchedule: any,
  setNextSchedule: any,
  setIsOngoingScheduleClick: any,
  handleButtonClick: any,
  setVehicleRecommendation: any
) {
  const token = localStorage.getItem("token");
  api
    .get("api/v1/trip/fetch-requester/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const scheduleData = response.data.trip_data.filter(
        (item: any) => !item.next_schedule_travel_date
      );

      const nextScheduleData = response.data.trip_data.filter(
        (item: any) => item.next_schedule_travel_date
      );
      setVehicleRecommendation(response.data.vehicle_recommendation);

      setSchedule(scheduleData);
      setNextSchedule(nextScheduleData);
      if (
        scheduleData.length > 0 ||
        response.data.vehicle_recommendation.length > 0
      ) {
        setIsOngoingScheduleClick(true);
        handleButtonClick("Ongoing Schedule");
      }
    })
    .catch((error) => {
      console.error("Error fetching schedule list:", error);
    });
}

export async function fetchScheduleOfficeStaff(setSchedule: any) {
  const token = localStorage.getItem("token");
  return api
    .get("api/v1/trip/fetch-office-staff/", {
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

export async function fetchVehicleSchedules(
  setVehicleSchedules: any,
  vehicleId: any
) {
  const token = localStorage.getItem("token");
  return api
    .get("api/v1/trip/vehicle-schedules/", {
      params: {
        plate_number: vehicleId,
      },
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setVehicleSchedules(response.data);
    })
    .catch((error) => {
      console.error("Error fetching schedule list:", error);
    });
}

export async function fetchDriverSchedules(
  setDriverSchedules: any,
  driverId: any
) {
  const token = localStorage.getItem("token");
  return api
    .get("api/v1/trip/driver-schedules/", {
      params: {
        driver_id: driverId,
      },
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setDriverSchedules(response.data);
    })
    .catch((error) => {
      console.error("Error fetching schedule list:", error);
    });
}

export async function handlePlaceSelect(
  place: any,
  travel_date: any,
  travel_time: any,
  setData: (data: any) => void,
  setAddressData: (addressData: any) => void,
  category: any
) {
  try {
    const response = await api.get("api/v1/request/place-details/", {
      params: {
        place_id: place.place_id,
        travel_date: travel_date,
        travel_time: travel_time,
      },
    });
    if (category === "Round Trip") {
      const distanceString = response.data.distance;
      const distance = parseFloat(distanceString);
      const addressComponents = response.data.result.address_components.map(
        (component: any) => ({
          short_name: component.short_name,
        })
      );
      const addressName = response.data.result.name;
      const fullAddress =
        addressName +
        ", " +
        addressComponents
          .map((component: any) => component.short_name)
          .join(", ");
      setAddressData((prevData: any) => ({
        ...prevData,
        distance: distance,
        destination: fullAddress,
      }));
    } else if (
      category === "One-way - Drop" ||
      category === "One-way - Fetch" ||
      category === "One-way"
    ) {
      const [return_date, return_time] =
        response.data.estimated_return_time.split("T");
      setData((prevData: any) => ({
        ...prevData,
        return_date: return_date,
        return_time: return_time,
      }));
      const distanceString = response.data.distance;
      const distance = parseFloat(distanceString);
      const addressComponents = response.data.result.address_components.map(
        (component: any) => ({
          short_name: component.short_name,
        })
      );
      const addressName = response.data.result.name;
      const fullAddress =
        addressName +
        ", " +
        addressComponents
          .map((component: any) => component.short_name)
          .join(", ");
      setAddressData((prevData: any) => ({
        ...prevData,
        distance: distance,
        destination: fullAddress,
      }));
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export function vehicleMaintenanceAPI(
  data: any,
  setIsConfirmationOpenVehicleMaintenance: any,
  navigate: any,
  setLoadingBarProgress: (progress: number) => void,
  setIsVehicleMaintenanceOpen: any
) {
  const token = localStorage.getItem("token");
  api
    .post("api/v1/request/vehicle-maintenance/", data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setLoadingBarProgress(50);
      setIsVehicleMaintenanceOpen(false);
      setIsConfirmationOpenVehicleMaintenance(true);
      setLoadingBarProgress(100);
      setTimeout(() => {
        setIsConfirmationOpenVehicleMaintenance(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        setLoadingBarProgress(50);
        setLoadingBarProgress(100);
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

export function acceptVehicleAPI(
  requestId: any,
  selectedVehicleRecommendation: any,
  setIsConfirmationAcceptOpen: any,
  setLoadingBarProgress: any
) {
  const token = localStorage.getItem("token");
  api
    .patch(
      `/api/v1/trip/accept-vehicle/${requestId}/`,
      {
        plate_number: selectedVehicleRecommendation,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      setIsConfirmationAcceptOpen(true);
      setLoadingBarProgress(100);
      setTimeout(() => {
        setIsConfirmationAcceptOpen(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      setLoadingBarProgress(100);
      console.log(error);
    });
}

export function driverAbsenceAPI(
  data: any,
  setIsConfirmationOpenDriverAbsence: any,
  navigate: any,
  setLoadingBarProgress: (progress: number) => void,
  setIsDriverAbsenceOpen: any
) {
  const token = localStorage.getItem("token");
  api
    .post("api/v1/request/driver-absence/", data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setLoadingBarProgress(50);
      setIsDriverAbsenceOpen(false);
      setIsConfirmationOpenDriverAbsence(true);
      setLoadingBarProgress(100);
      setTimeout(() => {
        setIsConfirmationOpenDriverAbsence(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        setLoadingBarProgress(50);
        setLoadingBarProgress(100);
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

export function maintenanceAbsenceCompletedRequestAPI(
  requestId: any,
  setIsConfirmationCompletedOpen: any,
  setIsRequestFormOpen: any,
  setLoadingBarProgress: (progress: number) => void
) {
  const token = localStorage.getItem("token");

  api
    .patch(
      `/api/v1/request/maintenance-absence-completed/${requestId}/`,
      {
        status: "Completed",
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
      setIsConfirmationCompletedOpen(true);
      setLoadingBarProgress(100);
      setTimeout(() => {
        setIsConfirmationCompletedOpen(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function rejectRequestAPI(
  requestId: any,
  setIsConfirmationRejectedOpen: any,
  setIsRequestFormOpen: any,
  setLoadingBarProgress: (progress: number) => void
) {
  const token = localStorage.getItem("token");

  api
    .patch(
      `/api/v1/request/reject-request/${requestId}/`,
      {
        status: "Rejected",
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
      setIsConfirmationRejectedOpen(true);
      setLoadingBarProgress(100);
      setTimeout(() => {
        setIsConfirmationRejectedOpen(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
}

export const downloadTripTicketAPI = async (requestId: any) => {
  try {
    const response = await api.get(
      `/api/v1/trip/download-tripticket/${requestId}/`,
      {
        responseType: "blob",
      }
    );

    const contentDisposition = response.headers["content-disposition"] || "";
    const match = contentDisposition.match(/filename="(.+)"/);
    const filename = match ? match[1] : "file.pdf";

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed", error);
  }
};
