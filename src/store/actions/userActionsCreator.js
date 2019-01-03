import axios from "axios";
import {
  signUpSuccess,
  signUpFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  editUserSuccess,
  editUserFailure,
  fetchSessionBegin,
  fetchSessionSuccess,
  fetchSessionFailure,
 
} from "./userActions";

//let loopBack = "http://localhost:3001/api";
let loopBack = "https://exam-e22e2.appspot.com/api";

export function signUp(user) {
  let date = new Date().toISOString();
  let email = user.email;
  let password = user.password;
  let userName = user.userName;
  let city = user.city;
  let signUpDate = date;
  let totalPoint = 0;
  let monthPoint = 0;
  let lastSession = date;
  let tryOuts = 3;
  let admin = false;

  let userData = {
    email,
    password,
    userName,
    city,
    signUpDate,
    totalPoint,
    monthPoint,
    lastSession,
    tryOuts,
    admin
  };
  //console.log(credentials);
  return dispatch => {
    console.log(userData);
    axios
      .request({
        method: "post",
        url: loopBack + "/userdata",
        data: userData
      })
      .then(response => {
        dispatch(login(userData));
        return dispatch(signUpSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        return dispatch(signUpFailure(error));
      });
  };
}

export function login(user) {
  let credentials = {
    email: user.email,
    password: user.password
  };
  console.log(credentials);
  return dispatch => {
    axios
      .request({
        method: "post",
        url: loopBack + "/userdata/login?include=user",
        data: credentials
      })
      .then(response => {
        console.log("login", response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("userId", response.data.userId);
        return dispatch(loginSuccess(response.data));
      })
      .catch(error => {
        return dispatch(loginFailure(error));
      });
  };
}

export function logOut(token) {
  return dispatch => {
    axios
      .request({
        method: "post",
        url: loopBack + "/userdata/logout?access_token=" + token
      })
      .then(response => {
        console.log("logout response,", response);
        localStorage.clear();
        return dispatch(logoutSuccess());
      })
      .catch(() => {
        console.log(token);
        localStorage.clear();
        return dispatch(logoutSuccess());
      });
  };
}

export function setToken() {
  console.log("settokenn");
  return dispatch => {
    let id = localStorage.getItem("id");
    let userId = localStorage.getItem("userId");
    axios
      .request({
        method: "get",
        url: loopBack + "/userdata/" + userId + "?access_token=" + id
      })
      .then(response => {
        let signedInUser = { id: id, userId: userId, user: response.data };
        return dispatch(loginSuccess(signedInUser));
      });
  };
}

export function fetchAllUsers(token) {
  console.log(token);
  let filter = `[order]=totalPoint%20DESC&[access_token]=${token}`;
  return dispatch => {
    return axios
      .get(loopBack + "/userdata?filter" + filter)
      .then(response => {
        return dispatch(fetchAllUsersSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchAllUsersFailure(error));
        //Some error occurred
      });
  };
}

export function editUser(user) {
  const token = user.id;
  const userData = user.user;
  //  console.log(userData);
  return dispatch => {
 //   console.log("edit user", user);
    axios
      .request({
        method: "patch",
        url: loopBack + "/userdata/" + userData.id + "?access_token=" + token,
        data: userData
      })
      .then(response => {
        let editUserdata = {
          id: token,
          userId: userData.id,
          user: response.data
        };
     //   console.log(editUserdata);
        return dispatch(editUserSuccess(editUserdata));
      })
      .catch(error => {
        console.log("edit user error", error);
        dispatch(editUserFailure(error));
      });
  };
}

export function addSession(point, user) {
  const date = new Date()
  const token = user.id;
  const userId = user.user.id;
  const sessionData = { userId, point, date };
  
  axios
    .request({
      method: "post",
      url: loopBack + "/sessions?access_token" + token,
      data: sessionData
    })
    .then(response => {
      return console.log("session added", response.data);

    })
    .catch(error => {
      return console.log("session error", error);
    });
}

export function fetchSession(date) {
  console.log(date);
  //date=10;
  // let filter=`{"where":{"point":${date}}}`
  let filter = `[where][date][gte]=${date}&filter[order]=point%20DESC&filter[limit]=8`;

  console.log(date);
  return dispatch => {
    dispatch(fetchSessionBegin());
    return axios
      .get(loopBack + "/sessions?filter" + filter)
      .then(response => {
        return dispatch(fetchSessionSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchSessionFailure(error));
        //Some error occurred
      });
  };
}
