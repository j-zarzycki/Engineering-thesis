import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdAdd } from "react-icons/io";

// Import Swiper styles
import "swiper/css";

import BackButton from "@Components/BackButton";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import Pet from "@Components/Pet";
import CancelButton from "@Components/CancelButton";
import Input from "@Components/Input";

import ProceedButton from "@Components/ProceedButton";
import "./GoodWord.style.scss";

interface IProps {
  setSwiper(value: any): void;
  onProceedButtonClick(): void;
  onAddSlide(): void;
  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onEndButtonClick(): void;
  setToast(value: {}): void;
  currentSlide: number;
  slideElements: number;
  img: string;
  isAddingDisabled: boolean;
  isLoading: boolean;
  swiper: any;
  toast: { isOpen: boolean; message: string };
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
    setToast,
    toast,
    isLoading,
  } = props;

  const renderHeader = () => {
    if (swiper?.activeIndex >= 3) return <div className="walking__header" />;

    return (
      <div className="walking__header">
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
                będą dla Ciebie wsparciem. Poproś bliskich, aby również zapisali
                wiadomości od siebie
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">
                Napisz do siebie jakąś miłą wiadomość!
              </h4>
              <p className="swiper-slide__paragraph">
                <Input
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
          <CancelButton onClick={onEndButtonClick} title="Zakończ" />
          <ProceedButton
            title="Dodaj"
            onClick={onAddSlide}
            disabled={isAddingDisabled}
            icon={<IoMdAdd size={25} />}
          />
        </div>
      );

    if (swiper?.activeIndex === 2)
      return (
        <ProceedButton
          title="Dodaj"
          onClick={onAddSlide}
          disabled={isAddingDisabled}
          icon={<IoMdAdd size={25} />}
        />
      );

    return <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />;
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

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="good-word__loader"
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

  const renderContext = () => {
    return (
      <div className="good-word__wrapper">
        {renderToast()}
        {renderLoader()}
        {renderImage()}
        {renderProgressBar()}
        {renderSwiper()}
        {renderButton()}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderHeader()}
        <div className="good-word">{renderContext()}</div>
      </IonContent>
    </IonPage>
  );
};

export default GoodWord;