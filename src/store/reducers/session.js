import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/loginActions";

const initialState = {
  session:{
    id:null,
    userId:null
  },
  error: null
};

const Session = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        error:null,
        session: action.payload.user
      };

    case LOGIN_FAILURE:
      return {
        error: action.payload.error,
        session:{id:null}
      };
    case LOGOUT:
      return {
        session:{id:null},
        error: null
      };
    default:
      return state;
  }
};

export default Session;
