import axios from "axios";
import { SigninParams, SignupParams } from "../../interfaces/interfaces";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

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
          console.log(res.data);
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
      }, 3000);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
