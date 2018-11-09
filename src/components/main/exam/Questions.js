import React from "react";

import Question from "./Question";
import ProgressBar from "./ProgressBar";
import Actions from "./Actions";
import Reports from "../report/Reports";

const Questions = () => {
  return (
    <div className="container questions-container">
     
      <Question />
      <Actions/>
      <ProgressBar />
      <Reports />
    </div> 
  );
};

export default Questions;