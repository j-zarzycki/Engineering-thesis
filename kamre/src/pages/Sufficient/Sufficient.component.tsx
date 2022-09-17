import {
  IonContent,
  IonPage,
  IonImg,
  IonLoading,
  IonToast,
} from "@ionic/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import BackButton from "@Components/BackButton";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";

import ProceedButton from "@Components/ProceedButton";
import "./Sufficient.style.scss";

interface IProps {
  setSwiper(value: any): void;
  onProceedButtonClick(): void;
  onAddSlide(): void;
  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onEndButtonClick(): void;
  setToast(value: {}): void;
  currentSlide: number;
  slideElements: number;
  img: string;
  isLoading: boolean;
  toast: { isOpen: boolean; message: string };
  isAddingDisabled: boolean;
  swiper: any;
  slides: React.ReactElement[];
}

const Sufficient: React.FC<IProps> = (props: IProps) => {
  const {
    setSwiper,
    currentSlide,
    slideElements,
    onProceedButtonClick,
    onAddSlide,
    img,
    slides,
    isAddingDisabled,
    onEndButtonClick,
    onInputChange,
    swiper,
    setToast,
    toast,
    isLoading,
  } = props;

  const renderHeader = () => {
    return (
      <div className="sufficient__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderGeneratedSlides = () => {
    return slides.map((slide) => {
      return slide;
    });
  };

  const renderSwiper = () => {
    return (
      <div className="sufficient__swiper">
        <Swiper
          allowTouchMove={false}
          effect="fade"
          slidesPerView={1}
          height={190}
          onSwiper={(swiperData) => setSwiper(swiperData)}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Wystarczający</h4>
              <p className="swiper-slide__paragraph">
                Opuśc na moment własną głowę i podaj 3 rzeczy za których jesteś
                z siebie dumny.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Wypisz, za co jesteś z siebie dumny. To mogą być nawet codzienne
                czynności. Postaraj się wyciągnąć rzeczy, które wywołały w Tobie
                pozytywne emocje.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">
                Jestem z siebie dumny, bo:
              </h4>
              <p className="swiper-slide__paragraph">
                <input
                  className="swiper-slide__input"
                  type="text"
                  placeholder="Wpisz za co jesteś z siebie dumny..."
                  onChange={onInputChange}
                />
              </p>
            </div>
          </SwiperSlide>
          {renderGeneratedSlides()}
        </Swiper>
      </div>
    );
  };

  const renderProgressBar = () => {
    return (
      <div>
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderButton = () => {
    if (swiper?.activeIndex >= 3)
      return (
        <div className="sufficient__buttons">
          <button
            className="buttons-sufficient__end"
            type="button"
            onClick={onEndButtonClick}
          >
            Zakończ
          </button>
          <button
            className="buttons-sufficient__add"
            type="button"
            onClick={onAddSlide}
            disabled={isAddingDisabled}
          >
            Dodaj
          </button>
        </div>
      );

    if (swiper?.activeIndex === 2)
      return (
        <div className="sufficient__buttons">
          <button
            className="buttons-sufficient__add"
            type="button"
            onClick={onAddSlide}
            disabled={isAddingDisabled}
          >
            Dodaj
          </button>
        </div>
      );

    return <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />;
  };

  const renderImage = () => {
    return <IonImg className="sufficient__image" alt="pet" src={img} />;
  };

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="good-word__loader"
        isOpen={isLoading}
        message="Zapisywanie, proszę czekać"
      />
    );
  };

  const renderToast = () => {
    const { isOpen, message } = toast;
    return (
      <IonToast
        isOpen={isOpen}
        onDidDismiss={() => setToast({ isOpen: false, message: "" })}
        message={message}
        duration={2500}
        position="top"
      />
    );
  };

  const renderContext = () => {
    return (
      <div className="sufficient__context">
        {renderToast()}
        {renderLoader()}
        {renderImage()}
        {renderProgressBar()}
        {renderSwiper()}
        {renderButton()}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderHeader()}
        <div className="sufficient__wrapper">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default Sufficient;
