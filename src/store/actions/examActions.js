export const FETCH_QUESTION_SUCCESS = "FETCH_QUESTION_SUCCESS";
export const FETCH_QUESTION_FAILURE = "FETCH_QUESTION_FAILURE";


export const fetchQuestionSuccess = questions => ({
  type: FETCH_QUESTION_SUCCESS,
  payload: { questions }
});

export const fetchQuestionFailure = error => ({
  type: FETCH_QUESTION_FAILURE,
  payload: { error }
});






