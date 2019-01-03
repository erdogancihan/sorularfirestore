

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";


export const loginSuccess = user=> ({
  type: LOGIN_SUCCESS,
  payload: { user }
});

export const loginFailure = user => ({
  type: LOGIN_FAILURE,
  payload: { user }
});

export const logoutSuccess =()=> ({
  type: LOGOUT,
  payload: { }
});





