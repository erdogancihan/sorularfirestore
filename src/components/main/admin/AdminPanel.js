import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import AdminQuestions from "./questions/AdminQuestions";
import Users from "./users/Users";
import {
  addQuestion,
  fetchQuestions,
  editQuestion,
  deleteQuestion
} from "../../../store/actions/questionActionCreator";
import { fetchAllUsers } from "../../../store/actions/userActionsCreator";

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
      deleteButton: "remove button",
      addQuestionButton: "visible button",
      toggleEditButton: "0"
    },
    users: {}
  };

  render() {
    const { loading, questions, users, user } = this.props;

    if (!users) {
      if (user) {
        console.log(this.props.user.id);
        this.props.fetchAllUsers(this.props.user.id);
        this.props.fetchQuestions(this.props.user.id);
      }
    }

    //shows addQuestion/editquestion form
    const handleView = () => {
      this.state.formControl.visible === "hidden"
        ? this.setState({
            ...this.state,
            formControl: {
              ...this.state.formControl,
              visible: "visible"
            }
          })
        : this.setState({
            ...this.state,
            formControl: {
              ...this.state.formControl,
              visible: "hidden"
            }
          });
    };

    //handle changes of form  inputs
    const handleChange = e => {
      this.setState({
        ...this.state,
        question: { ...this.state.question, [e.target.id]: e.target.value }
      });
    };

    //Submits a newquestion or edits a question
    const handleSubmit = e => {
      e.preventDefault();
      console.log(this.state.question);
      //it checks if edit button iss toggled. if it is not toggled it dispaches addQuestion action otherwise it dispatches editQuestion action.
      if (this.state.formControl.toggleEditButton === "0") {
        this.props.addQuestion(this.state.question, user.id);
      } else {
        this.props.editQuestion(this.state.question, user.id);
      }
      this.setState({
        ...this.state,
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
          ...this.state.formControl,
          visible: "hidden",     
        }
      });
    };

    
    //Deletes question
    const handleQuestionDelete = e => {
      console.log(this.state.question);
      this.props.deleteQuestion(this.state.question, user.id);
      //clears the state
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
          correctAnswerCount: 0,
          timesAsked: 0
        },
        //makes form unvisible
        formControl: {
          visible: "hidden",
          buttonText: "Gönder",
          deleteButton: "remove",
          addQuestionButton: "visible button",
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
            visible: "visible ",
            buttonText: "Düzenle",
            deleteButton: "visible button",
            addQuestionButton: "remove button",
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
            addQuestionButton: "visible button",
            toggleEditButton: "0"
          }
        });
      }
    };

    if (user && user.id === null) return <Redirect to="/" />;
    if (user && user.user.admin === false) return <Redirect to="/" />;
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
        <Users users={users} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    questions: state.questions.questions,
    loading: state.questions.loading,
    error: state.questions.error,
    user: state.user.user,
    users: state.user.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuestion: (question, token) => dispatch(addQuestion(question, token)),
    editQuestion: (question, token) => dispatch(editQuestion(question, token)),
    deleteQuestion: (question, token) =>
      dispatch(deleteQuestion(question, token)),
    fetchQuestions: (question, token) =>
      dispatch(fetchQuestions(question, token)),
    fetchAllUsers: token => dispatch(fetchAllUsers(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
