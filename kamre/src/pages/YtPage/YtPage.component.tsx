import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { YTPAGE_URL } from "@Constants/ytPage.constants";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";
import MainImg from "@Assets/main.png";

import "swiper/css";
import "./YtPage.style.scss";

interface IProps {
  isLoading: boolean;
  toast: ToastType;
  currentSlide: number;
  swiper: any;
  slideElements: number;
  setToast(toast: ToastType): void;
  setSwiper(swiper: SwiperType): void;
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  onProceedButtonClick(): void;
  onSlideChangeHandler(slide: SwiperType): void;
}

const YtPage: React.FC<IProps> = (props: IProps) => {
  const {
    isLoading,
    toast,
    swiper,
    currentSlide,
    slideElements,
    setToast,
    setSwiper,
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    onSlideChangeHandler,
  } = props;
  const videoUrl = YTPAGE_URL;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="ytpage__loader"
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
    if (swiper?.activeIndex === 2) return <div className="ytpage__header" />;

    return (
      <div className="ytpage__header">
        <BackButton />
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
            Źródło Youtube: Katarzyna Miller - Co z tym stresem?
          </p>
        </div>
      );
    }
    return (
      <Pet
        src={MainImg}
        alt="Uśmiechnięta ośmiorniczka jpg"
        height="250px"
        paddingTop="20px"
        paddingBottom="20px"
      />
    );
  };

  const renderHorizontalProgressBar = () => {
    return (
      <div className="ytpage__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="ytpage__swiper">
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
              <h4 className="swiper-slide__header">Netflix and chill? </h4>
              <p className="swiper-slide__paragraph">
                Usiądź wygodnie, weź popcorn lub lody i obejrzyj krótki film
                dotyczący stresu. Im więcej się o nim dowiesz tym skuteczniej
                będziesz z nim walczyć!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <p className="swiper-slide__paragraph">
                Pokażę Ci jak krok po kroku zwiększyć świadomość swoich działań
                w codziennym życiu.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Przemyślenia</h4>
              <p className="swiper-slide__paragraph">
                Jakie przemyślenia nasunęły Ci się po obejrzeniu filmu? Zapisz
                je, aby lepiej utrwalić nowe informacje.
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
        <div className="ytpage__buttons">
          <div className="ytpage__final-buttons">
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
      <div className="ytpage__buttons">
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
        <div className="ytpage">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="ytpage__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(YtPage);
