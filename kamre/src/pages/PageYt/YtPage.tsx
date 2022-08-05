import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import SaveButton from "../../components/SaveButton";
import pageYtService from "../../services/pageYt.service";

const YtPage: React.FC = () => {
  const createPageYt = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date}:${time}`;

    pageYtService
      .CreateYtPage(dateTime, "YtPage")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
