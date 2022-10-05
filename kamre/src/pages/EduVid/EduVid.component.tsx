import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import "./EduVid.style.scss";
import BackButton from "@Components/BackButton";
import Header from "@Components/Header";
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
            <Header
              title="Czy stres to czyste zło?"
              subtitle="Sprwadź jak można rzucić pozytywne światło na stres, który odczuwamy."
            />
          </div>
          <div className="video-container">
            <iframe
              className="embed"
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
          </div>
          <div className="ion-text-center">
            <SaveButton text="Gotowe" type="submit" onClick={createEduVid()} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EduVid;
