import { combineReducers } from "redux";
import questions from "./questions";
import exams from "./exams"
import session from "./session"
import user from "./user"

const rootReducer= combineReducers({
  questions,
  exams,
  session,
  user
});
export default rootReducer;