
export function fetchQuestions() {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .get({
        collection: "questions"
      })
      .then(response => {
        return console.log(response);
      })
      .catch(error => {
        return console.log(error);
      });
  };
}

export const addQuestion = question => { 
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log(question);
    firestore
      .collection("questions")
      .add(question)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export function editQuestion(question) {
  console.log(question)
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();

    fireStore
      .update({ collection: "questions", doc: question.id }, question)
      .then(resp => {
        return console.log("edited");
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function deleteQuestion(question) {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .delete({ collection: "questions", doc: question.id })
      .then(resp => {
        return console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };
}
