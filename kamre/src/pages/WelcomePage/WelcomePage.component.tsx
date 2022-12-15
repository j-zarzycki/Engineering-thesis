import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import Input from "@Components/Input";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import WelcomePageProceedButton from "@Components/WelcomePageProceedButton";
import WelcomePageStartButton from "@Components/WelcomePageStartButton";
import WelcomePageRestoreDataButton from "@Components/WelcomePageRestoreDataButton";
import Pet from "@Components/Pet";

import "swiper/css";
import "./WelcomePage.style.scss";

interface IProps {
  isLoading: boolean;
  toast: ToastType;
  currentSlide: number;
  swiper: any;
  img: string;
  slideElements: number;
  recoveryRef: any;
  swiperRef: any;
  pageController: {
    isWelcomeViewVisible: boolean;
    isRecoveryViewVisible: boolean;
  };
  setToast(toast: ToastType): void;
  setSwiper(swiper: SwiperType): void;
  onProceedButtonClick(): void;
  onSlideChangeHandler(slide: SwiperType): void;
  onStartButtonClick(): void;
  onRecoveryButtonClick(): void;
  onInputChange(e: any): void;
  onCancelRecoveryButtonHandle(): void;
  onRestoreDataButtonClick(): void;
}

const WelcomePage: React.FC<IProps> = (props: IProps) => {
  const {
    pageController,
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    slideElements,
    recoveryRef,
    swiperRef,
    setToast,
    setSwiper,
    onInputChange,
    onCancelRecoveryButtonHandle,
    onStartButtonClick,
    onRecoveryButtonClick,
    onProceedButtonClick,
    onSlideChangeHandler,
    onRestoreDataButtonClick,
  } = props;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="welcome-page__loader"
        isOpen={isLoading}
        message="Trwa inicjowanie aplikacji, proszę czekać."
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
        duration={4000}
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
      <div ref={swiperRef} className="welcome-page__swiper">
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
              <h4 className="swiper-slide__header">
                Mam wiele umiejętności...
              </h4>
              <p className="swiper-slide__paragraph">
                Pomogę Ci zarządzać stresem, co więcej przestaniesz go
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
    const { isWelcomeViewVisible, isRecoveryViewVisible } = pageController;

    if (swiper?.activeIndex === 3 && isWelcomeViewVisible)
      return (
        <div className="welcome-page__final-buttons">
          <WelcomePageStartButton
            onClick={onStartButtonClick}
            title="Zaczynamy!"
          />
          <WelcomePageRestoreDataButton
            title="Przywróć dane"
            onClick={onRecoveryButtonClick}
          />
        </div>
      );

    if (isRecoveryViewVisible) {
      return (
        <div className="welcome-page__final-buttons">
          <WelcomePageStartButton
            onClick={onRestoreDataButtonClick}
            title="Przywróć dane"
          />
          <WelcomePageRestoreDataButton
            title="Anuluj"
            onClick={onCancelRecoveryButtonHandle}
          />
        </div>
      );
    }

    return (
      <WelcomePageProceedButton title="Dalej" onClick={onProceedButtonClick} />
    );
  };

  const renderRecovery = () => {
    return (
      <div ref={recoveryRef} className="welcome-page-recovery">
        <h4 className="welcome-page-recovery__header">Migracja konta</h4>
        <p className="welcome-page-recovery__paragraph">
          Poniżej podaj swój wcześniej wygenerowany kod, a następnie potwierdź
          go naciskając przycisk.
        </p>
        <Input placeholder="Wpisz tutaj swój kod..." onChange={onInputChange} />
      </div>
    );
  };

  const renderContext = () => {
    return (
      <>
        {renderImage()}
        {renderHorizontalProgressBar()}
        {renderSwiper()}
        {renderRecovery()}
        {renderButtons()}
      </>
    );
  };

  return (
    <IonPage class="welcome">
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

export default React.memo(WelcomePage);
