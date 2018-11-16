import axios from "axios";
import {
  fetchUserSuccess,
  fetchUserFailure,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  editUserSuccess,
  editUserFailure,
  fetchSessionBegin,
  fetchSessionSuccess,
  fetchSessionFailure
} from "./userActions";

let loopBack = "https://exam-e22e2.appspot.com/api";

export function fetchUser(id, token) {
  return dispatch => {
    return axios
      .get(loopBack + "/UserData/" + id + "?access_token=" + token)
      .then(response => {
        return dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchUserFailure(error));
        //Some error occurred
      });
  };
}

export function fetchAllUsers(token) {
  let filter = `[order]=totalPoint%20DESC&[access_token=${token}]`;
  return dispatch => {
    return axios
      .get(loopBack + "/UserData?filter" + filter)
      .then(response => {
        return dispatch(fetchAllUsersSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchAllUsersFailure(error));
        //Some error occurred
      });
  };
}

export function editUser(user, token) {
  let id = user.id;
  console.log(token);
  console.log("edit user", id, user);
  return dispatch => {
    console.log("edit user", user);
    axios
      .request({
        method: "put",
        url: loopBack + "/UserData/" + id + "?access_token=" + token,
        data: user
      })
      .then(response => {
        return dispatch(editUserSuccess(user));
      })
      .catch(error => {
        console.log("edit user error", error, user);
        dispatch(editUserFailure(error));
      });
  };
}

export function addSession(session, token) {
  axios
    .request({
      method: "post",
      url: loopBack + "/sessions?access_token" + token,
      data: session
    })
    .then(response => {
      return console.log("session added", response.data);
    })
    .catch(error => {
      return console.log("session error", error);
    });
}

//2018-11-15T14:20:40.960Z
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
