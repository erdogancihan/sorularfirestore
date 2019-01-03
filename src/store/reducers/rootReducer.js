import { combineReducers } from "redux";
import exams from "./exams"
import users from "./user"
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer= combineReducers({
 
  exams,
  users,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
export default rootReducer;