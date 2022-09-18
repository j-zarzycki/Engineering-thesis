import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import Pet from "@Components/Pet";
import SaveActivityButton from "@Components/SaveActivityButton";

import "./PreviousDay.style.scss";

interface IProps {
  onProceedButtonClick(): void;
  slideElements: number;
}

const PreviousDay: React.FC<IProps> = (props: IProps) => {
  const { slideElements, onProceedButtonClick } = props;

  const renderHeader = () => {
    return (
      <div className="previous-day__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="previous-day__swiper">
        <Swiper
          allowTouchMove={false}
          effect="fade"
          slidesPerView={1}
          height={190}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Poprzedni dzień</h4>
              <p className="swiper-slide__paragraph">
                Wypisz pozytywne rzeczy poprzedniego dnia
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
        <HorizontalProgressBar currentElement={1} elements={slideElements} />
      </div>
    );
  };

  const renderProceedButton = () => {
    return <SaveActivityButton title="Zapisz" onClick={onProceedButtonClick} />;
  };

  const renderImage = () => {
    return (
      <Pet
        src={MainImg}
        alt="Uśmiechnięta ośmiorniczka jpg"
        height="200px"
        paddingTop="20px"
        paddingBottom="20px"
      />
    );
  };

  const renderContext = () => {
    return (
      <div className="previous-day__wrapper">
        {renderImage()}
        {renderProgressBar()}
        {renderSwiper()}
        {renderProceedButton()}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderHeader()}
        <div className="previous-day">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default PreviousDay;
