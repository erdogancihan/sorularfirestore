export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const FETCH_ALLUSERS_SUCCESS = "FETCH_ALLUSERS_SUCCESS";
export const FETCH_ALLUSERS_FAILURE = "FETCH_ALLUSERS_FAILURE";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAILURE = "EDIT_USER_FAILURE";
export const FETCH_SESSION_BEGIN = "FETCH_SESSION_BEGIN";
export const FETCH_SESSION_SUCCESS = "FETCH_SESSION_SUCCESS";
export const FETCH_SESSION_FAILURE = "FETCH_SESSION_FAILURE";



export const signUpSuccess = user => ({
  type: SIGNUP_SUCCESS,
  user
});
export const signUpFailure = error => ({
  type: SIGNUP_FAILURE,
  error
});
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error
});

export const logoutSuccess = () => ({
  type: LOGOUT,
  payload: {}
});


export const fetchAllUsersSuccess = users => ({
  type: FETCH_ALLUSERS_SUCCESS,
 users
});

export const fetchAllUsersFailure = error => ({
  type: FETCH_ALLUSERS_FAILURE,
   error 
});

export const editUserSuccess = user => ({
  type: EDIT_USER_SUCCESS,
  user
});

export const editUserFailure = error => ({
  type: EDIT_USER_FAILURE,
  error
});

export const fetchSessionBegin = session => ({
  type: FETCH_SESSION_BEGIN
});

export const fetchSessionSuccess = session => ({
  type: FETCH_SESSION_SUCCESS,
  payload: { session }
});

export const fetchSessionFailure = error => ({
  type: FETCH_SESSION_FAILURE,
  payload: { error }
});
