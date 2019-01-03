import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
import {
  editUser,
  addSession
} from "../../../store/actions/userActionsCreator";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      user: {},
      sessionPoint: 0,
      sessionEnd: false,
      point: 1,
      joker: {
        joker1: true,
        joker2: true,
        joker3: true,
        timer: 0,
        reset: false,
        joker50: false
      },
      topic: "",
      questionCount: 0,
      sessionStart: false,
      buttonAnswer: "pressed",
      buttonCorrect: "success",
      buttonWrong: "warning",
      ordered: false,
      index: 0,
      minute: 60
    };

    this.resetTryOuts = this.resetTryOuts.bind(this);
  }

  componentWillMount() {
    //sets the exam topic to state
    this.setState(
      {
        ...this.state,
        topic: this.props.match.params.topic,
        user: this.props.user
      },
      () => {
        if (this.state.topic === "all") {
          this.setState({
            ...this.state,
            topic: "^0"
          });
        }
      }
    );
  }

  componentDidMount() {
    // I set state here to make resetTryOuts sync.
    this.setState({ ...this.state }, () => {
      this.resetTryOuts();
      this.props.fetchQuestion(this.state.point, this.state.topic); //fetches exam questions
    });
  }

  componentDidUpdate(previousProps) {
    //if user is not signed in it redirects to homepage
    // console.log(this.props);
    if (previousProps.examQuestions !== this.props.examQuestions) {
      return this.setState(
        {
          ...this.state,
          index: 0
        },
        console.log("yenisorular", this.state.index)
      );
    }
    if (!this.props.user) {
      this.props.history.push("/");
    }
  }

  resetTryOuts() {
    //gets sytem time
    let d = new Date();
    if (this.props.user) {
      const user = this.props.user.user;
      let lastSession = new Date(user.lastSession);
      const _MS_PER_DAY = 1000 * 60;
      //Gets a and b date differences in hours.
      // a and b are javascript Date objects
      function dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(
          a.getFullYear(),
          a.getMonth(),
          a.getDate(),
          a.getHours(),
          a.getMinutes()
        );
        const utc2 = Date.UTC(
          b.getFullYear(),
          b.getMonth(),
          b.getDate(),
          b.getHours(),
          b.getMinutes()
        );
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }
      //two date's difference
      let difference = dateDiffInDays(lastSession, d);
      difference = Math.abs(difference - 60);
      //if time difference is less than 60 minutes timer starts
      //to set tryOut count to 3 after 60 minutes
      if (difference <= 60) {
        this.setState(
          {
            ...this.state,
            minute: difference
          },
          () => {
            this.timerID = setInterval(() => this.tick(), 10000);
          }
        );
      }
      //if last session time is earlier than 60 minutes it sets tryOuts
      //count to 3 with the new lastSession time
      else {
        this.setState(
          {
            ...this.state,
            user: {
              ...this.state.user,
              user: {
                ...this.state.user.user,
                tryOuts: 3,
                lastSession: d.toISOString()
              }
            }
          },
          () => {
            this.props.editUser(this.state.user);
          }
        );
      }
    }
  }

  componentWillUnmount() {
    //reset timer before component unmounts.
    clearInterval(this.timerID);
  }

  //timer ticks..
  tick() {
    let d = new Date();
    if (this.state.minute > 0) {
      this.setState({
        minute: this.state.minute - 1
      });
    } else {
      if (this.props.user.user.tryOuts < 3) {
        this.setState(
          {
            ...this.state,
            user: {
              ...this.state.user,
              user: {
                ...this.state.user.user,
                tryOuts: 3,
                lastSession: d.toISOString()
              }
            }
          },
          () => {
            //update db by new tryOut and lastSession
            clearInterval(this.timerID);
            this.props.editUser(this.state.user);
            console.log(this.props.user);
          }
        );
      }
    }
  }

  //starts Exam

  render() {
    const {
      examQuestions,
      fetchQuestion,
      editExamQuestion,
      loading,
      editUser,
      user,
   } = this.props;

    //console.log(this.state)
    const startExam = () => {
      if (user.user.tryOuts > 0) {
        fetchQuestion(this.state.point, this.state.topic);
        this.setState({
          ...this.state,
          sessionStart: true,
          sessionEnd: false,
          sessionPoint: 0,
          point:0,
          joker: {
            ...this.state.joker,
            joker1: true,
            joker2: true,
            joker3: true
          }
        });
      }
    };

    //set question point according to questionCount
    const point = () => {
      this.setState(
        {
          ...this.state,
          questionCount: this.state.questionCount + 1
        },
        console.log("point function", this.state.index)
      );
      switch (this.state.questionCount) {
        case 5:
          return this.setState(
            {
              ...this.state,
              point: 2,
              index: 0
            },
            () => {
              console.log(this.state);
              fetchQuestion(this.state.point, this.state.topic);
            }
          );
        case 10:
          return this.setState(
            {
              ...this.state,
              point: 3,
              index: 0
            },
            () => {
              console.log(this.state);
              fetchQuestion(this.state.point, this.state.topic);
            }
          );
        case 20:
          return this.setState(
            {
              ...this.state,
              point: 4,
              index: 0
            },
            () => {
              console.log(this.state);
              fetchQuestion(this.state.point, this.state.topic);
            }
          );
        case 30:
          return this.setState(
            {
              ...this.state,
              point: 5,
              index: 0
            },
            () => {
              console.log(this.state);
              fetchQuestion(this.state.point, this.state.topic);
            }
          );
        default:
          return this.state;
      }
    };

    //handles answer button click
    const handleAnswerClick = e => {
      e.preventDefault();
      let dateToday = new Date();
      const answer = e.target.name;
      point();
      this.setState(
        {
          ...this.state,
          question: examQuestions[this.state.index],
          index: this.state.index + 1
        },
        () => {
          if (this.state.question.correctAnswer === answer) {
            this.setState(
              {
                ...this.state,
                question: {
                  ...this.state.question,
                  correctAnswerCount:
                    this.state.question.correctAnswerCount + 1,
                  timesAsked: this.state.question.timesAsked + 1
                },
                sessionPoint:
                  this.state.sessionPoint + this.state.question.point,
                user: {
                  ...this.state.user,
                  user: {
                    ...this.state.user.user,
                    monthPoint:
                      parseInt(this.state.user.user.monthPoint) +
                      parseInt(this.state.question.point),
                    totalPoint:
                      parseInt(this.state.user.user.totalPoint) +
                      parseInt(this.state.question.point),
                    lastSession: dateToday.toISOString()
                  }
                }
              },
              () => {
                editExamQuestion(this.state.question);
                editUser(this.state.user);
              }
            );
          } else {
            console.log("yanlış", this.state);
            this.setState(
              {
                ...this.state,
                question: {
                  ...this.state.question,
                  timesAsked: this.state.question.timesAsked + 1
                },
                questionCount: 0,
                point: 1,
                user: {
                  ...this.state.user,
                  user: {
                    ...this.state.user.user,
                    tryOuts: this.state.user.user.tryOuts - 1,
                    lastSession: dateToday.toISOString()
                  }
                },

                sessionEnd: true,
                minute: 60,
                index: 0
              },
              () => {
                editExamQuestion(this.state.question);
                editUser(this.state.user);
                addSession(this.state.sessionPoint, user);
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
      let dateToday = new Date();
      this.setState(
        {
          ...this.state,
          question: examQuestions[this.state.index],
          question: {
            ...this.state.question,
            timesAsked: this.state.question.timesAsked + 1
          },
          questionCount: 0,
          point: 1,
          user: {
            ...this.state.user,
            user: {
              ...this.state.user.user,
              tryOuts: this.state.user.user.tryOuts - 1,
              lastSession: dateToday.toISOString()
            }
          },
          sessionEnd: true,
          minute: 60,
          index: 0
        },
        () => {
          editExamQuestion(this.state.question);
          editUser(this.state.user);
          addSession(this.state.sessionPoint, user);
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
        let correct = examQuestions[this.state.index].correctAnswer;

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
      point();
      this.setState(
        {
          ...this.state,
          question: {
            ...this.state.question,
            timesAsked: this.state.question.timesAsked + 1
          },
          index: this.state.index + 1,
          joker: { ...this.state.joker, joker2: false, reset: true }
        },
        () => {
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
    if (user === null) {
      return <Redirect to="/" />;
    }
    if (this.state.sessionStart === false) {
      return (
        <StartExam
          startExam={startExam}
          user={user.user}
          minute={this.state.minute}
        />
      );
    }
    //loading
    if ((loading && this.state.questionCount === 0) || examQuestions.length < 0)
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
            question={examQuestions[this.state.index]}
            handleTimeOver={handleTimeOver}
            sessionEnd={this.state.sessionEnd}
            joker={this.state.joker}
            jokerExtendTime={jokerExtendTime}
            jokerPass={jokerPass}
            handleJoker50={handleJoker50}
            point={this.state.sessionPoint}
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
    } else {
      return (
        <div className="container questions-container">
          <ExamFinished
            userPoint={this.state.sessionPoint}
            tryOuts={user.user.tryOuts}
            startExam={startExam}
            minute={this.state.minute}
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
  //console.log(state);
  return {
    examQuestions: state.exams.questions,
    loading: state.exams.loading,
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editExamQuestion: question => dispatch(editExamQuestion(question)),
    editUser: user => dispatch(editUser(user)),
    fetchQuestion: (question, topic) => dispatch(fetchQuestion(question, topic))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exam);
