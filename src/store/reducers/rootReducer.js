import { combineReducers } from "redux";
import questions from "./questions";
import exams from "./exams"
import user from "./user"

const rootReducer= combineReducers({
  questions,
  exams,
  user
});
export default rootReducer;