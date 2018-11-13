import React from "react";

const ExamFinished = ({ userPoint, tryCount, startExam }) => {
 
 let isDisabled=false;
  if (tryCount === 0) {
  isDisabled=true
  }
 
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
        <h4>Kalan Hakkınız {tryCount}</h4>
        <div className="flex-container">
          <button className="button"id="tryAgainButton" onClick={startExam} disabled={isDisabled}>
            Yeniden Dene
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamFinished;
