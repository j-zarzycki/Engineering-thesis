import React from "react";
import { useIonRouter } from "@ionic/react";

import "./MessageActivity.style.scss";

interface IProps {
  activityTitle: string;
  activityDescription: string;
}

const MessageActivity: React.FC<IProps> = ({
  activityTitle,
  activityDescription,
}) => {
  const router = useIonRouter();

  const onActivityClick = () => {
    console.log("activity =", activityTitle);
    switch (activityTitle[0]) {
      case "Małe kroki":
        router.push("/smallsteps", "forward");
        break;
      case "Oddychanie":
        router.push("/breathing", "forward");
        break;
      case "5-4-3-2-1":
        router.push("/fivetoone", "forward");
        break;
      case "Wdzięczność":
        router.push("/gratitude", "forward");
        break;
      case "Złość":
        router.push("/anger", "forward");
        break;
      case "Świadomy prysznic":
        router.push("/shower", "forward");
        break;
      case "Stopy":
        router.push("/feet", "forward");
        break;
      case "Jazda na rowerze":
        router.push("/bike", "forward");
        break;
      case "Poprzedni dzień":
        router.push("/previousday", "forward");
        break;
      case "Przygotuj coś pysznego":
        router.push("/preparemeal", "forward");
        break;
      case "Dobre słowo":
        router.push("/goodword", "forward");
        break;
      case "Ciężary":
        router.push("/weights", "forward");
        break;
      case "Wizualizacja swojego procesu zmiany":
        router.push("/visualization", "forward");
        break;
      case "Spacer":
        router.push("/walking", "forward");
        break;
      case "Filmik edukacyjny":
        router.push("/eduvideo", "forward");
        break;
      case "Przyjaciel stres":
        router.push("/ytpage", "forward");
        break;
      case "Muzyka klasyczna":
        router.push("/music", "forward");
        break;
      case "Schłódź nadgarstki kark":
        router.push("/coldwater", "forward");
        break;
      case "Piosenka":
        router.push("/sounds", "forward");
        break;
      case "Podcast":
        router.push("/schultztraining", "forward");
        break;
      case "Mięsień kreatywności":
        router.push("/creativity", "forward");
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
