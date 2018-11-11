

export const FETCH_QUESTION_BEGIN = "FETCH_QUESTION_BEGIN";
export const FETCH_QUESTION_SUCCESS = "FETCH_QUESTION_SUCCESS";
export const FETCH_QUESTION_FAILURE = "FETCH_QUESTION_FAILURE";
export const EDIT_EXAMQUESTION_SUCCESS = "EDIT_EXAMQUESTION_SUCCESS";
export const EDIT_EXAMQUESTION_FAILURE = "EDIT_EXAMQUESTION_FAILURE";




export const fetchQuestionBegin = () => ({
  type: FETCH_QUESTION_BEGIN
});

export const fetchQuestionSuccess = questions => ({
  type: FETCH_QUESTION_SUCCESS,
  payload: { questions }
});

export const fetchQuestionFailure = error => ({
  type: FETCH_QUESTION_FAILURE,
  payload: { error }
});

export const editExamQuestionSuccess = question => ({
  type: EDIT_EXAMQUESTION_SUCCESS,
  payload: { question }
});
export const editExamQuestionFailure = error => ({
  type: EDIT_EXAMQUESTION_FAILURE,
  payload: { error }
});





