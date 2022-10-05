import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import "./SoundMix.style.scss";
import BackButton from "@Components/BackButton";
import Header from "@Components/Header";
import SaveButton from "@Components/SaveButton";
import SOUND_MIX_URL from "@Constants/SoundMix.constatns";

interface IProps {
  createSoundMix(): Promise<void>;
}

const SoundMix: React.FC<IProps> = (props: IProps) => {
  const { createSoundMix } = props;
  const videoUrl = SOUND_MIX_URL;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="sound-mix">
          <div className="title">
            <BackButton defaultHref="/home" />
            <Header
              title="Relaksujące dźwięki"
              subtitle="Chwila dla siebie wykorzystując dźwięki natury. Gdziekolwiek jesteś, możesz złapać odrobinę relaksu."
            />
          </div>
          <div className="video-container">
            <iframe
              className="embed"
              width="100%"
              height="100%"
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
          </div>
          <div className="ion-text-center">
            <SaveButton
              text="Gotowe"
              type="submit"
              onClick={createSoundMix()}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SoundMix;
