import React from "react";

const ViewQuestion = ({question, handleQuestionEdit}) => {
    return (
      <React.Fragment>
    <tr >      
      <td className="tooltip"><span className="tooltiptext">{question.questionText}</span>{(question.topic).substr(1)}</td>
      <td>{question.timesAsked}</td>
      <td>{question.point}</td>
      <td>{Math.floor( question.correctAnswerCount/question.timesAsked*100)} %</td>
      <td><button className="button" onClick={()=>{handleQuestionEdit(question.id)}}>Düzenle</button></td>     
    </tr>
    </React.Fragment>
     
    
  );
};

export default ViewQuestion;
