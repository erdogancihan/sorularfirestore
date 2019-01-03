import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

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
  constructor(props) {
    super(props);
    this.state = {
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
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
    
  };
  componentDidMount() {
    this.props.fetchAllUsers();
    this.props.fetchQuestions();
    const { firestore} = this.context.store;
    firestore.onSnapshot({collection:"questions"});
          
  }

  //shows addQuestion/editquestion form
  handleView = () => {
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
  handleChange = e => {
    this.setState({
      ...this.state,
      question: { ...this.state.question, [e.target.id]: e.target.value }
    });
  };

  //Submits a newquestion or edits a question
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.question);
    //it checks if edit button iss toggled. if it is not toggled it dispaches addQuestion action otherwise it dispatches editQuestion action.
    if (this.state.formControl.toggleEditButton === "0") {
      this.props.addQuestion(this.state.question);
    } else {
      this.props.editQuestion(this.state.question);
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
        visible: "hidden"
      }
    });
  };

  //Deletes question
  handleQuestionDelete = e => {
    console.log(this.state.question);
    this.props.deleteQuestion(this.state.question);
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
  handleQuestionEdit = e => {
    //shows edit question form
    let filter = this.props.questions.filter(question => {
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
  
  Questions = () => {
    console.log(this.props)
    if (this.props.questions) {
      return (
        <AdminQuestions
          formControl={this.state.formControl}
          handleChange={this.handleChange}
          handleView={this.handleView}
          handleSubmit={this.handleSubmit}
          handleQuestionEdit={this.handleQuestionEdit}
          handleQuestionDelete={this.handleQuestionDelete}
          questions={this.props.questions}
          question={this.state.question}
        />
      );
    } else {
      return <div>loading</div>;
    }
  };
  Users = () => {
    if (this.props.users) {
      return <Users users={this.props.users} />;
    } else {
      return <div>loading</div>;
    }
  };
  render() {
    const { user } = this.props;

    if (user && user.admin === false) return <Redirect to="/" />;

    return (
      <div className="flex-container">
        <this.Questions/>
        <this.Users/>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    questions: state.firestore.ordered.questions,
    user: state.firestore.data.user,
    users: state.firestore.ordered.users
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
