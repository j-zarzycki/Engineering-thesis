import React from "react";

import "./MessageChoicesBox.style.scss";

interface IProps {
  children: React.ReactNode;
}

const MessageChoicesBox: React.FC<IProps> = ({ children }) => {
  return <div className="message-choices-box__wrapper">{children}</div>;
};

export default MessageChoicesBox;
