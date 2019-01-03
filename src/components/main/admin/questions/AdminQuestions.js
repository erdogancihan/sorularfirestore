import React from "react";


import ViewQuestions from "./ViewQuestions";
import AddQuestion from "./AddQuestion";

const AdminQuestions = ({
  formControl,
  handleView,
  handleChange,
  handleSubmit,
  handleQuestionEdit,
  handleQuestionDelete,  
  question,
  questions
}) => {
  return (
    <div>
      <AddQuestion
        formControl={formControl}
        handleView={handleView}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleQuestionDelete={handleQuestionDelete}
        question={question}
      />
      <ViewQuestions
        handleQuestionEdit={handleQuestionEdit}
        questions={questions}
      />
    </div>
  );
};

export default AdminQuestions;
