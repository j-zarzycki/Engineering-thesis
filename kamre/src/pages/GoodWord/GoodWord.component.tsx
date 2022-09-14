import { IonContent, IonPage, IonImg } from "@ionic/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import BackButton from "@Components/BackButton";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";

import ProceedButton from "@Components/ProceedButton";
import "./GoodWord.style.scss";

interface IProps {
  setSwiper(value: any): void;
  onProceedButtonClick(): void;
  onAddSlide(): void;
  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onEndButtonClick(): void;
  currentSlide: number;
  slideElements: number;
  img: string;
  isAddingDisabled: boolean;
  swiper: any;
  slides: React.ReactElement[];
}

const GoodWord: React.FC<IProps> = (props: IProps) => {
  const {
    setSwiper,
    currentSlide,
    slideElements,
    onProceedButtonClick,
    onAddSlide,
    img,
    slides,
    isAddingDisabled,
    onEndButtonClick,
    onInputChange,
    swiper,
  } = props;

  const renderHeader = () => {
    return (
      <div className="good-word__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderGeneratedSlides = () => {
    return slides.map((slide) => {
      return slide;
    });
  };

  const renderSwiper = () => {
    return (
      <div className="good-word__swiper">
        <Swiper
          allowTouchMove={false}
          effect="fade"
          slidesPerView={1}
          height={190}
          onSwiper={(swiperData) => setSwiper(swiperData)}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Dobre słowo</h4>
              <p className="swiper-slide__paragraph">
                To ćwiczenie wykonaj, gdy będziesz w dobrym nastroju - przyda
                się na gorsze dni.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Napisz do siebie miłe rzeczy, takie które w trudnych chwilach
                będą dla Ciebie wsparciem. Wszystkie wiadomości będziesz mógł
                odczytać korzystając z opcji Pomoc.Poproś bliskich, aby również
                zapisali wiadomości od siebie
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">
                Napisz do siebie jakąś miłą wiadomość!
              </h4>
              <p className="swiper-slide__paragraph">
                <input
                  className="swiper-slide__input"
                  type="text"
                  placeholder="Wpisz coś miłego..."
                  onChange={onInputChange}
                />
              </p>
            </div>
          </SwiperSlide>
          {renderGeneratedSlides()}
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

  const renderButton = () => {
    if (swiper?.activeIndex >= 3)
      return (
        <div className="good-word__buttons">
          <button
            className="buttons-good-word__end"
            type="button"
            onClick={onEndButtonClick}
          >
            Zakończ
          </button>
          <button
            className="buttons-good-word__add"
            type="button"
            onClick={onAddSlide}
            disabled={isAddingDisabled}
          >
            Dodaj
          </button>
        </div>
      );

    if (swiper?.activeIndex === 2)
      return (
        <div className="good-word__buttons">
          <button
            className="buttons-good-word__add"
            type="button"
            onClick={onAddSlide}
            disabled={isAddingDisabled}
          >
            Dodaj
          </button>
        </div>
      );

    return <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />;
  };

  const renderImage = () => {
    return <IonImg className="good-word__image" alt="pet" src={img} />;
  };

  const renderContext = () => {
    return (
      <div className="good-word__context">
        {renderImage()}
        {renderProgressBar()}
        {renderSwiper()}
        {renderButton()}
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
        <div className="good-word__wrapper">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default GoodWord;
