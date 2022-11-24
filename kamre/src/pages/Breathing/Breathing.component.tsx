import React from "react";
import {
  IonContent,
  IonPage,
  IonImg,
  IonToast,
  IonLoading,
} from "@ionic/react";

import ProceedButton from "@Components/ProceedButton";
import BackButton from "@Components/BackButton";
import CancelButton from "@Components/CancelButton";

import MainImg from "@Assets/main.png";
import Smile from "@Assets/smile.png";
import "./Breathing.style.scss";

interface IProps {
  isPlaying: boolean;
  isAnimationPaused: boolean;
  counter: number;
  renderType: string;
  isLoading: boolean;
  toast: any;
  handleButtonClick(): void;
  onCancelButtonClick(): void;
}

enum RenderTypeTranslation {
  Wydech = "EXHAUST",
  Wdech = "INHALE",
  Wstrzymaj = "PAUSE",
}

const Breathing: React.FC<IProps> = (props: IProps) => {
  const {
    counter,
    isPlaying,
    isAnimationPaused,
    renderType,
    toast,
    isLoading,
    handleButtonClick,
    onCancelButtonClick,
  } = props;

  const renderDescription = () => {
    return (
      <div className="breathing">
        <h4>Oddychanie</h4>
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
      </div>
    );
  };

  const renderTimer = () => {
    const indexOfEnumValue = Object.values(RenderTypeTranslation).indexOf(
      renderType as unknown as RenderTypeTranslation,
    );
    const translatedKey = Object.keys(RenderTypeTranslation)[indexOfEnumValue];

    return (
      <div className="breathing__timer">
        <h4>{renderType !== "PAUSE" && counter}</h4>
        <h5>{translatedKey}</h5>
        <CancelButton title="Zakończ" onClick={onCancelButtonClick} />
      </div>
    );
  };

  const renderImage = () => {
    return (
      <div
        className={`breathing__image ${
          isPlaying && !isAnimationPaused && "breathing__image--active"
        }`}
      >
        <IonImg
          className={`pet-octopus ${isPlaying && "breathing__image--active"}`}
          src={isPlaying ? MainImg : Smile}
          alt="pet"
        />
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
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
    if (!isPlaying) {
      return (
        <div className="breathing__header-top">
          <BackButton defaultHref="/home" />
        </div>
      );
    }

    return <div className="breathing__header-top" />;
  };

  const renderToast = () => {
    const { isOpen, message } = toast;
    return (
      <IonToast
        isOpen={isOpen}
        message={message}
        duration={2500}
        position="top"
      />
    );
  };

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="breathing__loader"
        isOpen={isLoading}
        message="Zapisywanie, proszę czekać"
      />
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderLoader()}
        {renderToast()}
        <div className="breathing__header">{renderHeader()}</div>
        <div className="breathing__context">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Breathing);
