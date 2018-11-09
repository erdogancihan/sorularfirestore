import axios from "axios";

export const FETCH_QUESTIONS_BEGIN = "FETCH_QUESTIONS_BEGIN";
export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
export const FETCH_QUESTIONS_FAILURE = "FETCH_QUESTIONS_FAILURE";
export const ADD_QUESTION_SUCCESS = "ADD_QUESTION_SUCCESS";
export const ADD_QUESTION_FAILURE = "ADD_QUESTION_FAILURE";
export const EDIT_QUESTION_SUCCESS = "EDIT_QUESTION_SUCCESS";
export const EDIT_QUESTION_FAILURE = "EDIT_QUESTION_FAILURE";
export const DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS";
export const DELETE_QUESTION_FAILURE = "DELETE_QUESTION_FAILURE";

export const fetchQuestionsBegin = () => ({
  type: FETCH_QUESTIONS_BEGIN
});

export const fetchQuestionsSuccess = questions => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: { questions }
});

export const fetchQuestionsFailure = error => ({
  type: FETCH_QUESTIONS_FAILURE,
  payload: { error }
});

export const addQuestionSuccess = question => ({
  type: ADD_QUESTION_SUCCESS,
  payload: { question }
});
export const addQuestionFailure = error => ({
  type: ADD_QUESTION_FAILURE,
  payload: { error }
});

export const editQuestionSuccess = question => ({
  type: EDIT_QUESTION_SUCCESS,
  payload: { question }
});
export const editQuestionFailure = error => ({
  type: EDIT_QUESTION_FAILURE,
  payload: { error }
});
export const deleteQuestionSuccess = question => ({
  type: DELETE_QUESTION_SUCCESS,
  payload: { question }
});
export const deleteQuestionFailure = error => ({
  type: DELETE_QUESTION_FAILURE,
  payload: { error }
});



export function fetchQuestions() {
  return dispatch => {
    dispatch(fetchQuestionsBegin());
    return axios
      .get("http://localhost:3001/api/questions")
      .then(response => {
        return dispatch(fetchQuestionsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchQuestionsFailure(error));
        //Some error occurred
      });
  };
}
export function addQuestion(question) {
  return dispatch => {
    axios
      .request({
        method: "post",
        url: "http://localhost:3001/api/questions",
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

export function editQuestion(question) {
  let id=question.id;
  
  return dispatch => {
    axios
      .request({
        method: "put",
        url: ("http://localhost:3001/api/questions/"+id),
        data: question
      })
      .then(response => {
        return dispatch(editQuestionSuccess(question));
      })
      .catch(error => {
        dispatch(editQuestionFailure(error));
        //Some error occurred
      });
  };
}


export function deleteQuestion(question) {
  let id=question.id;
  return dispatch => {
    axios.delete("http://localhost:3001/api/questions/"+id)   
      .then(response => {
        return dispatch(deleteQuestionSuccess(question));
      })
      .catch(error => {
        dispatch(deleteQuestionFailure(error));
        //Some error occurred
     });
  };
}