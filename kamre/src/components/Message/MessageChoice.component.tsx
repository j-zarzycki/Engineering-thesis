import React from "react";

import "./MessageChoice.style.scss";

interface IProps {
  value: string;
  activityIndex: number;
  onClick(answer: { value: string; activityIndex: number }): void;
}

const MessageChoice: React.FC<IProps> = (props: IProps) => {
  const { value, activityIndex, onClick } = props;

  const generateKey = () => {
    return `message_${new Date().getTime()}`;
  };

  return (
    <div
      role="presentation"
      className="message-choice__wrapper"
      onClick={() => onClick({ value, activityIndex })}
      key={generateKey()}
    >
      <span className="message-choice__value">{value}</span>
    </div>
  );
};

export default MessageChoice;
