import React from "react";

const Loading  = () => {
 
 
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
      <div className="question exam-end">
       
       <h4>Loading...</h4>
       
      </div>
    </div>
  );
};

export default Loading ;
