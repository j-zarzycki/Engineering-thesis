import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";

import "./PrepareMeal.style.scss";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";

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

const PrepareMeal: React.FC<IProps> = (props: IProps) => {
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

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="prepare-meal__loader"
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
    if (swiper?.activeIndex === 3)
      return <div className="prepare-meal__header" />;

    return (
      <div className="prepare-meal__header">
        <BackButton defaultHref="/home" />
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
      <div className="walking__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="prepare-meal__swiper">
        <Swiper
          effect="fade"
          centeredSlides
          slidesPerView={1}
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Przygotuj coś pysznego!</h4>
              <p className="swiper-slide__paragraph">
                Na co masz dzisiaj ochotę? Spraw sobie przyjemność i przygotuj
                ucztę dla zmysłów!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Co schrupać?</h4>
              <p className="swiper-slide__paragraph">
                Co byś dzisiaj zjadł/a? Przeszukaj lodówkę lub przejdź się do
                sklepu i przygotuj samodzielnie potrawę. Oczyść swój umysł i
                oderwij się od natrętnych myśli.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Poświęć całą swoją uwagę na przygotowaniu swojego kulinarnego
                dzieła. Zainspiruj się przepisem, bądź użyj swojej fantazji i
                kreatywności - wymyśl to, co podpowiadają Ci zmysły.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Przemyślenia</h4>
              <p className="swiper-slide__paragraph">
                Pomyśl, jak czułeś/aś się podczas gotowania? Czy miałeś/aś
                jakieś problemy, opory?
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
        <div className="prepare-meal__final-buttons">
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
        <div className="prepare-meal">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="prepare-meal__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PrepareMeal;
