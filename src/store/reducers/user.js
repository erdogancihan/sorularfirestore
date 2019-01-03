import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_ALLUSERS_SUCCESS,
  FETCH_ALLUSERS_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  FETCH_SESSION_BEGIN,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE
} from "../actions/userActions";
const initialState = {
  user: null,
  loading: false,
  error: null,
  session: {
    id: null,
    userId: null
  }
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
        userSignedUp: action.user
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error,
        userSignedUp: undefined
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case LOGOUT:
      return {
        session: { id: null },
        error: null
      };
    case FETCH_ALLUSERS_SUCCESS:
      return {
        ...state,
        users: action.users
      };

    case FETCH_ALLUSERS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        user:action.user
      };

    case EDIT_USER_FAILURE:
      return {
        ...state,
        error: user.error
      };

    case FETCH_SESSION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: action.payload.session
      };

    case FETCH_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: user.payload.error
      };

    default:
      return state;
  }
};

export default user;
