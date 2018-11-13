import axios from "axios";
import {
  fetchQuestionBegin,
  fetchQuestionSuccess,
  fetchQuestionFailure,
  editExamQuestionSuccess,
  editExamQuestionFailure
} from "./examActions";

export function fetchQuestion(point) {
  let filter = ':{"point":' + point + "}}";
  console.log(point)
  return dispatch => {
    dispatch(fetchQuestionBegin());
    return axios
      .get('http://localhost:3001/api/questions?filter={"where"' + filter)
      .then(response => {
        return dispatch(fetchQuestionSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchQuestionFailure(error));
        //Some error occurred
      });
  };
}

export function editExamQuestion(question) {
  let id = question.id; 
  return dispatch => {
    axios
      .request({
        method: "put",
        url: "http://localhost:3001/api/questions/" + id,
        data: question
      })
      .then(response => {
        return dispatch(editExamQuestionSuccess, question);
      })
      .catch(error => {
        dispatch(editExamQuestionFailure(error));
        //Some error occurred
      });
  };
}
