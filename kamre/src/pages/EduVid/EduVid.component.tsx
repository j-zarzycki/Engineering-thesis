import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import "./EduVid.style.scss";
import BackButton from "@Components/BackButton";
import VideoHeader from "@Components/VideoHeader";
import SaveButton from "@Components/SaveButton";
import EDUVID_URL from "@Constants/EduVid.constatns";

interface IProps {
  createEduVid(): Promise<void>;
}

const EduVid: React.FC<IProps> = (props: IProps) => {
  const { createEduVid } = props;
  const videoUrl = EDUVID_URL;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="edu-vid">
          <div className="title">
            <BackButton defaultHref="/home" />
            <VideoHeader title="Netflix and chill?" />
          </div>
          <div className="video-container">
            <iframe
              className="embed"
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
          </div>
          <p className="source">
            Źródło TED: How to make stress your friend | Kelly McGonigal
          </p>
          <p className="activity-description">
            Internet to gigantyczne źródło informacji - czas zrobić z tego
            pożytek! Usiądź wygodnie, weź popcorn lub lody i obejrzyj krótki
            film dotyczący stresu. Im więcej się o nim dowiesz tym lepiej
            będziesz z nim walczyć.
          </p>
          <div className="ion-text-center">
            <SaveButton text="Gotowe" type="submit" onClick={createEduVid()} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EduVid;
