import React from "react";

import "./MessageAnswer.style.scss";

interface IProps {
  value: string;
}

const MessageAnswer: React.FC<IProps> = ({ value }) => {
  return (
    <div className="message-answer">
      <div className="message-answer__wrapper">
        <span className="message-answer__value">{value}</span>
      </div>
    </div>
  );
};

export default MessageAnswer;
