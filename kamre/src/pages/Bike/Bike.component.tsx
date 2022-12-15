import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { swiperDefaultOptions } from "@Constants/swiper.constants";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";

import "swiper/css";
import "./Bike.style.scss";

interface IProps {
  isLoading: boolean;
  currentSlide: number;
  img: string;
  slideElements: number;
  swiper: any;
  toast: ToastType;
  setToast(toast: ToastType): void;
  setSwiper(swiper: SwiperType): void;
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  onProceedButtonClick(): void;
  onSlideChangeHandler(slide: SwiperType): void;
}

const Bike: React.FC<IProps> = (props: IProps) => {
  const {
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    slideElements,
    setToast,
    setSwiper,
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    onSlideChangeHandler,
  } = props;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="bike__loader"
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
    if (swiper?.activeIndex === 4) return <div className="bike__header" />;

    return (
      <div className="bike__header">
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
      <div className="bike__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="bike__swiper">
        <Swiper
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
          centeredSlides
          {...swiperDefaultOptions}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Jazda na rowerze</h4>
              <p className="swiper-slide__paragraph">
                Środek na zwalczenie stresu bez recepty!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Endorfiny</h4>
              <p className="swiper-slide__paragraph">
                Endorfiny są „antagonistą” stresu, uczucia napięcia nerwowego,
                niepokoju a nawet bólu głowy.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Wsiadaj na rumaka i jazda! Aktywność fizyczna jest jedną z
                najlepszych form walki ze stresem, ponieważ produkowane są wtedy
                endorfiny - antagoniści stresu, obniżają napięcię nerwowe,
                niepokój a nawet ból głowy.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Jeżeli nie masz roweru</h4>
              <p className="swiper-slide__paragraph">
                Spróbuj innej aktywności sportowej, która sprawi Ci przyjemność!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Przemyślenia</h4>
              <p className="swiper-slide__paragraph">
                Co zaobserwowałeś_aś po przejażdżce? Jak się czułeś_aś? Co dało
                Ci to ćwiczenie?
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
        <div className="bike__final-buttons">
          <CancelButton
            onClick={onCreateActivityWithNoContent}
            title="Zakończ"
          />
          <SaveActivityButton
            title="Zapisz"
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
        <div className="bike">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="bike__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Bike);
