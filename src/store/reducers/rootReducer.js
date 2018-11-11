import { combineReducers } from "redux";
import questions from "./questions";
import exams from "./exams"

const rootReducer= combineReducers({
  questions,
  exams
});
export default rootReducer;