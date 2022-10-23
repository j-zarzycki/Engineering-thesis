/* eslint-disable */
import React from "react";
import { useHistory } from "react-router-dom";

import "./MessageActivity.style.scss";

interface IProps {
  activityTitle: string;
  activityDescription: string;
}

const MessageActivity: React.FC<IProps> = ({
  activityTitle,
  activityDescription,
}) => {
  const history = useHistory();

  const onActivityClick = () => {
    console.log("activity =", activityTitle);
    switch (activityTitle[0]) {
      case "Małe kroki":
        history.push("/smallsteps");
        break;
      case "Oddychanie":
        history.push("/breathing");
        break;
      case "5-4-3-2-1":
        history.push("/fivetoone");
        break;
      case "Wdzięczność":
        history.push("/gratitude");
        break;
      case "Złość":
        history.push("/anger");
        break;
      case "Świadomy prysznic":
        history.push("/shower");
        break;
      case "Stopy":
        history.push("/feet");
        break;
      case "Jazda na rowerze":
        history.push("/bike");
        break;
      case "Poprzedni dzień":
        history.push("/previousday");
        break;
      case "Przygotuj coś pysznego":
        history.push("/preparemeal");
        break;
      case "Dobre słowo":
        history.push("/goodword");
        break;
      case "Ciężary":
        history.push("/weights");
        break;
      case "Wizualizacja":
        history.push("/visualization");
        break;
      case "Walking":
        history.push("/walking");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="message-activity__wrapper"
      onClick={onActivityClick}
    >
      <div className="message-activity__title">{activityTitle}</div>
      <div className="message-activity__description">{activityDescription}</div>
    </div>
  );
};

export default MessageActivity;
