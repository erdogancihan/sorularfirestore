import axios from "axios";
import {
  fetchQuestionsBegin,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  addQuestionSuccess,
  addQuestionFailure,
  editQuestionSuccess,
  editQuestionFailure,
  deleteQuestionSuccess,
  deleteQuestionFailure
} from "./questionActions";

let loopBack = "https://exam-e22e2.appspot.com/api";

export function fetchQuestions(token) {
  return dispatch => {
    dispatch(fetchQuestionsBegin());
    return axios
      .get(loopBack + "/questions?access_token" + token)
      .then(response => {
        return dispatch(fetchQuestionsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchQuestionsFailure(error));
        //Some error occurred
      });
  };
}
export function addQuestion(question, token) {
  return dispatch => {
    axios
      .request({
        method: "post",
        url: loopBack + "/questions?access_token" + token,
        data: question
      })
      .then(response => {
        return dispatch(addQuestionSuccess(response.data));
      })
      .catch(error => {
        dispatch(addQuestionFailure(error));
        //Some error occurred
      });
  };
}

export function editQuestion(question, token) {
  let id = question.id;
  console.log(token)
  console.log("edit enter questions", id, question);
  return dispatch => {
    console.log("edit questiomn", question);
    axios
      .request({
        method: "put",
        url: loopBack + "/questions/" + id + "?access_token=" + token,
        data: question
      })
      .then(response => {
        return dispatch(editQuestionSuccess(question));
      })
      .catch(error => {
        console.log("edit questioms error", error, question);
        dispatch(editQuestionFailure(error));
        //Some error occurred
      });
  };
}

export function deleteQuestion(question, token) {
  let id = question.id;
  return dispatch => {
    axios
      .delete(loopBack + "/questions/" + id + "?access_token=" + token)
      .then(response => {
        return dispatch(deleteQuestionSuccess(question));
      })
      .catch(error => {
        dispatch(deleteQuestionFailure(error));
        //Some error occurred
      });
  };
}
