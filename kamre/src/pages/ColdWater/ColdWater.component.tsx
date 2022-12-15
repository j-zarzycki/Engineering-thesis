import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { swiperDefaultOptions } from "@Constants/swiper.constants";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";

import "swiper/css";
import "./ColdWater.style.scss";

interface IProps {
  isLoading: boolean;
  toast: ToastType;
  currentSlide: number;
  swiper: any;
  img: string;
  slideElements: number;
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  setToast(toast: ToastType): void;
  onProceedButtonClick(): void;
  setSwiper(swiper: SwiperType): void;
  onSlideChangeHandler(slide: SwiperType): void;
}

const ColdWater: React.FC<IProps> = (props: IProps) => {
  const {
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    slideElements,
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    onSlideChangeHandler,
    setToast,
    setSwiper,
  } = props;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="coldwater__loader"
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

  const renderHeader = () => {
    if (swiper?.activeIndex === 5) return <div className="coldwater__header" />;

    return (
      <div className="coldwater__header">
        <BackButton />
      </div>
    );
  };

  const renderImage = () => {
    return (
      <Pet
        src={img}
        alt="Uśmiechnięta ośmiorniczka jpg"
        height="200px"
        paddingTop="20px"
        paddingBottom="20px"
      />
    );
  };

  const renderHorizontalProgressBar = () => {
    return (
      <div className="coldwater__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="coldwater__swiper">
        <Swiper
          centeredSlides
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
          {...swiperDefaultOptions}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">
                Schłodź nadgarstki / kark
              </h4>
              <p className="swiper-slide__paragraph">
                Potrzebujesz zmiejszenia silnego stresu? Ta prosta czynność
                pomoże Ci szybko ostudzić emocje.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Chłodne nadgarstki</h4>
              <p className="swiper-slide__paragraph">
                Idź do łazienki lub najbliższego kranu. Odkręć zminą wodę i
                zmocz nią nadgarstki oddychając równomiernie. Chłodź je tak
                długo jak potrzebujesz.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Chłodny kark</h4>
              <p className="swiper-slide__paragraph">
                Jeśli nadal czujesz się źle, przyłóż zimne, wilgotne dłonie do
                karku, cały czas utrzymując spokojny odech.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Jak to działa?</h4>
              <p className="swiper-slide__paragraph">
                Takie czynności spowalniają bicie serca i uspokajają ciało.
                Stres sprawia, że nasz oddech przyśpiesza i spłyca się.
                Świadome, spokojne oddychanie odwraca ten proces zmiejszając
                uczucie stresu.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lepiej?</h4>
              <p className="swiper-slide__paragraph">
                Jeżeli nie czujesz poprawy, daj sobie czas w łazience - dotknij
                zimne ściańy bądź pooddychaj w odizolowanej przestrzeni.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Przemyślenia</h4>
              <p className="swiper-slide__paragraph">
                Jakie wrażenie wywarło na Tobie zastosowanie tej techniki?
                Zapisz swoje przemyślenia.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };

  const renderButtons = () => {
    if (swiper?.activeIndex >= 5)
      return (
        <div className="coldwater__final-buttons">
          <CancelButton
            onClick={onCreateActivityWithNoContent}
            title="Zakończ"
          />
          <SaveActivityButton
            title="Dodaj"
            onClick={onCreateActivityWithContent}
          />
        </div>
      );

    return <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />;
  };

  const renderContext = () => {
    return (
      <>
        {renderImage()}
        {renderHorizontalProgressBar()}
        {renderSwiper()}
        {renderButtons()}
      </>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="coldwater">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="coldwater__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(ColdWater);
