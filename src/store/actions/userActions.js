export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_ALLUSERS_SUCCESS = "FETCH_ALLUSERS_SUCCESS";
export const FETCH_ALLUSERS_FAILURE = "FETCH_ALLUSERS_FAILURE";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAILURE = "EDIT_USER_FAILURE";
export const FETCH_SESSION_BEGIN = "FETCH_SESSION_BEGIN";
export const FETCH_SESSION_SUCCESS = "FETCH_SESSION_SUCCESS";
export const FETCH_SESSION_FAILURE = "FETCH_SESSION_FAILURE";


export const fetchUserSuccess = user => ({
    type: FETCH_USER_SUCCESS,
    payload: { user }
  });
  
  export const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    payload: { error }
  });

  export const fetchAllUsersSuccess = user => ({
    type: FETCH_ALLUSERS_SUCCESS,
    payload: { user }
  });
  
  export const fetchAllUsersFailure = error => ({
    type: FETCH_ALLUSERS_FAILURE,
    payload: { error }
  });

  export const editUserSuccess = user => ({
    type: EDIT_USER_SUCCESS,
    payload: { user }
  });
  
  export const editUserFailure = error => ({
    type: EDIT_USER_FAILURE,
    payload: { error }
  });

  export const fetchSessionBegin = session => ({
    type: FETCH_SESSION_BEGIN,
   
  });

  export const fetchSessionSuccess = session => ({
    type: FETCH_SESSION_SUCCESS,
    payload: { session }
  })

  export const fetchSessionFailure = error => ({
    type: FETCH_SESSION_FAILURE,
    payload: { error }
  });
  
 
