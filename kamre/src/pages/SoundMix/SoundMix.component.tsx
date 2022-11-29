import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";

import "./SoundMix.style.scss";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";
import { SOUND_MIX_URL } from "@Constants/soundMix.constatns";

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

const SoundMix: React.FC<IProps> = (props: IProps) => {
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
  const videoUrl = SOUND_MIX_URL;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="soundmix__loader"
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
    if (swiper?.activeIndex === 4) return <div className="soundmix__header" />;

    return (
      <div className="soundmix__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderImage = () => {
    if (swiper?.activeIndex === 3) {
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
            Źródło YouTube: Lofi Girl - lofi hip hop radio
          </p>
        </div>
      );
    }
    return (
      <Pet
        src={img}
        alt="Uśmiechnięta ośmiorniczka jpg"
        height="265px"
        paddingTop="20px"
        paddingBottom="20px"
      />
    );
  };

  const renderHorizontalProgressBar = () => {
    return (
      <div className="soundmix__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="soundmix__swiper">
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
              <h4 className="swiper-slide__header">Muzyka dla duszy </h4>
              <p className="swiper-slide__paragraph">
                Muzyka jest jedną z najlepszych rzeczy dla serca i duszy -
                pomaga łagodzić ból, poprawia nastrój i budzi w nas pozytywne
                emocje. W skrócie, czyni nas szczęśliwszymi!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Puść swoją ulubioną piosenkę lub playlistę! Oglądałeś Stranger
                Things? Czas otworzyć własny magiczny portal i uciec w
                przyjemniejsze miejsce.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Nie ograniczaj się!</h4>
              <p className="swiper-slide__paragraph">
                Spróbuj poczuć muzykę, każde jej brzmienie. Jeśli masz ochotę,
                rozluźnij mięśnie i zacznij poruszać w rytm muzyki. Poczuj
                napływ endorfin!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <p className="swiper-slide__paragraph">
                Szukasz muzycznych inspiracji? Sprawdź naszą playlistę!
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
    if (swiper?.activeIndex >= 4)
      return (
        <div className="soundmix__buttons">
          <div className="soundmix__final-buttons">
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
      <div className="soundmix__buttons">
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
        <div className="soundmix">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="soundmix__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(SoundMix);
