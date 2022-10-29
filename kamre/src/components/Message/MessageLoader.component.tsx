import React from "react";

import "./MessageLoader.style.scss";

const MessageLoader: React.FC = () => {
  return (
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
};

export default MessageLoader;
