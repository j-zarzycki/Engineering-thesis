import React from "react";

import "./MessageChoicesBox.style.scss";

interface IProps {
  children: React.ReactNode;
}

const MessageChoicesBox: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  const generateKey = () => {
    return `message_${new Date().getTime()}`;
  };

  return (
    <div key={generateKey()} className="message-choices-box">
      {children}
    </div>
  );
};

export default MessageChoicesBox;
