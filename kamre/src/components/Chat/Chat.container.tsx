/* eslint-disable */

import React, { useState, useRef, useEffect } from "react";

import {
  MessageActivity,
  MessageAnswer,
  MessageQuestion,
  MessageChoicesBox,
  MessageChoice,
} from "@Components/Message";
import { ChatType } from "@Types/chat.type";
import apiService from "@Services/api.service";
import Chat from "./Chat.component";

interface IProps {
  isActivitiesCardHidden: boolean;
}

const ChatContainer: React.FC<IProps> = (props: IProps) => {
  const { isActivitiesCardHidden } = props;
  const chatRef = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const [isContinuation, setIsContinuation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(false);
  const [conversationData, setConversationData] = useState<
    React.ReactElement[]
  >([]);
  const [chatData, setChatData] = useState<ChatType>({
    answers: [],
    questions: [],
    is_activity: false,
  });

  const getChatData = async () => {
    setChatData({ answers: [], questions: [], is_activity: false });
    await apiService.ChatClient(isContinuation).then(({ data }) => {
      setIndex(0);
      setChatData(data);
    });
  };

  const sendEndOfNegotiation = async () => {
    await apiService.ChatResult([0]);
  }
  const onChoiceClick = (obj: { value: string; index: number }) => {
    const { value, index } = obj;
    const choiceBox = document.querySelector(".message-choices-box");
    choiceBox?.remove();
    setIndex((prevState) => prevState + 1);
    setConversationData((prevState) => [
      ...prevState,
      <MessageAnswer value={value} />,
    ]);
    if (value === "Nie") {
      renderActivity();
      setTimeout(renderConversationData, 500);
    } else if (value === "Tak") {
      sendEndOfNegotiation();
      setConversationData((prevState) => [
        ...prevState,
        <MessageQuestion value="Jesteśmy bardzo szczęśliwy, że mogliśmy Tobie pomóc! <3" />,
      ]);
    } else {
      setUserAnswers((prevState) => [...prevState, index]);
    }
  };

  const handleScroll = (ref: any) => {
    ref.scrollTop = ref.scrollHeight;
  };

  const renderNegotiation = () => {
    const { questions } = chatData;
    setIsIndicatorVisible(false);
    setConversationData((prevState) => [
      ...prevState,
      <>
        <MessageQuestion value={questions[index]} />
        <MessageChoicesBox>
          {(chatData.answers[index] as unknown as any[]).map(
            (choice, index) => {
              return (
                <MessageChoice
                  index={index}
                  value={choice}
                  onClick={onChoiceClick}
                />
              );
            },
          )}
        </MessageChoicesBox>
      </>,
    ]);
  };

  const renderActivity = async () => {
    await apiService.ChatResult(userAnswers).then(({ data: { results } }) => {
      setConversationData((prevState) => [
        ...prevState,
        <MessageActivity activityTitle={results} activityDescription="" />,
      ]);
    });

    setIsIndicatorVisible(false);
    setIsContinuation(true);

    handleScroll(chatRef);
  };

  const renderConversationData = () => {
    const { answers, questions } = chatData;
    if (answers.length >= 1 && index < questions.length) {
      setIsIndicatorVisible(true);
      setTimeout(renderNegotiation, 1500);
    }

    if (index >= questions.length && isContinuation === false) {
      setIsIndicatorVisible(true);
      renderActivity();
    }
  };

  useEffect(() => {
    if (!isActivitiesCardHidden) {
      setConversationData([]);
      setUserAnswers([]);
      setIsContinuation(false);
    }

    if (isActivitiesCardHidden) getChatData();
  }, [isContinuation, isActivitiesCardHidden]);

  useEffect(() => {
    if (isActivitiesCardHidden) renderConversationData();
  }, [chatData, index]);

  if (isActivitiesCardHidden) {
    return (
      <Chat
        ref={chatRef}
        isActivitiesCardHidden={isActivitiesCardHidden}
        isIndicatorVisible={isIndicatorVisible}
        conversationData={conversationData}
      />
    );
  } else {
    return null;
  }
};

export default ChatContainer;
