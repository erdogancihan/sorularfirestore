import React from "react";

const StartExam = ({ startExam, user, minute }) => {
  let resetTries = "";

  if (user&&user.tryOuts < 3)
    resetTries = (
      <p className="center">
        {"Yarışma hakkı " + minute + " dakika sonra tekrar 3 olacaktır."}
      </p>
    );

  return (
    <div className="container">
      <div className="flex-container question-bar">
        <div className="question-bar-item">
          Kalan Süre: <span id="counter"> Başla</span>
        </div>
        <div className="question-bar-item">
          Soru Puanı: <span>0 </span>
        </div>
        <div className="question-bar-item">
          Sorunun doğru cevaplanma oranı: 0%
          <span />
        </div>
      </div>
      <div>
        <h4 className="center">{"Yarışma Hakkınız: " + user.tryOuts}</h4>
        {resetTries}

        <div className="flex-container">
          <button className="button" id="startExamButton" onClick={startExam}>
            HAZIR MISIN?
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartExam;
