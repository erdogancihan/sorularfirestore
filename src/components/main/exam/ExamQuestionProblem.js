import React from "react";

const QuestionProblem = () => {
  return (
    <div>
      <div className="flex-container">
        <button className="button">Soruyu Bildir</button>
      </div>

      <div className="hidden">
        <form>
          <div className="form-group">
            <label htmlFor="Textarea1">
              Soru ile ilgili problemi belirtiniz.
            </label>
            <textarea className="form-control" id="Textarea1" rows="2" />
          </div>
          <button className="button">Gönder</button>
        </form>
      </div>
    </div>
  );
};

export default QuestionProblem;
