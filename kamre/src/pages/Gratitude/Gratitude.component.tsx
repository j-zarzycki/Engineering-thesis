import { IonContent, IonPage, IonImg } from "@ionic/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import BackButton from "@Components/BackButton";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";

import ProceedButton from "@Components/ProceedButton";

import "./Gratitude.style.scss";

interface IProps {
  setSwiper(value: any): void;
  onProceedButtonClick(): void;
  currentSlide: number;
  slideElements: number;
  img: string;
}

const Gratitude: React.FC<IProps> = (props: IProps) => {
  const { setSwiper, currentSlide, slideElements, onProceedButtonClick, img } =
    props;

  const renderHeader = () => {
    return (
      <div className="gratitude__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="gratitude__swiper">
        <Swiper
          allowTouchMove={false}
          effect="fade"
          slidesPerView={1}
          height={190}
          onSwiper={(swiperData) => setSwiper(swiperData)}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Wdzięczność</h4>
              <p className="swiper-slide__paragraph">
                To ćwiczenie pozwoli Ci lekko zmienić perspektywę na swoje
                życie. Świadoma koncentracja na pozytywnych emocjach otwiera nas
                na bardziej pozytywne podejście.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Wypisz, za co jesteś dzisiaj wdzięczny_na. To mogą być codzienne
                czynności, ludzie lub sytuacje. Postaraj się wyciągnąć rzeczy,
                które wywołały w Tobie pozytywne emocje.
              </p>
            </div>
          </SwiperSlide>
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

  const renderProceedButton = () => {
    return <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />;
  };

  const renderImage = () => {
    return <IonImg className="gratitude__image" alt="pet" src={img} />;
  };

  const renderContext = () => {
    return (
      <div className="gratitude__context">
        {renderImage()}
        {renderProgressBar()}
        {renderSwiper()}
        {renderProceedButton()}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        class="ion-padding-horizontal ion-padding-vertical"
      >
        {renderHeader()}
        <div className="gratitude__wrapper">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default Gratitude;
