import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import BackButton from "@Components/BackButton";
import Header from "@Components/Header";
import SaveButton from "@Components/SaveButton";

interface IProps {
  createPageYt(): Promise<void>;
}

const YtPage: React.FC<IProps> = (props: IProps) => {
  const { createPageYt } = props;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="title">
          <BackButton defaultHref="/home" />
          <Header
            title="Film edukacyjny"
            subtitle="poznaj naukowe podejście na temat stresu."
          />
        </div>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube-nocookie.com/embed/ywo34NcYQvY"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
        <div className="ion-text-center">
          <SaveButton text="Gotowe" type="submit" onClick={createPageYt} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default YtPage;
