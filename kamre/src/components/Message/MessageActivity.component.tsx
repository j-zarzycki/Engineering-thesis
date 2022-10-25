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
      case "Spacer":
        history.push("/walking");
        break;
      case "Film edukacyjny":
        history.push("/eduvideo");
        break;
      case "Przyjaciel stres":
        history.push("/ytpage");
        break;
      case "Muzyka klasyczna":
        history.push("/music");
        break;
      case "Ostudzenie napięcia":
        history.push("/coldwater");
        break;
      case "Co w duszy gra?":
        history.push("/sounds");
        break;
      case "Trening Schultza":
        history.push("/schultztraining");
        break;
      case "Mięsień kreatywności":
        history.push("/creativity");
        break;
      default:
        break;
    }
  };

  return (
    <div
      role="presentation"
      className="message-activity__wrapper"
      onClick={onActivityClick}
    >
      <div className="message-activity__title">{activityTitle}</div>
      <div className="message-activity__description">{activityDescription}</div>
    </div>
  );
};

export default MessageActivity;
