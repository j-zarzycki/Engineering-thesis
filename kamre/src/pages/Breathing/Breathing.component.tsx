import React from "react";
import { IonContent, IonPage, IonImg } from "@ionic/react";

import ProceedButton from "@Components/ProceedButton";
import BackButton from "@Components/BackButton";
import CancelButton from "@Components/CancelButton";

import Pet from "@Assets/main.png";
import "./Breathing.style.scss";

interface IProps {
  isPlaying: boolean;
  isAnimationPaused: boolean;
  counter: number;
  renderType: string;
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
    handleButtonClick,
    onCancelButtonClick,
  } = props;

  const renderDescription = () => {
    return (
      <div className="breathing">
        <h4>Oddychanie</h4>
        <div className="breathing__description">
          Połóż jedną rękę na brzuchu, a drugą na klatce piersiowej. Plecy
          powinny być proste.Weź głęboki i spokojny oddech przez nos. Upewnij
          się, że obszar, który się podnosi, to przepona (brzuch), a nie klatka
          piersiowa. Następnie głośno wydychaj powietrze przez usta.
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
    if (!isPlaying) {
      return (
        <div className="breathing__header-top">
          <BackButton defaultHref="/home" />
        </div>
      );
    }

    return <div className="breathing__header-top" />;
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="breathing__header">{renderHeader()}</div>
        <div className="breathing__context">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default Breathing;
