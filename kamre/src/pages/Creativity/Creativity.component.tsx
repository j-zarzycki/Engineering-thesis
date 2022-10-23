import React from "react";
import { IonContent, IonLoading, IonPage, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";

import "./Creativity.style.scss";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import Pet from "@Components/Pet";
import CancelButton from "@Components/CancelButton";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  setToast(value: {}): void;
  onProceedButtonClick(): void;
  setSwiper(value: any): void;
  onSlideChangeHandler(slide: SwiperType): void;
  onGenerateSubject(): void;
  isLoading: boolean;
  toast: any;
  currentSlide: number;
  swiper: any;
  img: string;
  subjectShort: string;
  subjectLong: string;
  slideElements: number;
}

const Creativity: React.FC<IProps> = (props: IProps) => {
  const {
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    onSlideChangeHandler,
    onGenerateSubject,
    setToast,
    setSwiper,
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    subjectShort,
    subjectLong,
    slideElements,
  } = props;

  onGenerateSubject();

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="walking__loader"
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
    return (
      <div className="creativity__header">
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
      <div className="creativity__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="creativity__swiper">
        <Swiper
          effect="fade"
          centeredSlides
          slidesPerView={1}
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header"> Mięsień kreatywności</h4>
              <p className="swiper-slide__paragraph">
                Czasami nasz umysł do wyciszenia potrzebuje kreatywnej rozrywki.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">
                10 sposobów na.. {subjectShort}!
              </h4>
              <p className="swiper-slide__paragraph">
                Wymyśl 10 niekonencjonalych sposobów na {subjectLong}. Im
                bardziej szalone tym lepiej!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Gratulacje!</h4>
              <p className="swiper-slide__paragraph">
                Czy udało Ci się uspokoić? W jakim kierunku uciekały Twoje
                myśli? <br />
                Jeśli chcesz dodaj notatkę ze swoimi sposobami lub
                przemyśleniami.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };

  const renderButtons = () => {
    if (swiper?.activeIndex === 1) {
      return (
        <div className="creativity__final-buttons">
          <CancelButton onClick={onGenerateSubject} title="Losuj" />
          <SaveActivityButton title="Dalej!" onClick={onProceedButtonClick} />
        </div>
      );
    }
    if (swiper?.activeIndex >= 2)
      return (
        <div className="creativity__final-buttons">
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
        <div className="creativity">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="creativity__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Creativity;
