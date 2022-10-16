import React from "react";

import "./MessageActivity.style.scss";

interface IProps {
  activityTitle: string;
  activityDescription: string;
}

const MessageActivity: React.FC<IProps> = ({
  activityTitle,
  activityDescription,
}) => {
  return (
    <div className="message-activity__wrapper">
      <div className="message-activity__title">{activityTitle}</div>
      <div className="message-activity__description">{activityDescription}</div>
    </div>
  );
};

export default MessageActivity;
