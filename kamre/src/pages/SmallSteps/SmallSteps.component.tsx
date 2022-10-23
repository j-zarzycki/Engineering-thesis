import React from "react";
import {
  IonContent,
  IonPage,
  IonLoading,
  IonToast,
  CreateAnimation,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdAdd } from "react-icons/io";

// Import Swiper styles
import "swiper/css";

import Input from "@Components/Input";
import CancelButton from "@Components/CancelButton";
import BackButton from "@Components/BackButton";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import Pet from "@Components/Pet";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import PetHappy from "@Assets/happy.png";

import "./SmallSteps.style.scss";

interface IProps {
  pageController: { isMainContextVisible: boolean; isFinalVisible: boolean };
  canSwipe: boolean;
  isLoading: boolean;
  currentSlide: number;
  slideElements: number;
  img: string;
  toast: { isOpen: boolean; message: string };
  isAddingDisabled: boolean;
  swiper: any;
  slides: React.ReactElement[];

  setSwiper(value: any): void;

  onProceedButtonClick(): void;

  onAddSlide(): void;

  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;

  setToast(value: {}): void;

  onSwipeHandle(): void;

  onSaveActivityWithContent(): void;

  onContinueButtonClick(): void;
}

const SmallSteps: React.FC<IProps> = (props: IProps) => {
  const {
    pageController,
    canSwipe,
    currentSlide,
    slideElements,
    img,
    slides,
    isAddingDisabled,
    swiper,
    isLoading,
    toast,
    setSwiper,
    onProceedButtonClick,
    onAddSlide,
    onInputChange,
    setToast,
    onSwipeHandle,
    onSaveActivityWithContent,
    onContinueButtonClick,
  } = props;

  const renderHeader = () => {
    if (swiper?.activeIndex >= 3)
      return <div className="small-steps__header" />;

    return (
      <div className="small-steps__header">
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
      <div className="small-steps__swiper">
        <Swiper
          allowTouchMove={canSwipe}
          effect="fade"
          slidesPerView={1}
          height={190}
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={onSwipeHandle}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Małe kroki</h4>
              <p className="swiper-slide__paragraph">
                Opuśc na moment własną głowę i podaj rzeczy, sytuacje za których
                jesteś z siebie dumny.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Wypisz, za co jesteś z siebie dumny. To mogą być nawet codzienne
                czynności. Postaraj się wyciągnąć rzeczy, które wywołały w Tobie
                pozytywne emocje.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">
                Jestem z siebie dumny, bo:
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

  const renderButtons = () => {
    if (swiper?.activeIndex >= 3)
      return (
        <div className="small-steps__final-buttons">
          <CancelButton onClick={onContinueButtonClick} title="Dalej!" />
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

  const renderFinalStep = () => {
    const { isFinalVisible } = pageController;
    return (
      <CreateAnimation
        play={isFinalVisible}
        duration={2000}
        fromTo={{
          property: "opacity",
          fromValue: "0",
          toValue: "1",
        }}
      >
        <div className="small-steps__wrapper">
          <Pet
            src={PetHappy}
            alt="Uśmiechnięta ośmiorniczka jpg"
            height="200px"
            paddingTop="20px"
            paddingBottom="20px"
          />
          <h4>Gratulacje!</h4>
          <p>
            Pomyśl, jak się czujesz po wypisaniu swoich sukcesów? Doceniaj
            siebie i swoje osiągnięcia, bo jesteś super!
          </p>
          <div className="small-steps__final-buttons">
            <SaveActivityButton
              title="Zakończ"
              onClick={onSaveActivityWithContent}
            />
          </div>
        </div>
      </CreateAnimation>
    );
  };

  const renderContext = () => {
    const { isMainContextVisible } = pageController;

    if (isMainContextVisible) {
      return (
        <div className="small-steps__wrapper">
          {renderImage()}
          {renderProgressBar()}
          {renderSwiper()}
          {renderButtons()}
        </div>
      );
    }

    return <div className="small-steps__wrapper">{renderFinalStep()}</div>;
  };

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="small-steps__loader"
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

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderHeader()}
        <div className="small-steps">
          {renderLoader()}
          {renderToast()}
          {renderContext()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SmallSteps;
