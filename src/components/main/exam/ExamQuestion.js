import React from "react";
import { Component } from "react";

class Question extends Component {
  //to prevent setState call when component is unmounted
  _isMounted = false;

  state = {
    timer: 30,
    answer1: " button-answer",
    answer2: " button-answer",
    answer3: " button-answer",
    answer4: " button-answer",
    disabled: false,
    id: ""
  };

  componentDidMount() {
    this._isMounted = true;
    this.timerID = setInterval(() => this.tick(), 1000);
    this.props.shuffle();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timerID);
  }

  tick() {
    if (this._isMounted) {
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
  }

  render() {
    const {
      handleAnswerClick,
      question,
      jokerPass,
      joker,
      jokerExtendTime,
      handleJoker50
    } = this.props;
    //extends time for 30 seconds once
    if (joker.timer === 30) {
      this.setState(
        {
          timer: this.state.timer + 30
        },
        jokerExtendTime()
      );
    }
    if (joker.reset === true) {
      this.setState(
        {
          timer: 30
        },
        jokerPass()
      );
    }

    if (joker.joker50) {
      
      joker.joker50.map(answer => {
        switch (answer) {
          case "answer1":
            return this.setState({
              answer1: "hidden"
            });
          case "answer2":
            return this.setState({
              answer2: " hidden"
            });
          case "answer3":
            return this.setState({
              answer3: " hidden"
            });
          case "answer4":
            return this.setState({
              answer4: " hidden"
            });
            default:
            return null;
        }
      });
      handleJoker50();
    }

    //resets timer on every answer button click
    const handleResetTimer = e => {
      e.preventDefault();
      if (this._isMounted) {
        this.setState({
          timer: 30
        });
      }
    };

    //changes the class of clicked button and disables other buttons
    const handlePressed = e => {
      e.persist();
      if (this._isMounted) {
        clearInterval(this.timerID);
        setTimeout(() => {
          handleAnswerClick(e);
        }, 2000);

        const clickedButton = e.target.name;
        switch (clickedButton) {
          case "answer1":
            if (question.correctAnswer === "answer1")
              return this.setState({
                answer1: "button-answer success",
                disabled: true
              });
            else if (question.correctAnswer !== "answer1")
              return this.setState({
                answer1: " button-answer warning",
                [question.correctAnswer]: " button-answer success",
                disabled: true
              });

            break;
          case "answer2":
            if (question.correctAnswer === "answer2")
              return this.setState({
                answer2: " button-answer success",
                disabled: true
              });
            else if (question.correctAnswer !== "answer2")
              return this.setState({
                answer2: " button-answer warning",
                [question.correctAnswer]: " button-answer success",
                disabled: true
              });
            break;
          case "answer3":
            if (question.correctAnswer === "answer3")
              return this.setState({
                answer3: " button-answer success",
                disabled: true
              });
            else if (question.correctAnswer !== "answer3")
              return this.setState({
                answer3: "button-answer warning",
                [question.correctAnswer]: " button-answer success",
                disabled: true
              });
            break;
          case "answer4":
            if (question.correctAnswer === "answer4")
              return this.setState({
                answer4: " button-answer success",
                disabled: true
              });
            else if (question.correctAnswer !== "answer4")
              return this.setState({
                answer4: " button-answer warning",
                [question.correctAnswer]: " button-answer success",
                disabled: true
              });
            break;
          default:
            return this.state;
        }
      }
    };

    const handleResetClass = e => {
      if (this._isMounted) {
        setTimeout(() => {
          this.timerID = setInterval(() => this.tick(), 1000);
          this.setState({
            timer: 30,
            answer1: "button button-answer",
            answer2: "button button-answer",
            answer3: "button button-answer",
            answer4: "button button-answer",
            disabled: false
          });
        }, 2000);
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
              disabled={this.state.disabled}
              //onClick calls two functions reset timer and handleanswerClick
              onClick={e => {
                handleResetTimer(e);
                handlePressed(e);
                handleResetClass(e);
              }}
            >
              {question.answer1}
            </button>
            <button
              className={this.state.answer2}
              name="answer2"
              id={question.id}
              disabled={this.state.disabled}
              onClick={e => {
                handleResetTimer(e);
                handlePressed(e);
                handleResetClass(e);
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
              disabled={this.state.disabled}
              onClick={e => {
                handleResetTimer(e);
                handlePressed(e);
                handleResetClass(e);
              }}
            >
              {question.answer3}
            </button>
            <button
              className={this.state.answer4}
              name="answer4"
              id={question.id}
              disabled={this.state.disabled}
              onClick={e => {
                handleResetTimer(e);
                handlePressed(e);
                handleResetClass(e);
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
