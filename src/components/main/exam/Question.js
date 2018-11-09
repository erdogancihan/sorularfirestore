import React from "react";

const Question = () => {
  return (
    <div>
      <div className="flex-container question-bar">
        <div className="question-bar-item">
          Kalan Süre: <span>30</span>
        </div>
        <div className="question-bar-item">
          Soru Puanı: <span>25</span>
        </div>
        <div className="question-bar-item">
          Sorunun doğru cevaplanma oranı: <span>93%</span>
        </div>
      </div>
      <div className="question">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum quia
        dolorem deleniti obcaecati fugiat nostrum libero consectetur veniam
        debitis aliquam! Aşagıdakilerden hangisi doğrudur?
      </div>
      <form>
        <div className="flex-container">
          <button className="button button-answer">Cevap1</button>
          <button className="button button-answer">Cevap2</button>
        </div>
        <div className="flex-container">
          <button className="button button-answer">Cevap3</button>
          <button className="button button-answer">Cevap4</button>
        </div>
      </form>
    </div>
  );
};
export default Question;
