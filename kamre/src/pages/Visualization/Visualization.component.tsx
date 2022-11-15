import React from "react";
import {
  CreateAnimation,
  IonContent,
  IonLoading,
  IonPage,
  IonToast,
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

import "./Visualization.style.scss";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;

  onCreateActivityWithContent(): void;

  setSwiper(value: any): void;

  onProceedButtonClick(): void;

  onAddSlide(): void;

  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;

  onEndButtonClick(): void;

  onDestroyButtonClick(): void;

  setToast(value: {}): void;

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
    isVisualizationListVisible: boolean;
    isFinalVisible: boolean;
  };
}

const Visualization: React.FC<IProps> = (props: IProps) => {
  const {
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
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
      return <div className="visualization__header" />;

    return (
      <div className="visualization__header">
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
      <div className="visualization__swiper">
        <Swiper
          effect="fade"
          slidesPerView={1}
          height={190}
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={onSlideChangeHandler}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">
                Wizualizacja swojego procesu zmiany
              </h4>
              <p className="swiper-slide__paragraph">
                Wizualizacja może nam pomóc w zmianie nawyków czy osiągnięciu
                zamierzonych celów.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Wypisz pozytywne cechy, jaki jesteś? Co o sobie myślisz?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Napisz to!</h4>
              <p className="swiper-slide__paragraph">
                <Input
                  type="text"
                  placeholder="Wpisz tutaj..."
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
        <div className="visualization__final-buttons">
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

  const renderVisualizationDataList = () => {
    return slidesInputsValue.map((val) => {
      const index = `visualization-item_${new Date().getTime()}`;
      return <li key={index}>{val} </li>;
    });
  };

  const renderVisualizationList = () => {
    const { isVisualizationListVisible } = pageController;

    return (
      isVisualizationListVisible && (
        <CreateAnimation
          play={isVisualizationListVisible}
          duration={2000}
          fromTo={{
            property: "opacity",
            fromValue: "0",
            toValue: "1",
          }}
        >
          <div className="visualization__list">
            <Pet
              src={img}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <h4>Super! Oto co wypisałeś_aś</h4>
            <ul>{renderVisualizationDataList()}</ul>
            <p>
              Pomyśl, co musisz zrobić, aby być bardziej taką osobą! Jak
              będziesz stać, poruszać się, co będziesz mówić? Wyobraź sobie
              konkretne sytuacje.
            </p>
            <ProceedButton title="Dalej!" onClick={onDestroyButtonClick} />
          </div>
        </CreateAnimation>
      )
    );
  };

  const renderContext = () => {
    const { isMainContextVisible } = pageController;

    return (
      isMainContextVisible && (
        <div className="visualization__wrapper">
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
          <div className="visualization__wrapper">
            <Pet
              src={PetHappy}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <h4>Gratulacje!</h4>
            <p>
              Wizualizacje to potężne narzędzie, dzięki nim nasz mózg jest gotów
              do działania w kierunku ich zawartości, dlatego warto skupiać się
              w nich na samych pozytywach! Czy chcesz dodać przemyślenia?
            </p>
            <div className="visualization__final-buttons">
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
        </CreateAnimation>
      )
    );
  };

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="visualization__loader"
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
        <div className="visualization">
          {renderLoader()}
          {renderToast()}
          {renderContext()}
          {renderVisualizationList()}
          {renderFinalStep()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Visualization;
