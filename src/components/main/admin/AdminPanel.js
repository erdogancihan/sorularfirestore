import React, { Component } from "react";
import { connect } from "react-redux";

import AdminQuestions from "./questions/AdminQuestions";
import Users from "./users/Users";

import {
  addQuestion,
  fetchQuestions,
  editQuestion,
  deleteQuestion
} from "../../../store/actions/questionActions";

class AdminPanel extends Component {
  state = {
    question: {
      topic: "",
      point: 0,
      questionText: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: "",
      correctAnswerRatio: "100",
      timesAsked: "0"
    },
    formControl: {
      visible: "hidden",
      buttonText: "Gönder",
      deleteButton: "remove",
      addQuestionButton: "visible",
      toggleEditButton: "0"
    },
    users: {}
  };

  componentDidMount() {
    this.props.fetchQuestions(this.state);
  }

  render() {
    const { error, loading, questions } = this.props;

    //shows addQuestion form
    const handleView = () => {
      this.state.formControl.visible === "hidden"
        ? this.setState({
            formControl: {
              ...this.state.formControl,
              visible: "visible",
              buttonText: "Gönder",
              deleteButton: "remove",
              toggleEditButton: "0"
            }
          })
        : this.setState({
            formControl: {
              ...this.state.formControl,
              visible: "hidden",
              buttonText: "Gönder",
              deleteButton: "remove",
              toggleEditButton: "0"
            }
          });
    };

    //handle changes of form  inputs
    const handleChange = e => {
      this.setState({
        question: { ...this.state.question, [e.target.id]: e.target.value }
      });
    };

    //Submits a newquestion or edits a question
    const handleSubmit = e => {
      e.preventDefault();
      console.log(this.state.question);
      //it checks if edit button iss toggled. if it is not toggled it dispaches addQuestion action otherwise it dispatches editQuestion action.
      if (this.state.formControl.toggleEditButton === "0") {
        this.props.addQuestion(this.state.question);
      } else {
        this.props.editQuestion(this.state.question);
        this.setState({
          question: {
            topic: "",
            point: 0,
            questionText: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctAnswer: "",
            correctAnswerRatio: "100",
            timesAsked: "0"
          },
          formControl: {
            visible: "hidden",
            buttonText: "Gönder",
            deleteButton: "remove",
            addQuestionButton: "visible",
            toggleEditButton: "0"
          }
        });
      }
    };
    //Deletes question
    const handleQuestionDelete = e => {
       console.log(this.state.question);
      this.props.deleteQuestion(this.state.question);
      this.setState({
        question: {
          topic: "",
          point: 0,
          questionText: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctAnswer: "",
          correctAnswerRatio: "100",
          timesAsked: "0"
        },
        formControl: {
          visible: "hidden",
          buttonText: "Gönder",
          deleteButton: "remove",
          addQuestionButton: "visible",
          toggleEditButton: "0"
        }
      });

    };

    //shows form and fills form with the selected question's values.
    const handleQuestionEdit = e => {
      //shows edit question form
      let filter = questions.filter(question => {
        return question.id === e;
      });
      console.log(this.state);
      //Toggles edit button
      if (this.state.formControl.toggleEditButton === "0") {
        this.setState({
          question: filter[0],
          formControl: {
            visible: "visible",
            buttonText: "Düzenle",
            deleteButton: "visible",
            addQuestionButton: "remove",
            toggleEditButton: "1"
          }
        });
      } else {
        //clears values when edit button untoggles
        this.setState({
          question: {
            topic: "",
            point: 0,
            questionText: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctAnswer: "",
            correctAnswerRatio: "100",
            timesAsked: "0"
          },
          formControl: {
            visible: "hidden",
            buttonText: "Gönder",
            deleteButton: "remove",
            addQuestionButton: "visible",
            toggleEditButton: "0"
          }
        });
      }
    };

   
    if (loading) {
      return <div>Loading..</div>;
    }
    return (
      <div className="flex-container">
        <AdminQuestions
          formControl={this.state.formControl}
          handleChange={handleChange}
          handleView={handleView}
          handleSubmit={handleSubmit}
          handleQuestionEdit={handleQuestionEdit}
          handleQuestionDelete={handleQuestionDelete}
          questions={questions}
          question={this.state.question}
        />
        <Users />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state)
  return {
    questions: state.questions.questions,
    loading: state.questions.loading,
    error: state.questions.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuestion: question => dispatch(addQuestion(question)),
    editQuestion: question => dispatch(editQuestion(question)),
    deleteQuestion: question => dispatch(deleteQuestion(question)),
    fetchQuestions: question => dispatch(fetchQuestions(question))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
