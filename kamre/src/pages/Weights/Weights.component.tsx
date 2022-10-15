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
import { BsWind } from "react-icons/bs";

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

import "./Weights.style.scss";

interface IProps {
  setSwiper(value: any): void;

  onProceedButtonClick(): void;

  onAddSlide(): void;

  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;

  onEndButtonClick(): void;

  onDestroyButtonClick(): void;

  setToast(value: {}): void;

  onSaveButtonClick(): void;

  onSlideChangeHandler(): void;

  isLoading: boolean;
  currentSlide: number;
  slideElements: number;
  img: string;
  toast: { isOpen: boolean; message: string };
  isAddingDisabled: boolean;
  swiper: any;
  slides: React.ReactElement[];
  slidesInputsValue: string[];
  pageController: {
    isMainContextVisible: boolean;
    isWeightsListVisible: boolean;
    isFinalVisible: boolean;
  };
}

const Weights: React.FC<IProps> = (props: IProps) => {
  const {
    setSwiper,
    currentSlide,
    slideElements,
    pageController,
    onProceedButtonClick,
    onAddSlide,
    img,
    slides,
    isAddingDisabled,
    onEndButtonClick,
    onInputChange,
    onDestroyButtonClick,
    onSaveButtonClick,
    swiper,
    slidesInputsValue,
    isLoading,
    setToast,
    toast,
    onSlideChangeHandler,
  } = props;

  const renderHeader = () => {
    const { isFinalVisible } = pageController;
    if (swiper?.activeIndex >= 3 || isFinalVisible)
      return <div className="weights__header" />;

    return (
      <div className="weights__header">
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
      <div className="weights__swiper">
        <Swiper
          effect="fade"
          slidesPerView={1}
          height={190}
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={onSlideChangeHandler}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Ciężary</h4>
              <p className="swiper-slide__paragraph">
                Czy czujesz, że coś leży Ci na sercu? Masz wyrzuty sumienia bądź
                odczuwasz żal, poczucie winy?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Wypisz wszystkie ciężary, robiąc to poczuj i pomyśl jak je sobie
                wybaczasz. Na zakończenie kliknij w przycisk i zobacz jak te
                rzeczy znikają
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Wpisz ciężar:</h4>
              <p className="swiper-slide__paragraph">
                <Input
                  type="text"
                  placeholder="Wpisz swój ciężar..."
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
        <div className="weights__final-buttons">
          <CancelButton onClick={onEndButtonClick} title="Dalej!" />
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

  const renderWeightsDataList = () => {
    return slidesInputsValue.map((val) => {
      const index = `weight-item_${new Date().getTime()}`;
      return <li key={index}>{val} </li>;
    });
  };

  const renderWeightsList = () => {
    const { isWeightsListVisible } = pageController;

    return (
      isWeightsListVisible && (
        <CreateAnimation
          play={isWeightsListVisible}
          duration={2000}
          fromTo={{
            property: "opacity",
            fromValue: "0",
            toValue: "1",
          }}
        >
          <div className="weights__list">
            <h4>Oto, twoje ciężary</h4>
            <ul>{renderWeightsDataList()}</ul>
            <ProceedButton
              icon={<BsWind size={25} />}
              title="Niech znikną!"
              onClick={onDestroyButtonClick}
            />
          </div>
        </CreateAnimation>
      )
    );
  };

  const renderContext = () => {
    const { isMainContextVisible } = pageController;

    return (
      isMainContextVisible && (
        <div className="weights__wrapper">
          {renderImage()}
          {renderProgressBar()}
          {renderSwiper()}
          {renderButton()}
        </div>
      )
    );
  };

  const renderFinalStep = () => {
    const { isFinalVisible } = pageController;
    return (
      isFinalVisible && (
        <CreateAnimation
          play={isFinalVisible}
          duration={2000}
          fromTo={{
            property: "opacity",
            fromValue: "0",
            toValue: "1",
          }}
        >
          <div className="weights__wrapper">
            <Pet
              src={PetHappy}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <h4>Gratulacje!</h4>
            <p>
              Często nosimy w sobie emocje, które powodują u nas ucisk w sercu,
              na duszy. Zaakceptuj te uczucia i próbuj wybaczać je sobie. Wiem,
              to trudne zadanie ale jestem przekonana, że Ci się uda!
            </p>
            <div className="weights__final-buttons">
              <SaveActivityButton title="Gotowe" onClick={onSaveButtonClick} />
            </div>
          </div>
        </CreateAnimation>
      )
    );
  };

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

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderHeader()}
        <div className="weights">
          {renderLoader()}
          {renderToast()}
          {renderContext()}
          {renderWeightsList()}
          {renderFinalStep()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Weights;
