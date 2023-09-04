import axios from "axios";
import { SigninParams, SignupParams } from "../../interfaces/interfaces";
import { Dispatch } from "redux";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../../redux/slices/userSlices";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../redux/store";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

const token = localStorage.getItem("token");

export function SigninAPI(userData: SigninParams, navigate: any) {
  api
    .post("api/v1/accounts/token/login", userData)
    .then((response) => {
      localStorage.setItem("token", response.data.auth_token);
      api
        .get("api/v1/accounts/user_type/", {
          headers: {
            Authorization: `Token ${response.data.auth_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.user_type === "requester") {
            navigate("/DashboardR");
          } else if (res.data.user_type === "office staff") {
            navigate("/DashboardOS");
          } else if (res.data.user_type === "admin") {
            navigate("/Admin");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
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
  return (dispatch: Dispatch) => {
    dispatch(fetchUsersStart());

    api
      .get("api/v1/accounts/admin/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data.results));
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
        dispatch(fetchUsersFailure("Failed to fetch users."));
      });
  };
}

export function updateUserAPI(
  userUpdate: any,
  userId: any,
  setIsConfirmationOpenEdit: any
) {
  const token = localStorage.getItem("token");

  return api
    .patch(`api/v1/accounts/update/${userId}/`, userUpdate, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setIsConfirmationOpenEdit(true);
      setTimeout(() => {
        setIsConfirmationOpenEdit(false);
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      console.error("Error updating user:", error.message);
      throw error;
    });
}

export function fetchRoleByName(roleName: any) {
  const token = localStorage.getItem("token");

  return api
    .get(`api/v1/accounts/roles/by-name/?role_name=${roleName}`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching role:", error);
      throw error;
    });
}
