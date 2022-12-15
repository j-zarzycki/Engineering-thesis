import React from "react";
import { IonContent, IonLoading, IonPage, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { BiChevronRight } from "react-icons/bi";

import { ToastType } from "@Types/toast.type";
import { swiperDefaultOptions } from "@Constants/swiper.constants";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import Pet from "@Components/Pet";
import CancelButton from "@Components/CancelButton";

import "swiper/css";
import "./Creativity.style.scss";

interface IProps {
  isLoading: boolean;
  toast: ToastType;
  currentSlide: number;
  swiper: any;
  img: string;
  subjectShort: string;
  subjectLong: string;
  slideElements: number;
  setSwiper(swiper: SwiperType): void;
  setToast(toast: ToastType): void;
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  onProceedButtonClick(): void;
  onSlideChangeHandler(slide: SwiperType): void;
  onGenerateSubject(): void;
}

const Creativity: React.FC<IProps> = (props: IProps) => {
  const {
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    subjectShort,
    subjectLong,
    slideElements,
    setToast,
    setSwiper,
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    onSlideChangeHandler,
    onGenerateSubject,
  } = props;

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
          centeredSlides
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
          {...swiperDefaultOptions}
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
                Świetna robota! Czy udało Ci się uspokoić? Gdzie uciekały Twoje
                myśli?
                <br />
                Dodaj notatkę ze swoimi sposobami lub przemyśleniami.
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
          <SaveActivityButton
            title="Dalej"
            icon={<BiChevronRight size={25} />}
            onClick={onProceedButtonClick}
          />
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

    return <ProceedButton title="Dalej" onClick={onProceedButtonClick} />;
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

export default React.memo(Creativity);
