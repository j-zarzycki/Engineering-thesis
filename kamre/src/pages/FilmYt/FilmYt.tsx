import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import SaveButton from "../../components/SaveButton";
import filmYtService from "../../services/filmYt.service";

const FilmYt: React.FC = () => {
  const createFilmYt = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date}:${time}`;

    filmYtService
      .CreateFilmYt(dateTime, "FilmYt")
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
        <div className="ion-text-center">
          <SaveButton text="Gotowe" type="submit" onClick={createFilmYt} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FilmYt;
