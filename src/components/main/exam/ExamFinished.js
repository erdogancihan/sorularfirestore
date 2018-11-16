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
      <div >
        <h2 className="center">Üzgünüz Yarışma Bitti.</h2>
        <h2 className="center">Puanınınız:<span> {userPoint}</span></h2>
        <h4 className="center">Kalan Hakkınız {tryCount}</h4>
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
