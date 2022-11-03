import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";

import "./WelcomePage.style.scss";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import WelcomePageProceedButton from "@Components/WelcomePageProceedButton";
import WelcomePageStartButton from "@Components/WelcomePageStartButton";
import WelcomePageRestoreDataButton from "@Components/WelcomePageRestoreDataButton";
import Pet from "@Components/Pet";

interface IProps {
  onCreateActivityWithContent(): void;

  setToast(value: {}): void;

  onProceedButtonClick(): void;

  setSwiper(value: any): void;

  onSlideChangeHandler(slide: SwiperType): void;

  onStartButtonClick(): void;

  isLoading: boolean;
  toast: any;
  currentSlide: number;
  swiper: any;
  img: string;
  slideElements: number;
}

const WelcomePage: React.FC<IProps> = (props: IProps) => {
  const {
    onStartButtonClick,
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

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="welcome-page__loader"
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
      <div className="welcome-page__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="welcome-page__swiper">
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
                Ahoj Kamracie! <br />
                Mam na imię Kamre
              </h4>
              <p className="swiper-slide__paragraph">
                Będę Cię wspierać w trakcie Twojej podróży w aplikacji.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Mam wiele umiejętności</h4>
              <p className="swiper-slide__paragraph">
                Nauczę Cię zarządzać swoim stresem, co więcej przestaniesz go
                postrzegać jako twojego wroga!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Staję się coraz lepsza!</h4>
              <p className="swiper-slide__paragraph">
                Uczę się! Dlatego im częściej będziesz próbować nowe zadania,
                tym ja łatwiej będę potrafiła dopasowywać pod Ciebie kolejne
                propozycje.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Dbam o Twoją prywatność!</h4>
              <p className="swiper-slide__paragraph">
                Nie tworzysz u nas konta. Generujemy dla Ciebie tajny klucz
                dostępny tylko do Twojego telefonu.
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
        <div className="welcome-page__final-buttons">
          <WelcomePageStartButton
            onClick={onStartButtonClick}
            title="Zaczynamy!"
          />
          <WelcomePageRestoreDataButton
            title="Przywróć dane"
            onClick={onCreateActivityWithContent}
          />
        </div>
      );

    return (
      <WelcomePageProceedButton title="Dalej" onClick={onProceedButtonClick} />
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
        <div className="welcome-page">
          {renderToast()}
          {renderLoader()}
          <div className="welcome-page__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
