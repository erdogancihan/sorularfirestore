import {
  FETCH_QUESTIONS_BEGIN,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAILURE,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE
} from "../actions/questionActions";

const initialState = {
  questions: {},
  loading: true,
  error: null
};

const questions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_QUESTIONS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        questions: action.payload.questions
      };

    case FETCH_QUESTIONS_FAILURE:
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

    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: [...state.questions, action.payload.question]
      };

    case ADD_QUESTION_FAILURE:
      console.log("Question add error", action);
      return {
        ...state.questions,
        error: action.payload.error,
        questions: []
      };

    case EDIT_QUESTION_SUCCESS:
    let editedQuestions = state.questions.filter(question => {
      return question.id !== action.payload.question.id;
    });
    console.log(state);
    return {
      loading: false,
      questions: [...editedQuestions, action.payload.question]
    };

    case EDIT_QUESTION_FAILURE:
      console.log("Question editerror", action);
      return {
        ...state.questions,
        error: action.payload.error,
        questions: []
      };

    case DELETE_QUESTION_SUCCESS:
      let newQuestions = state.questions.filter(question => {
        return question.id !== action.payload.question.id;
      });
      console.log(state);
      return {
        loading: false,
        questions: newQuestions
      };

    case DELETE_QUESTION_FAILURE:
      console.log("Question delete error", action);
      return {
        ...state.questions,
        error: action.payload.error,
        questions: []
      };

    default:
      return state;
  }
};

export default questions;
