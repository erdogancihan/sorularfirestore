import React from "react";

const StartExam  = ({ startExam,user}) => {
 console.log("params start")
 
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
       
       <h4 className="center">{"Yarışma Hakkınız: "+ user.tryOuts}</h4>
       <p className="center">Yarışma hakkı 1 saat sonra tekrar 3 olacaktır.</p>
        <div className="flex-container">
          <button className="button"id="startExamButton" onClick={startExam}>
           HAZIR MISIN?
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartExam ;
