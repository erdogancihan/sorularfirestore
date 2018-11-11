import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import StartExam from "./StartExam";
import Question from "./ExamQuestion";
import ExamFinished from "./ExamFinished";
import ProgressBar from "./ProgressBar";
import Actions from "./ExamActions";
import Reports from "../report/Reports";
import {
  fetchQuestion,
  editExamQuestion
} from "../../../store/actions/examActionsCreator";

class Exam extends Component {
  state = {
    question: {
      topic: "",
      questionText: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: "",
      point: "",
      correctAnswerCount: 0,
      timesAsked: 0,
      id: ""
    },
    userId: "",
    userPoint: 0,
    sessionEnd: false,
    point: 10,
    joker1: true,
    joker2: true,
    joker3: true,
    questionCount: 1,
    sessionStart: false,
    buttonAnswer:"pressed",
    buttonCorrect:"success",
    buttonWrong:"warning"
  };

  render() {
    const {
      examQuestions,
      fetchQuestion,
      editExamQuestion,
      loading
    } = this.props;

    //starts Exam
    const startExam = () => {
      fetchQuestion(this.state.point); //fetches exam questions
      return this.setState({
        ...this.state,
        sessionStart: true
      });
    };
    const point = () => {
      if (this.state.questionCount < 10 && this.state.questionCount > 4) {
        this.setState({
          ...this.state,
          point: 20
        });
      } else if (
        this.state.questionCount < 20 &&
        this.state.questionCount > 9
      ) {
        this.setState({
          ...this.state,
          point: 30
        });
      } else if (
        this.state.questionCount < 30 &&
        this.state.questionCount > 19
      ) {
        this.setState({
          ...this.state,
          point: 40
        });
      } else if (this.state.questionCount > 39) {
        this.setState({
          ...this.state,
          point: 50
        });
      }
    };

    //handles answer button click
    const handleAnswerClick = e => {
      e.preventDefault();
      
      let askedQuestion = examQuestions.filter(question => {
        return question.id === e.target.id;
      });
      const answer = e.target.name;
      this.setState(
        {
          question: {
            ...this.state.question,
            topic: askedQuestion[0].topic,
            questionText: askedQuestion[0].questionText,
            answer1: askedQuestion[0].answer1,
            answer2: askedQuestion[0].answer2,
            answer3: askedQuestion[0].answer3,
            answer4: askedQuestion[0].answer4,
            correctAnswer: askedQuestion[0].correctAnswer,
            point: askedQuestion[0].point,
            correctAnswerCount: askedQuestion[0].correctAnswerCount,
            timesAsked: askedQuestion[0].timesAsked,
            id: askedQuestion[0].id
          },
          questionCount: this.state.questionCount + 1
        },
        () => {
          if (askedQuestion[0].correctAnswer === answer) {
            this.setState(
              {
                question: {
                  ...this.state.question,
                  topic: this.state.question.topic,
                  questionText: this.state.question.questionText,
                  answer1: this.state.question.answer1,
                  answer2: this.state.question.answer2,
                  answer3: this.state.question.answer3,
                  answer4: this.state.question.answer4,
                  correctAnswer: this.state.question.correctAnswer,
                  point: this.state.question.point,
                  correctAnswerCount:
                    this.state.question.correctAnswerCount + 1,
                  timesAsked: this.state.question.timesAsked + 1,
                  id: this.state.question.id
                },
                questionCount: this.state.questionCount + 1,
                userPoint: this.state.userPoint + this.state.question.point
              },
              () => editExamQuestion(this.state.question)
            );
          } else {
            this.setState(
              {
                question: {
                  ...this.state.question,
                  topic: this.state.question.topic,
                  questionText: this.state.question.questionText,
                  answer1: this.state.question.answer1,
                  answer2: this.state.question.answer2,
                  answer3: this.state.question.answer3,
                  answer4: this.state.question.answer4,
                  correctAnswer: this.state.question.correctAnswer,
                  point: this.state.question.point,
                  correctAnswerCount: this.state.question.correctAnswerCount,
                  timesAsked: this.state.question.timesAsked + 1,
                  id: this.state.question.id
                },
                questionCount: this.state.questionCount + 1,
                userPoint: this.state.userPoint,
                sessionEnd: true
              },
              () => {
                editExamQuestion(this.state.question);
              }
            );
            console.log("yanlış", this.state);
          }
        }
      );
     
    };
    //time Over
    const handleTimeOver = question => {

      console.log("süre bitti", question)
      this.setState(
        {
          question: {
            ...this.state.question,
            topic: question.topic,
            questionText: question.questionText,
            answer1: question.answer1,
            answer2: question.answer2,
            answer3: question.answer3,
            answer4: question.answer4,
            correctAnswer: question.correctAnswer,
            point: question.point,
            correctAnswerCount: question.correctAnswerCount,
            timesAsked: question.timesAsked + 1,
            id: question.id
          },
          questionCount: question.questionCount + 1,
          userPoint: this.state.userPoint,
          sessionEnd: true
        },
        () => {
          editExamQuestion(this.state.question);
        }
      );
    };
   
    let length = examQuestions.length;
    let index = Math.floor(Math.random() * length);
    let question = examQuestions && examQuestions[index];

    //switches to Exam page
    if (this.state.sessionStart === false) {
      return <StartExam startExam={startExam} />;
    }
    //loading
    if (loading) return <div>Loading...</div>;
    if (this.state.sessionEnd === false) {
      return (
        <div className="container questions-container">
          <Question
            handleAnswerClick={handleAnswerClick}
            question={question}
            handleTimeOver={handleTimeOver}
            sessionEnd={this.state.sessionEnd}
          />

          <Actions />
          <ProgressBar />
          <Reports />
        </div>
      );
    } else  {
      return (
        <div className="container questions-container">
      
         <ExamFinished userPoint={this.state.userPoint}/>
          <Actions />
          <ProgressBar />
          <Reports />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    examQuestions: state.exams.questions,
    loading: state.exams.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editExamQuestion: question => dispatch(editExamQuestion(question)),
    fetchQuestion: question => dispatch(fetchQuestion(question))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exam);
