import axios from "axios";
import{fetchQuestionsBegin,
    fetchQuestionsSuccess,
    fetchQuestionsFailure,
    addQuestionSuccess,
    addQuestionFailure,
    editQuestionSuccess,
    editQuestionFailure,
    deleteQuestionSuccess,
    deleteQuestionFailure
} from "./questionActions";


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
    console.log("edit enter questioms", id, question)
    return dispatch => {
      console.log("edit questioms", question)
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
          console.log("edit questioms error", error, question)
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