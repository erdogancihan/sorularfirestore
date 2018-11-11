import React from "react";

const ExamFinished = ({ userPoint }) => {
  return (
    <div>
      <div className="flex-container question-bar">
        <div className="question-bar-item">
          Kalan Süre: <span id="counter"> Yarışma Bitti</span>
        </div>
        <div className="question-bar-item">
          Soru Puanı: <span> </span>
        </div>
        <div className="question-bar-item">
          Sorunun doğru cevaplanma oranı:
          <span />
        </div>
      </div>
      <div className="question exam-end">
        <h1>Üzgünüz Yarışma Bitti.</h1>
        <h1>Puanınınız:{userPoint}</h1>
      </div>
    </div>
  );
};

export default ExamFinished;
