/* eslint-disable */
import React from "react";

import "./MessageChoice.style.scss";

interface IProps {
  value: string;
  index: number;
  onClick: (obj: { value: string; index: number }) => void;
}

const MessageChoice: React.FC<IProps> = ({ onClick, value, index }) => {
  const generateKey = () => {
    return `message_${new Date().getTime()}`;
  };
  
  return (
    <div
      className="message-choice__wrapper"
      onClick={() => onClick({ value, index })}
      key={generateKey()}
    >
      <span className="message-choice__value">{value}</span>
    </div>
  );
};

export default MessageChoice;
