import React from "react";

import "./MessageChoicesBox.style.scss";

interface IProps {
  children: React.ReactNode;
}

const generateKey = () => {
  return `message_${new Date().getTime()}`;
};

const MessageChoicesBox: React.FC<IProps> = ({ children }) => {
  return (
    <div key={generateKey()} className="message-choices-box">
      {children}
    </div>
  );
};

export default MessageChoicesBox;
