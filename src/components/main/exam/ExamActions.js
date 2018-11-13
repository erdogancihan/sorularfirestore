import React from "react";

import Joker from "./Joker";
import QuestionProblem from "./ExamQuestionProblem";

const Actions = ({joker50,jokerPass,jokerExtendTime,joker}) => {
  return (
    <div>
      <Joker joker={joker} joker50={joker50} jokerPass={jokerPass} jokerExtendTime={jokerExtendTime} />
      <QuestionProblem />
    </div>
  );
};

export default Actions;
