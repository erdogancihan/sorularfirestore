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
  question
});
export const addQuestionFailure = error => ({
  type: ADD_QUESTION_FAILURE,
  error
});

export const editQuestionSuccess = question => ({
  type: EDIT_QUESTION_SUCCESS,
  question
});
export const editQuestionFailure = error => ({
  type: EDIT_QUESTION_FAILURE,
  error
});
export const deleteQuestionSuccess = question => ({
  type: DELETE_QUESTION_SUCCESS,
  question
});
export const deleteQuestionFailure = error => ({
  type: DELETE_QUESTION_FAILURE,
  error
});
