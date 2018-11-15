import React from "react";

function ProgressBar({questionCount}) {
  return (
    <div className="progressbar">
    <h3>{questionCount+ "/ 50"}</h3>
      <div className="progress" style={{width: `${questionCount*2}%`}}>
        
      </div>
      
    </div>
  );
}

export default ProgressBar;
