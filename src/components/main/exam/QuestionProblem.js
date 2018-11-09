import React from "react";

const QuestionProblem = () => {
  return (
  
      <div className="container">
        <button className="m-1">Soruyu Bildir</button>
        <div className="hidden">
          <form>
            <div className="form-group">
              <label htmlFor="Textarea1">
                Soru ile ilgili problemi belirtiniz.
              </label>
              <textarea className="form-control" id="Textarea1" rows="2" />
            </div>
            <button>Gönder</button>
          </form>
        </div>
      </div>
  
  );
};

export default QuestionProblem;
