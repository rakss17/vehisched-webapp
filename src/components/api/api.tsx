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

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

const token = localStorage.getItem("token");

export async function SigninAPI(
  userData: SigninParams,
  navigate: any,
  dispatch: any
) {
  try {
    dispatch(fetchUserInfoStart());

    const response = await api.post("api/v1/accounts/token/login", userData);
    const token = response.data.auth_token;

    localStorage.setItem("token", token);

    const res = await api.get("api/v1/accounts/user-profile/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch(fetchUserInfoSuccess(res.data));

    if (res.data.role === "requester") {
      navigate("/DashboardR");
    } else if (res.data.role === "office staff") {
      navigate("/DashboardOS");
    } else if (res.data.role === "admin") {
      navigate("/Admin");
    }

    console.log("dataa ", res.data);
  } catch (error) {
    console.log(error);
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

export function updateUserAPI(
  userUpdate: any,
  userId: any,
  setIsConfirmationOpenEdit: any
) {
  const token = localStorage.getItem("token");

  return async () => {
    try {
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
  };
}

export function fetchRoleByName(roleName: any) {
  return async () => {
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
  };
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
