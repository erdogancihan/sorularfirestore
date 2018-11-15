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
import {fetchAllUsers} from "../../../store/actions/userActionsCreator";
import { setToken } from "../../../store/actions/loginActionsCreator";

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

  // fetches data from database when component mounts.
  componentDidMount() {
    setTimeout(() => {
      this.props.fetchQuestions(this.state, this.props.session.id);
      this.props.fetchAllUsers(this.props.session.id);
    }, 1500);
  }

  render() {
    const { loading, questions, session,users } = this.props;

    //shows addQuestion/editquestion form
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
        this.props.addQuestion(this.state.question, session.session.id);
      } else {
        this.props.editQuestion(this.state.question, session.session.id);
      }
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
    };
    //Deletes question
    const handleQuestionDelete = e => {
      console.log(this.state.question);
      this.props.deleteQuestion(this.state.question, session.session.id);
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

    if (session.id === null) return <Redirect to="/" />;
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
    session: state.session.session,
    users:state.user.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setToken: () => dispatch(setToken()),
    addQuestion: (question, token) => dispatch(addQuestion(question, token)),
    editQuestion: (question, token) => dispatch(editQuestion(question, token)),
    deleteQuestion: (question, token) =>
      dispatch(deleteQuestion(question, token)),
    fetchQuestions: (question, token) =>
      dispatch(fetchQuestions(question, token)),
      fetchAllUsers:token=>dispatch(fetchAllUsers(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
