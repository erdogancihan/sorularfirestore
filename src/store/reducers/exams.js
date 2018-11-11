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
    case FETCH_QUESTION_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_QUESTION_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
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
        loading: false,
        error: action.payload.error,
        questions: ""
      };

    case EDIT_EXAMQUESTION_SUCCESS:
      let editedQuestions = state.exams.questions.filter(question => {
        return question.id !== action.payload.question.id;
      });
      console.log(state);
      return {
        loading: false,
        questions: [...editedQuestions]
      };

    case EDIT_EXAMQUESTION_FAILURE:
      console.log("Question editerror", action);
      return {
        ...state.questions,
        loading: false,
        error: action.payload.error,
        questions: []
      };

    default:
      return state;
  }
};

export default questions;
