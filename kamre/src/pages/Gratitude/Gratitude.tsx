import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";

import BackButton from "../../components/BackButton";
import SaveButton from "../../components/SaveButton";
import Header from "../../components/Header";
import gratitudeService from "../../services/gratitude.service";
import "./Gratitude.css";

const Gratitude: React.FC = () => {
  // -----------------

  const [val, setVal] = useState([]);

  const handleAdd = () => {
    const abc: any = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue: any, i: number) => {
    const inputdata: any = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata[i]);
  };
  const handleDelete = (i: number) => {
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };
  console.log(val, "data-");

  // -------------------

  const onSaveButtonClick = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date}:${time}`;

    gratitudeService.createGratitude(dateTime, JSON.stringify(val));
  };
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="title">
          <BackButton defaultHref="/home" />
          <Header title="Za co jesteś wdzięczny?" subtitle="" />
        </div>
        <div className="ion-text-center">
          {val.map((data, i) => {
            return (
              <div>
                <input value={data} onChange={(e) => handleChange(e, i)} />
                <input
                  value="x"
                  title="x"
                  type="button"
                  onClick={() => handleDelete(i)}
                />
              </div>
            );
          })}
          <input
            type="button"
            title="add"
            value="dodaj"
            onClick={() => handleAdd()}
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
