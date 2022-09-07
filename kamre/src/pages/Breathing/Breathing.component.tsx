/* eslint-disable */

import React from "react";
import { CSSTransition } from "react-transition-group";
import { IonContent, IonPage, IonImg } from "@ionic/react";

import ProceedButton from "@Components/ProceedButton";
import BackButton from "@Components/BackButton";

import Pet from "@Assets/main.png";
import "./Breathing.style.scss";

interface IProps {
  isPlaying: boolean;
  counter: number;
  handleButtonClick(): void;
  createBreathing(): Promise<void>;
}

const Breathing: React.FC<IProps> = (props: IProps) => {
  const { counter, isPlaying, createBreathing, handleButtonClick } = props;

  const renderDescription = () => {
    return (
      <div className="breathing__description">
        <ul>
          <li>
            Połóż jedną rękę na brzuchu, a drugą na klatce piersiowej. Plecy
            powinny być proste.
          </li>
          <li>Weź głęboki i spokojny oddech przez nos.</li>
          <li>
            Upewnij się, że obszar, który się podnosi, to przepona (brzuch), a
            nie klatka piersiowa.
          </li>
          <li>Następnie głośno wydychaj powietrze przez usta.</li>
        </ul>
      </div>
    );
  };

  const renderTimer = () => {
    return (
      <div className="breathing__timer">
        <h4>{counter}</h4>
      </div>
    );
  };

  const renderImage = () => {
    return (
      <div className={`breathing__image ${isPlaying && "breathing__image--active"}`}>
        <IonImg
          className={`${isPlaying && "breathing__image--active"}`}
          src={Pet}
          alt="pet"
        />
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>
    );
  };

  const renderContext = () => {
    return (
      <>
        {renderImage()}
        {isPlaying ? renderTimer() : renderDescription()}

        {!isPlaying && (
          <ProceedButton title="Prowadź mnie!" onClick={handleButtonClick} />
        )}
      </>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <BackButton defaultHref="/home" />
        {!isPlaying && <h4>Oddychanie</h4>}
      </>
    );
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        class="ion-padding-horizontal ion-padding-vertical breathing"
      >
        <div className="breathing__header">{renderHeader()}</div>
        <div className="breathing__context">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default Breathing;
