import React from "react";
import {
  IonContent,
  IonPage,
  IonImg,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { swiperDefaultOptions } from "@Constants/swiper.constants";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import ProceedButton from "@Components/ProceedButton";
import BackButton from "@Components/BackButton";
import CancelButton from "@Components/CancelButton";
import MainImg from "@Assets/main.png";
import Smile from "@Assets/smile.png";

import "swiper/css";
import "./Breathing.style.scss";

interface IProps {
  isPlaying: boolean;
  isAnimationPaused: boolean;
  counter: number;
  renderType: string;
  isLoading: boolean;
  currentSlide: number;
  slideElements: number;
  swiper: any;
  toast: ToastType;
  handleButtonClick(): void;
  onCancelButtonClick(): void;
  setSwiper(swiper: SwiperType): void;
  onSlideChangeHandler(slide: SwiperType): void;
  onProceedButtonClick(): void;
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
    swiper,
    currentSlide,
    slideElements,
    isLoading,
    setSwiper,
    handleButtonClick,
    onCancelButtonClick,
    onProceedButtonClick,
    onSlideChangeHandler,
  } = props;

  const renderHorizontalProgressBar = () => {
    return (
      <div className="breathing__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderDescription = () => {
    return (
      <div className="breathing__swiper">
        {renderHorizontalProgressBar()}
        <Swiper
          autoHeight
          centeredSlides
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
          {...swiperDefaultOptions}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Oddychanie</h4>
              <p className="swiper-slide__paragraph">
                Połóż jedną rękę na brzuchu, a drugą na klatce piersiowej. Plecy
                powinny być proste.
                <br />
                Weź głęboki i spokojny oddech przez nos.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Używaj przepony</h4>
              <p className="swiper-slide__paragraph">
                Upewnij się, że obszar, który się podnosi, to przepona (brzuch),
                a nie klatka piersiowa.
                <br />
                Następnie głośno wydychaj powietrze przez usta.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
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

  const renderButtons = () => {
    if (swiper?.activeIndex >= 1)
      return (
        <div className="breathing__buttons">
          <ProceedButton title="Dalej!" onClick={handleButtonClick} />
        </div>
      );

    return (
      <div className="breathing__buttons">
        <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />
      </div>
    );
  };

  const renderContext = () => {
    return (
      <>
        {renderImage()}
        {isPlaying ? renderTimer() : renderDescription()}
        {!isPlaying && renderButtons()}
      </>
    );
  };

  const renderHeader = () => {
    if (!isPlaying) {
      return (
        <div className="breathing__header-top">
          <BackButton />
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
        <div className="breathing__wrapper">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Breathing);
