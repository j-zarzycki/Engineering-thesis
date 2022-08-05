import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import SaveButton from "../../components/SaveButton";
import cookService from "../../services/cook.service";

const Cook: React.FC = () => {
  const createCook = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date}:${time}`;

    cookService
      .CreateCook(dateTime, "Cook")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="title">
          <BackButton defaultHref="/home" />
          <Header
            title="Przygotuj coś pysznego"
            subtitle="Na co masz ochotę? Znajdź przepis, bądź daj ponieść się swoim umiejętnościom i przygotuj swoją ucztę!"
          />
        </div>

        <div className="ion-text-center">
          <SaveButton text="Gotowe" type="submit" onClick={createCook} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cook;
