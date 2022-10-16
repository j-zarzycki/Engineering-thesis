/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  MessageActivity,
  MessageAnswer,
  MessageQuestion,
  MessageChoicesBox,
  MessageChoice,
} from "@Components/Message";

import "./Chat.style.scss";

interface IProps {
  isHidden: boolean;
}

const Chat: React.FC<IProps> = (props: IProps) => {
  const { isHidden } = props;

  const renderChat = () => {
    if (!isHidden) return;

    return (
      <>
      </>
    );
  };

  return <div className="chat__wrapper">{renderChat()}</div>;
};

export default Chat;
