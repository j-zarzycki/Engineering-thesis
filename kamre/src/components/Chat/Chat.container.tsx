/* eslint-disable */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import apiService from "@Services/api.service"
import Chat from "./Chat.component";

interface IProps {
  isHidden: boolean;
}

const ChatContainer: React.FC<IProps> = (props: IProps) => {
  const { isHidden } = props;

  useEffect(() => {
    const socket = apiService.ChatSocketClient();

    socket.on("connect", () => {
      console.log("connected!")
    });

    socket.on("message", (msg) => {
      console.log("msg = ", msg);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  return <Chat isHidden={isHidden} />;
};

export default ChatContainer;
