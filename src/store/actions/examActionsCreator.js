import axios from "axios";
import {
  fetchQuestionBegin,
  fetchQuestionSuccess,
  fetchQuestionFailure,
  editExamQuestionSuccess,
  editExamQuestionFailure
} from "./examActions";

//let loopBack = "http://localhost:3001/api";
let loopBack = "https://exam-e22e2.appspot.com/api";

export function fetchQuestion(point, topic) {
  let filter = `[where][point]=${point}&filter[where][topic][regexp]=${topic}`;
  //let filter = ':{"point":' + point + "}}";
  console.log(point, topic);
  return dispatch => {
    dispatch(fetchQuestionBegin());
    return axios
      .get(loopBack + "/questions?filter" + filter)
      .then(response => {
        let array = response.data;
        if (array.length > 0) {
          let currentIndex = array.length;
          let temporaryValue;
          let randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          return dispatch(fetchQuestionSuccess(array));
        }
      })
      .catch(error => {
        dispatch(fetchQuestionFailure(error));
        //Some error occurred
      });
  };
}

export function editExamQuestion(question) {
  let id = question.id;
  console.log(question)
  return dispatch => {
    axios
      .request({
        method: "put",
        url: loopBack + "/questions/" + id,
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
