import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";

import "./SchultzTraining.style.scss";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";
import { SCHULTZ_TRAINING_URL } from "@Constants/schultzTraining.constatns";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  setToast(value: {}): void;
  onProceedButtonClick(): void;
  setSwiper(value: any): void;
  onSlideChangeHandler(slide: SwiperType): void;
  isLoading: boolean;
  toast: any;
  currentSlide: number;
  swiper: any;
  img: string;
  slideElements: number;
}

const SchultzTraining: React.FC<IProps> = (props: IProps) => {
  const {
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    onSlideChangeHandler,
    setToast,
    setSwiper,
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    slideElements,
  } = props;
  const videoUrl = SCHULTZ_TRAINING_URL;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="schultz__loader"
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
    if (swiper?.activeIndex === 2) return <div className="schultz__header" />;

    return (
      <div className="schultz__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderImage = () => {
    if (swiper?.activeIndex === 1) {
      return (
        <div className="video">
          <div className="video__container">
            <iframe
              className="video__embed"
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
          </div>
          <p className="video__source">
            Źródło YouTube: Lidia Krotoszyńska - Trening autogenny Schultza
          </p>
        </div>
      );
    }
    return (
      <Pet
        src={img}
        alt="Uśmiechnięta ośmiorniczka jpg"
        height="250px"
        paddingTop="20px"
        paddingBottom="20px"
      />
    );
  };

  const renderHorizontalProgressBar = () => {
    return (
      <div className="schultz__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="schultz__swiper">
        <Swiper
          effect="fade"
          centeredSlides
          slidesPerView={1}
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">
                Trening autogenny Schultza
              </h4>
              <p className="swiper-slide__paragraph">
                Radź sobie z trudnymi sytuacjami, zachowując spokój i panując
                nad swoimi emocjami.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <p className="swiper-slide__paragraph">
                Usiądź bądź połóż się w wygodnej pozycji, wsłuchaj się w filmik
                i wykonuj polecenia.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Przemyślenia</h4>
              <p className="swiper-slide__paragraph">
                Jakie odczucia towarzyszyły Ci podczas treningu. Czy chcesz
                dodać przemyślenia?
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };

  const renderButtons = () => {
    if (swiper?.activeIndex >= 2)
      return (
        <div className="schultz__final-buttons">
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
        <div className="schultz">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="schultz__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SchultzTraining;
