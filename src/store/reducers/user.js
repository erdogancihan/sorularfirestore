import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_ALLUSERS_SUCCESS,
  FETCH_ALLUSERS_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE
} from "../actions/userActions";
const initialState = {
  user: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        error: user.payload.error
      };
    case FETCH_ALLUSERS_SUCCESS:
      return {
        ...state,
        users: action.payload.user
      };

    case FETCH_ALLUSERS_FAILURE:
      return {
        ...state,
        error: user.payload.error
      };
      case EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };

    case EDIT_USER_FAILURE:
      return {
        ...state,
        error: user.payload.error
      };

    default:
      return state;
  }
};

export default user;
