import React from "react";

import "./MessageQuestion.style.scss";

interface IProps {
  value: string | React.ReactNode;
}

const MessageQuestion: React.FC<IProps> = ({ value }) => {
  return (
    <div className="message-question">
      <div className="message-question__wrapper">
        <div className="message-question__value">{value}</div>
      </div>
    </div>
  );
};

export default MessageQuestion;
