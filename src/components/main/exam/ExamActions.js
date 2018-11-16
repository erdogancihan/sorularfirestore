import React from "react";

import Joker from "./Joker";


const Actions = ({handleJoker50,jokerPass,jokerExtendTime,joker}) => {
  return (
    <div>
      <Joker joker={joker} joker50={handleJoker50} jokerPass={jokerPass} jokerExtendTime={jokerExtendTime} />
      
    </div>
  );
};

export default Actions;
