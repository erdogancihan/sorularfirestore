import axios from "axios";
import { loginSuccess, loginFailure, logoutSuccess } from "./loginActions";

let loopBack = "https://exam-e22e2.appspot.com/api";

export function login(user) {
  return dispatch => {
    axios
      .request({
        method: "post",
        url: loopBack + "/Users/login",
        data: user
      })
      .then(response => {
        console.log("login", response);

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("userId", response.data.userId);
        return dispatch(loginSuccess(response.data));
      })
      .catch(error => {
        return dispatch(loginFailure(error));
        //Some error occurred
      });
  };
}

export function logOut(token) {
  return dispatch => {
    axios
      .request({
        method: "post",
        url: loopBack + "/Users/logout?access_token=" + token
      })
      .then((response) => {
        console.log("logout responss,",response)
        localStorage.clear();
        return dispatch(logoutSuccess());
      })
      .catch(() => {
        localStorage.clear();
        return dispatch(logoutSuccess());
      });
  };
}

export function setToken() {
  return dispatch => {
    let id = localStorage.getItem("id");
    let userId = localStorage.getItem("userId");
    let session = { id, userId };
    return dispatch(loginSuccess(session));
  };
}
