import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import "./SchulzTraining.style.scss";
import BackButton from "@Components/BackButton";
import Header from "@Components/Header";
import SaveButton from "@Components/SaveButton";
import SCHULZ_TRAINING_URL from "@Constants/SchulzTraining.constatns";

interface IProps {
  createSchulzTraining(): Promise<void>;
}

const SchulzTraining: React.FC<IProps> = (props: IProps) => {
  const { createSchulzTraining } = props;
  const videoUrl = SCHULZ_TRAINING_URL;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="s-training">
          <div className="title">
            <BackButton defaultHref="/home" />
            <Header
              title="Trening autogenny schulza"
              subtitle="Czyli jak radzić sobie z trudnymi sytuacjami, zachowując spokój i panując nad emocjami."
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
            <SaveButton
              text="Gotowe"
              type="submit"
              onClick={createSchulzTraining()}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SchulzTraining;
