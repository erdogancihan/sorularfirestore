import axios from "axios";
import {
  fetchUserSuccess,
  fetchUserFailure,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  editUserSuccess,
  editUserFailure

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
  return dispatch => {
    return axios
      .get(loopBack + "/UserData?access_token=" + token)
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
  console.log(token)
  console.log("edit user", id, user);
  return dispatch => {
    console.log("edit user", user);
    axios
      .request({
        method: "put",
        url: loopBack + "/UserData/" + id + "?access_token=" + token,
        data:user
      })
      .then(response => {
        return dispatch(editUserSuccess(user));
      })
      .catch(error => {
        console.log("edit user error", error, user);
        dispatch(editUserFailure(error));
        //Some error occurred
      });
  };
}