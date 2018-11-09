import React from "react";
import ViewQuestion from "./ViewQuestion";

const ViewQuestions = ({ questions, handleQuestionEdit }) => {
  return (
    <div className="container  ">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Konu</th>
              <th>Sorulma Sayısı</th>
              <th>Puanı</th>
              <th>Bilinme Durumu</th>
              <th>Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {questions &&
              questions.map(question => {
                return(
                <ViewQuestion key={question.id} question={question} handleQuestionEdit={handleQuestionEdit}/>)
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewQuestions;
