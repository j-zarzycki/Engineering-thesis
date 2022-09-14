import React from "react";
import { IonContent, IonPage, IonImg } from "@ionic/react";

import ProceedButton from "@Components/ProceedButton";
import BackButton from "@Components/BackButton";

import Pet from "@Assets/main.png";
import "./Breathing.style.scss";

interface IProps {
  isPlaying: boolean;
  isAnimationPaused: boolean;
  counter: number;
  renderType: string;
  handleButtonClick(): void;
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
    handleButtonClick,
  } = props;

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
    const indexOfEnumValue = Object.values(RenderTypeTranslation).indexOf(
      renderType as unknown as RenderTypeTranslation,
    );
    const translatedKey = Object.keys(RenderTypeTranslation)[indexOfEnumValue];

    return (
      <div className="breathing__timer">
        <h4>{renderType !== "PAUSE" && counter}</h4>
        <h5>{translatedKey}</h5>
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
          className={`${isPlaying && "breathing__image--active"}`}
          src={Pet}
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
