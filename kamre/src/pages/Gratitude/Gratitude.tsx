import { IonContent, IonPage, IonInput } from "@ionic/react";
import React, { useState } from "react";

import BackButton from "../../components/BackButton";
import SaveButton from "../../components/SaveButton";
import Header from "../../components/Header";
import gratitudeService from "../../services/gratitude.service";

import "./Gratitude.css";

const Gratitude: React.FC = () => {
  const [inputField, setInputField] = useState("");
  const onInputChange = (e: any) => setInputField(e.detail.value);
  const onSaveButtonClick = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date}:${time}`;

    gratitudeService.createGratitude(dateTime, inputField);
  };
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="title">
          <BackButton defaultHref="/home" />
          <Header title="Za co jesteś wdzięczny?" subtitle="" />
        </div>
        <div>
          <IonInput
            type="text"
            placeholder="Type here"
            onIonChange={onInputChange}
          />
        </div>
        <div className="ion-text-center">
          <SaveButton text="Zapisz" type="submit" onClick={onSaveButtonClick} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Gratitude;
