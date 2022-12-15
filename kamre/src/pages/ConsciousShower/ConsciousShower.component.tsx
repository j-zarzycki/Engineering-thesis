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
import "./ConsciousShower.style.scss";

interface IProps {
  isLoading: boolean;
  toast: ToastType;
  currentSlide: number;
  swiper: any;
  img: string;
  slideElements: number;
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  setToast(toast: ToastType): void;
  onProceedButtonClick(): void;
  setSwiper(swiper: SwiperType): void;
  onSlideChangeHandler(slide: SwiperType): void;
}

const ConsciousShower: React.FC<IProps> = (props: IProps) => {
  const {
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    slideElements,
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    onSlideChangeHandler,
    setToast,
    setSwiper,
  } = props;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="conscious-shower__loader"
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
    if (swiper?.activeIndex === 3)
      return <div className="conscious-shower__header" />;

    return (
      <div className="conscious-shower__header">
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
      <div className="conscious-shower__horizontal-progress-bar">
        <HorizontalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="conscious-shower__swiper">
        <Swiper
          centeredSlides
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={(slide) => onSlideChangeHandler(slide)}
          {...swiperDefaultOptions}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Świadomy prysznic</h4>
              <p className="swiper-slide__paragraph">
                Kąpiel to czas odprężenia i skupienia na sobie. Oderwij się na
                chwilę od rzeczywistości i oczyść umysł.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Świadomość</h4>
              <p className="swiper-slide__paragraph">
                Weź kąpiel z pełną świadomością tego co widzisz, słyszysz i
                czujesz. W tym czasie spróbuj oderwać się od spraw bieżących.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Oczyszczenie</h4>
              <p className="swiper-slide__paragraph">
                Niech myśli spływają z Ciebie niczym krople wody. Poczuj zapach
                kosmetyków, zwróć uwagę jakie wrażenie pozostawiają na skórze.
                Wsłuchaj się w szum wody.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Przemyślenia</h4>
              <p className="swiper-slide__paragraph">
                Po prysznicu przemyśl, co czułeś_aś? Co dało Ci to ćwiczenie?
                Czy udało Ci się oczyścić umysł z myśli?
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };

  const renderButtons = () => {
    if (swiper?.activeIndex >= 3)
      return (
        <div className="conscious-shower__final-buttons">
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
        <div className="conscious-shower">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="conscious-shower__wrapper">{renderContext()}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(ConsciousShower);
