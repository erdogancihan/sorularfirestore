import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";

import StartExam from "./StartExam";
import Question from "./ExamQuestion";
import ExamFinished from "./ExamFinished";
import ProgressBar from "./ProgressBar";
import Actions from "./ExamActions";
import Reports from "../report/Reports";
import Loading from "./loading";
import {
  fetchQuestion,
  editExamQuestion
} from "../../../store/actions/examActionsCreator";
import { editUser } from "../../../store/actions/userActionsCreator";

class Exam extends Component {
  state = {
    questions: [],
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
    user: {
      userName: "",
      totalPoint: 0,
      monthPoint: 0,
      lastSession: "",
      signUpDate: "",
      city: "",
      id: "",
      tryOuts: 0
    },
    joker: {
      joker1: true,
      joker2: true,
      joker3: true,
      timer: 0,
      reset: false,
      joker50: false
    },
    questionCount: 0,
    sessionStart: false,
    buttonAnswer: "pressed",
    buttonCorrect: "success",
    buttonWrong: "warning",
    ordered: false,
    index: 0,
    tryCount: 0
  };

  render() {
    const {
      examQuestions,
      fetchQuestion,
      editExamQuestion,
      loading,
      editUser,
      user,
      session
    } = this.props;

    let question = examQuestions && examQuestions[this.state.index];

    const shuffle = () => {
      let array = examQuestions;
      while (this.state.ordered === false) {
        if (array.length > 0) {
          var currentIndex = array.length,
            temporaryValue,
            randomIndex;

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
          if (this.state.ordered === false) {
            return this.setState({
              ...this.state,
              ordered: true,
              questions: array
            });
          }
        }
      }
    };

    //starts Exam
    const startExam = () => {
      let d = new Date()
      d.setHours(d.getHours()-1)
     console.log("d", d)
      let lastSession=user.lastSession;
      console.log(lastSession)

      if (lastSession < d ) {
        this.setState({
          ...this.sate,
          user: { ...this.state.user, tryOuts: 3 }
        });
      }
      if (this.state.user.tryOuts > 0) {
        console.log("startExam");
        fetchQuestion(this.state.point); //fetches exam questions
        return this.setState({
          ...this.state,
          sessionStart: true,
          sessionEnd: false,
          joker: {
            ...this.state.joker,
            joker1: true,
            joker2: true,
            joker3: true
          },
          user: {
            ...this.user,
            userName: user.userName,
            totalPoint: user.totalPoint,
            monthPoint: user.monthPoint,
            lastSession: new Date(),
            signUpDate: user.signUpDate,
            city: user.city,
            id: user.id,
            tryOuts: this.state.user.tryOuts - 1
          }
        });
      }
    };

    const point = () => {
      console.log("point", this.state.questionCount);
      switch (this.state.questionCount) {
        case 5:
          return this.setState(
            {
              point: 20,
              ordered: false,
              index: 0,
              questions: {}
            },
            () => {
              fetchQuestion(this.state.point, () => {
                shuffle();
              });
            }
          );
        case 10:
          return this.setState(
            {
              point: 30,
              ordered: false,
              index: 0,
              questions: {}
            },
            () => {
              fetchQuestion(this.state.point, () => {
                shuffle();
              });
            }
          );
        case 20:
          return this.setState(
            {
              ...this.state,
              point: 40,
              ordered: false,
              index: 0,
              questions: {}
            },
            () => {
              fetchQuestion(this.state.point, () => {
                shuffle();
              });
            }
          );
        case 30:
          return this.setState(
            {
              ...this.state,
              point: 50,
              ordered: false,
              index: 0,
              questions: {}
            },
            () => {
              fetchQuestion(this.state.point, () => {
                shuffle();
              });
            }
          );
        default:
          return this.state;
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
          questionCount: this.state.questionCount + 1,
          index: this.state.index + 1
        },
        () => {
          point();
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
                userPoint: this.state.userPoint + this.state.question.point,
                user: {
                  ...this.state.user,
                  monthPoint:
                    this.state.user.monthPoint + this.state.question.point,
                  totalPoint:
                    this.state.user.totalPoint + this.state.question.point
                }
              },
              () => {
                editExamQuestion(this.state.question);
                editUser(this.state.user, session.id);
              }
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
                userPoint: this.state.userPoint,
                try: this.state.try - 1,
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
      console.log("süre bitti", question);
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
          editUser(this.state.user, session.id);
        }
      );
    };

    const handleJoker50 = () => {
      this.setState({
        ...this.state,
        joker: { ...this.state.joker, joker1: false }
      });

      if (this.state.joker.joker50 === false) {
        let array = ["answer1", "answer2", "answer3", "answer4"];
        let newArray = [];
        let correct = question.correctAnswer;

        for (let i = 0; i < array.length / 2; i++) {
          let index = Math.floor(Math.random() * array.length);
          if (array[index] === correct) {
            i--;
          } else {
            newArray.push(array[index]);
            array.splice(index, 1);
          }
        }
        this.setState({
          ...this.state,
          joker: { ...this.state.joker, joker50: newArray, joker1: false }
        });
      } else {
        this.setState({
          ...this.state,
          joker: { ...this.state.joker, joker50: false, joker1: false }
        });
      }
    };

    const jokerPass = () => {
      this.setState(
        {
          ...this.state,
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
          index: this.state.index + 1,
          questionCount: this.state.questionCount + 1,
          joker: { ...this.state.joker, joker2: false, reset: true }
        },
        () => {
          point();
          editExamQuestion(this.state.question);
        }
      );
      if (this.state.joker.reset === true) {
        this.setState({
          ...this.state,
          joker: { ...this.state.joker, reset: false }
        });
      }
    };

    const jokerExtendTime = () => {
      if (this.state.joker.timer === 30) {
        this.setState({
          ...this.state,
          joker: { ...this.state.joker, timer: 0 }
        });
      } else {
        this.setState({
          ...this.state,
          joker: { ...this.state.joker, joker3: false, timer: 30 }
        });
      }
      console.log("extend time");
    };

    //switches to Exam page
    if(session.id===null){
      return <Redirect to="/"/>
    }
    if (this.state.sessionStart === false) {
      return <StartExam startExam={startExam} user={user} />;
    }
    //loading
    if (loading && this.state.questionCount === 0)
      return (
        <div>
          <Loading />
        </div>
      );

    if (this.state.sessionEnd === false) {
      return (
        <div className="container questions-container">
          <Question
            handleAnswerClick={handleAnswerClick}
            question={question}
            handleTimeOver={handleTimeOver}
            sessionEnd={this.state.sessionEnd}
            shuffle={shuffle}
            joker={this.state.joker}
            jokerExtendTime={jokerExtendTime}
            jokerPass={jokerPass}
            handleJoker50={handleJoker50}
          />
          <Actions
            handleJoker50={handleJoker50}
            jokerPass={jokerPass}
            jokerExtendTime={jokerExtendTime}
            joker={this.state.joker}
          />
          <ProgressBar questionCount={this.state.questionCount}  />
          <Reports />
        </div>
      );
    } else {
      return (
        <div className="container questions-container">
          <ExamFinished
            userPoint={this.state.userPoint}
            tryCount={user.tryOuts}
            startExam={startExam}
          />
          <Actions
            handleJoker50={handleJoker50}
            jokerPass={jokerPass}
            jokerExtendTime={jokerExtendTime}
            joker={this.state.joker}
          />
          <ProgressBar questionCount={this.state.questionCount} />
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
    loading: state.exams.loading,
    user: state.user.user,
    session: state.session.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editExamQuestion: question => dispatch(editExamQuestion(question)),
    editUser: (user, token) => dispatch(editUser(user, token)),
    fetchQuestion: question => dispatch(fetchQuestion(question))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exam);
