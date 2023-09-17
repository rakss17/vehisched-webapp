import axios from "axios";
import { SigninParams, SignupParams } from "../../interfaces/interfaces";
import { Dispatch } from "redux";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../../redux/slices/userSlices";
import {
  fetchUserInfoStart,
  fetchUserInfoSuccess,
} from "../../redux/slices/userInfoSlices";

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
    dispatch(fetchUserInfoStart());
    setLoadingBarProgress(20);
    const response = await api.post("api/v1/accounts/token/login", userData);
    const token = response.data.auth_token;

    localStorage.setItem("token", token);

    const res = await api.get("api/v1/accounts/user-profile/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    setLoadingBarProgress(40);
    dispatch(fetchUserInfoSuccess(res.data));
    setLoadingBarProgress(70);
    if (res.data.role === "requester") {
      navigate("/DashboardR");
    } else if (res.data.role === "office staff") {
      navigate("/DashboardOS");
    } else if (res.data.role === "admin") {
      const adminData = {
        id: res.data.id,
        role: res.data.role,
        username: res.data.username || "Default Username",
        email: res.data.email || "Default Email",
        first_name: res.data.first_name || "Default First Name",
        middle_name: res.data.middle_name || "Default Middle Name",
        last_name: res.data.last_name || "Default Last Name",
        mobile_number: res.data.mobile_number || "Default Mobile Number",
      };
      dispatch(fetchUserInfoSuccess(adminData));
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
      dispatch(fetchUsersStart());

      const token = localStorage.getItem("token");
      const response = await api.get("api/v1/accounts/admin/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch(fetchUsersSuccess(response.data.results));
    } catch (error) {
      console.error("Error fetching user list:", error);
      dispatch(fetchUsersFailure("Failed to fetch users."));
    }
  };
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
