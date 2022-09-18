import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import BackButton from "@Components/BackButton";
import Header from "@Components/Header";
import SaveButton from "@Components/SaveButton";
import SCHULZ_TRAINING_URL from "@Constants/SchulzTraining.constatns";

interface IProps {
  createSoundMix(): Promise<void>;
}

const SoundMix: React.FC<IProps> = (props: IProps) => {
  const { createSoundMix } = props;
  const videoUrl = SCHULZ_TRAINING_URL;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="title">
          <BackButton defaultHref="/home" />
          <Header
            title="Trening autogenny schulza"
            subtitle="Czyli jak radzić sobie z trudnymi sytuacjami, zachowując spokój i panując nad emocjami."
          />
        </div>
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        />
        <div className="ion-text-center">
          <SaveButton text="Gotowe" type="submit" onClick={createSoundMix()} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SoundMix;
