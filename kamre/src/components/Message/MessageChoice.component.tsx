import React from "react";

import "./MessageChoice.style.scss";

interface IProps {
  value: string;
}

const MessageChoice: React.FC<IProps> = ({ value }) => {
  return (
    <div className="message-choice__wrapper">
      <span className="message-choice__value">{value}</span>
    </div>
  );
};

export default MessageChoice;
