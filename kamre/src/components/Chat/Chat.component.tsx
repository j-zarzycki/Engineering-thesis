import React, { forwardRef } from "react";

import { MessageLoader, MessageQuestion } from "@Components/Message";

import "./Chat.style.scss";

interface IProps {
  isActivitiesCardHidden: boolean;
  isIndicatorVisible: boolean;
  conversationData: React.ReactElement[];
}

const Chat = forwardRef((props: IProps, ref: any) => {
  const { isActivitiesCardHidden, isIndicatorVisible, conversationData } =
    props;

  const renderChat = () => {
    if (!isActivitiesCardHidden) return null;
    return conversationData;
  };

  const renderIndicator = () => {
    return isIndicatorVisible ? (
      <MessageQuestion value={<MessageLoader />} />
    ) : null;
  };

  return (
    <div ref={ref} className="chat__wrapper">
      {renderChat()}
      {renderIndicator()}
    </div>
  );
});

export default Chat;
