import React from "react";

import "./MessageAnswer.style.scss";

interface IProps {
  value: string;
}

const MessageAnswer: React.FC<IProps> = ({ value }) => {
  return (
    <div className="message-answer__wrapper">
      <div className="message-answer__value">{value}</div>
    </div>
  );
};

export default MessageAnswer;
