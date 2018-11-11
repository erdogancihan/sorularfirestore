import React from "react";
import { Component } from "react";

class Question extends Component {
  state = {
    timer: 30,
    answer1: "button button-answer",
    answer2: "button button-answer",
    answer3: "button button-answer",
    answer4: "button button-answer",
    id: ""
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.state.timer > 0) {
      this.setState({
        timer: this.state.timer - 1
      });
    } else {
      this.setState({
        timer: "Süre Bitti."
      });
    }
    if (this.state.timer === "Süre Bitti.") {
      this.props.handleTimeOver(this.props.question);
    }
  }

  render() {
    const {
      handleAnswerClick,
      question,

      examQuestions,
      handleTimeOver,
      sessionEnd
    } = this.props;

    //resets timer on every answer button click
    const handleResetTimer = e => {
      e.preventDefault();
      this.setState({
        timer: 30,
      });
    };

    //changes the class of clicked button and disables other buttons
    const handlePressed = e => {
      e.persist();
      setTimeout(() => {
        handleAnswerClick(e);
      }, 2000);
      const clickedButton = e.target.name;
      switch (clickedButton) {
        case "answer1":
          return this.setState({
            answer1: "button button-answer pressed"
          });
        case "answer2":
          return this.setState({
            answer2: "button button-answer pressed"
          });
        case "answer3":
          return this.setState({
            answer3: "button button-answer pressed"
          });
        case "answer4":
          return this.setState({
            answer4: "button button-answer pressed"
          });
        default:
          return this.state;
      }
    };
   
   
    return (
      <div>
        <div className="flex-container question-bar">
          <div className="question-bar-item">
            Kalan Süre: <span id="counter"> {this.state.timer}</span>
          </div>
          <div className="question-bar-item">
            Soru Puanı: <span>{question.point}</span>
          </div>
          <div className="question-bar-item">
            Sorunun doğru cevaplanma oranı:{" "}
            <span>
              {Math.floor(
                (question.correctAnswerCount / question.timesAsked) * 100
              )}
              %
            </span>
          </div>
        </div>
        <div className="question">{question.questionText}</div>
        <form>
          <div className="flex-container">
            <button
              className={this.state.answer1}
              name="answer1"
              id={question.id}
              //onClick calls two functions reset timer and handleanswerClick
              onClick={e => {
                handleResetTimer(e);
                handlePressed(e);
              }}
            >
              {question.answer1}
            </button>
            <button
              className={this.state.answer2}
              name="answer2"
              id={question.id}
              onClick={e => {
                handleResetTimer(e);
                handlePressed(e);
              }}
            >
              {question.answer2}
            </button>
          </div>
          <div className="flex-container">
            <button
              className={this.state.answer3}
              name="answer3"
              id={question.id}
              onClick={e => {
                handleResetTimer(e);
                handlePressed(e);
              }}
            >
              {question.answer3}
            </button>
            <button
              className={this.state.answer4}
              name="answer4"
              id={question.id}
              onClick={e => {
                handleResetTimer(e);
                handlePressed(e);
              }}
            >
              {question.answer4}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Question;
