/* eslint-disable */
/* musi być, bo eslint z niewiadomych przyczyn wywala błąd z wywołąniem renderNegotiation
   przed jej zadeklarowaniem (pomimo tego że jest to function()) */

import React, { useState, useRef, useEffect } from "react";
import { useIonViewWillEnter } from "@ionic/react";

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
    if (chatData.answers.length === 0) setConversationData([]);
    setChatData({ answers: [], questions: [], is_activity: false });
    await apiService.ChatClient(isContinuation).then(({ data }) => {
      setIndex(0);
      setChatData(data);
    });
  };

  const sendEndOfNegotiation = async () => {
    await apiService.ChatResult([0]);
  };

  const handleScroll = () => {
    const element = document.querySelector(".chat__wrapper");
    element!.scrollTop = element!.scrollHeight;
  };

  const renderActivity = async () => {
    await apiService.ChatResult(userAnswers).then(({ data: { results } }) => {
      setConversationData((prevState) => [
        ...prevState,
        <MessageActivity activityTitle={results} activityDescription="" />,
      ]);
      handleScroll();
    });

    setIsIndicatorVisible(false);
    setIsContinuation(true);
  };

  const renderConversationData = () => {
    const { answers, questions } = chatData;
    if (answers.length >= 1 && index < questions.length) {
      setIsIndicatorVisible(true);
      setTimeout(renderNegotiation, 1500);
      handleScroll();
    }

    if (index >= questions.length && isContinuation === false) {
      setIsIndicatorVisible(true);
      renderActivity();
    }
  };

  const onChoiceClick = (obj: { value: string; activityIndex: number }) => {
    const { value, activityIndex } = obj;
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
        <MessageQuestion value="Jestem bardzo szczęśliwa, że mogłam Tobie pomóc! 💜 " />,
      ]);

      setTimeout(handleScroll, 200);
    } else {
      setUserAnswers((prevState) => [...prevState, activityIndex]);
    }

    handleScroll();
  };

  function renderNegotiation() {
    const { questions } = chatData;
    setIsIndicatorVisible(false);
    setConversationData((prevState) => [
      ...prevState,
      <>
        <MessageQuestion value={questions[index]} />
        <MessageChoicesBox>
          {(chatData.answers[index] as unknown as any[]).map(
            (choice, activityIndex) => {
              return (
                <MessageChoice
                  activityIndex={activityIndex}
                  value={choice}
                  onClick={onChoiceClick}
                />
              );
            },
          )}
        </MessageChoicesBox>
      </>,
    ]);

    handleScroll();
  }

  useEffect(() => {
    if (!isActivitiesCardHidden) {
      setConversationData([]);
      setUserAnswers([]);
      setIsContinuation(false);
    }

    if (isActivitiesCardHidden) getChatData();
  }, [isContinuation, isActivitiesCardHidden]);

  useEffect(() => {
    if (isActivitiesCardHidden) {
      renderConversationData();
    }
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
  }

  return null;
};

export default ChatContainer;
