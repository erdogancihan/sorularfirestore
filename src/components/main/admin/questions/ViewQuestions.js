import React, { Component } from "react";
import ViewQuestion from "./ViewQuestion";

class ViewQuestions extends Component {
  state = {
    topic: "",
    point: "",
    questions: this.props.questions,
    filteredQuestions:this.props.questions,
    message: false
  };

  render() {
    const { questions, handleQuestionEdit } = this.props;

    const filterListTopic = e => {
      document.getElementById("selectPoint").selectedIndex="0";
      let updatedQuestions = questions;
      updatedQuestions = updatedQuestions.filter(question => {
        let questionTopic = question.topic;

        return questionTopic.indexOf(e.target.value) !== -1;
      });
      console.log(updatedQuestions);
      this.setState({
        questions: updatedQuestions,
        filteredQuestions:updatedQuestions
      });
      if (updatedQuestions == 0) {
        this.setState({
          topic: e.target.value,
          message: true
        });
      } else {
        this.setState({
          topic: e.target.value,
          message: false
        });
      }
      console.log(this.state);
    };
    const filterListPoint = e => {
      let updatedQuestions = this.state.filteredQuestions;
      updatedQuestions = updatedQuestions.filter(question => {
        let questionPoint = question.point.toString();
        return questionPoint.indexOf(e.target.value) !== -1;
      });
      console.log(updatedQuestions);
      this.setState({
        questions: updatedQuestions
      });
      if (updatedQuestions == 0) {
        this.setState({
          point: e.target.value,
          message: true
        });
      } else {
        this.setState({
          point: e.target.value,
          message: false
        });
      }
      console.log(this.state);
    };

    /* {questions &&
              questions.map(question => {
                return (
                  <ViewQuestion
                    key={question.id}
                    question={question}
                    handleQuestionEdit={handleQuestionEdit}
                  />
                );
              })}*/
    return (
      <div className="container  ">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <select
                    className="search1"
                    id="selectTopic"
                    onChange={filterListTopic}
                  >
                    <option value="">Konu Seç</option>
                    <option value="0tarih">Tarih</option>
                    <option value="0matematik">Matematik</option>
                    <option value="0fen">Fen</option>
                    <option value="0din bilgisi">Din Bilgisi</option>
                    <option value="0edebiyat">Edebiyat</option>
                    <option value="0genel">Genel Kültür</option>
                    <option value="0cografya">Coğrafya</option>
                    <option value="1ingilizce">İngilizce</option>
                    <option value="1almanca">Almanca</option>
                    <option value="1fransızca">Fransızca</option>
                  </select>
                </th>
                <th />
                <th>
                  <select
                    className="search2"
                    id="selectPoint"
                    onChange={filterListPoint}
                  >
                    <option value="">Puan</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </th>
                <th />
                <th />
              </tr>
              <tr>
                <th>Konu</th>
                <th>Sorulma Sayısı</th>
                <th>Puanı</th>
                <th>Bilinme Durumu</th>
                <th>Düzenle</th>
              </tr>
            </thead>
            <tbody>
              {this.state.questions &&
                this.state.questions.map(question => {
                  return (
                    <ViewQuestion
                      key={question.id}
                      question={question}
                      handleQuestionEdit={handleQuestionEdit}
                      message={this.state.message}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ViewQuestions;
