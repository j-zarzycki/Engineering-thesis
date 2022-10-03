import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import "./TedX.style.scss";
import BackButton from "@Components/BackButton";
import Header from "@Components/Header";
import SaveButton from "@Components/SaveButton";
import TEDX_URL from "@Constants/TedX.constatns";

interface IProps {
  createTedX(): Promise<void>;
}

const TedX: React.FC<IProps> = (props: IProps) => {
  const { createTedX } = props;
  const videoUrl = TEDX_URL;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="tedx">
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
            <SaveButton text="Gotowe" type="submit" onClick={createTedX()} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TedX;
