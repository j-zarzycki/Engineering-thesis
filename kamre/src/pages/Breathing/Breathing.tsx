import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonCard } from "@ionic/react";
import "./Breathing.css";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import SaveButton from "../../components/SaveButton";
import breathingService from "../../services/breathing.service";

const Breathing: React.FC = () => {
  const createBreathing = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date}:${time}`;

    breathingService
      .CreateBreathing(dateTime, "Breath")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const placeholderText = ["wdech", "wydech"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      const timer = () => {
        setIndex((prevIndex) => {
          if (prevIndex === placeholderText.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        });
      };
      setInterval(timer, 7800);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="title">
          <BackButton defaultHref="/home" />
          <Header
            title="Oddychanie"
            subtitle="poniżej znajdziesz instrukcję, krok po kroku jak wykonać zadanie"
          />
        </div>
        <IonCard>
          <div className="stopwatch ion-text-center">
            <div className="numbers">
              <span>{`0${Math.floor((time / 60000) % 60)}`.slice(-2)}:</span>
              <span>{`0${Math.floor((time / 1000) % 60)}`.slice(-2)}:</span>
              <span>{`0${(time / 10) % 100}`.slice(-2)}</span>
            </div>
            <div className="message-container">
              <p className="message">{placeholderText[index]}</p>
            </div>
            <div className="buttons">
              <button type="button" onClick={() => setRunning(true)}>
                Start
              </button>
            </div>
          </div>
        </IonCard>
        <div className="ion-text-center">
          <SaveButton text="Gotowe" type="submit" onClick={createBreathing} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Breathing;
