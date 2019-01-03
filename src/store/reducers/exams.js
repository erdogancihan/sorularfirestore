import {
  FETCH_QUESTION_BEGIN,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  EDIT_EXAMQUESTION_SUCCESS,
  EDIT_EXAMQUESTION_FAILURE
} from "../actions/examActions";

const initialState = {
  questions: {},
  loading: true,
  error: null
};

const questions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        questions: action.payload.questions
      };

    case FETCH_QUESTION_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        error: action.payload.error,
        questions: ""
      };

    default:
      return state;
  }
};

export default questions;
