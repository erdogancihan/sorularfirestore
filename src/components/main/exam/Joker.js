import React from "react";

const Joker = ({ joker50, jokerPass, jokerExtendTime, joker }) => {
  let buttonClass1 = "btn-joker";
  let buttonClass2 = "btn-joker";
  let buttonClass3 = "btn-joker";
  let buttonDisabled1 = false;
  let buttonDisabled2 = false;
  let buttonDisabled3 = false;

  if (!joker.joker1) {
    buttonClass1 = "btn-joker disabled";
    buttonDisabled1 = true;
  } else {
    buttonClass1 = "btn-joker";
    buttonDisabled1 = false;
  }

  if (!joker.joker2) {
    buttonClass2 = "btn-joker disabled";
    buttonDisabled2 = true;
  } else {
    buttonClass2 = "btn-joker";
    buttonDisabled2 = false;
  }
  if (!joker.joker3) {
    buttonClass3 = "btn-joker disabled";
    buttonDisabled3 = true;
  } else {
    buttonClass3 = "btn-joker";
    buttonDisabled3 = false;
  }

  return (
    <div className="flex-container">
      <button
        id="joker1"
        className={buttonClass1}
        disabled={buttonDisabled1}
        onClick={joker50}
      >
        50% Hakkı
      </button>
      <button
        id="joker2"
        className={buttonClass2}
        disabled={buttonDisabled2}
        onClick={jokerPass}
      >
        Soruyu geç
      </button>
      <button
        id="joker3"
        className={buttonClass3}
        disabled={buttonDisabled3}
        onClick={jokerExtendTime}
      >
        Süreyi uzat
      </button>
    </div>
  );
};

export default Joker;
