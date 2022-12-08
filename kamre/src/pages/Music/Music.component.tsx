import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";
import { MUSIC_URL } from "@Constants/music.constants";

import "swiper/css";
import "./Music.style.scss";

interface IProps {
  isLoading: boolean;
  currentSlide: number;
  img: string;
  slideElements: number;
  swiper: any;
  toast: ToastType;
  setSwiper(swiper: SwiperType): void;
  setToast(toast: ToastType): void;
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  onProceedButtonClick(): void;
  onSlideChangeHandler(slide: SwiperType): void;
}

const Music: React.FC<IProps> = (props: IProps) => {
  const {
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    slideElements,
    setToast,
    setSwiper,
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    onSlideChangeHandler,
  } = props;
  const videoUrl = MUSIC_URL;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="music__loader"
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
    if (swiper?.activeIndex === 3) return <div className="music__header" />;

    return (
      <div className="music__header">
        <BackButton />
      </div>
    );
  };

  const renderImage = () => {
    if (swiper?.activeIndex === 2) {
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
            Źródło YouTube: Maide 🍂 - pov: you're at your secret place
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
      <div className="music__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="music__swiper">
        <Swiper
          effect="fade"
          autoHeight
          centeredSlides
          slidesPerView={1}
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Muzyka klasyczna </h4>
              <p className="swiper-slide__paragraph">
                Muzyka klasyczna pomaga harmonizować cały organizm człowieka.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Włącz playlistę z utworami klasycznymi - wybierz swoją lub
                skorzystaj z przygotowanej przez nas. Muzyka klasyczna pomaga
                się skupić oraz odpocząć od zbyt wielu bodźców.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <p className="swiper-slide__paragraph">
                Sprawdź naszą propozycję.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Przemyślenia</h4>
              <p className="swiper-slide__paragraph">
                Jakie odczucia towarzyszyły Ci podczas słuchania muzyki? Podziel
                się swoimi przemyśleniami.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };

  const renderButtons = () => {
    if (swiper?.activeIndex >= 3)
      return (
        <div className="music__buttons">
          <div className="music__final-buttons">
            <CancelButton
              onClick={onCreateActivityWithNoContent}
              title="Zakończ"
            />
            <SaveActivityButton
              title="Dodaj"
              onClick={onCreateActivityWithContent}
            />
          </div>
        </div>
      );

    return (
      <div className="music__buttons">
        <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />
      </div>
    );
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
        <div className="music">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="music__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Music);
