import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./Music.style.scss";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;

  onCreateActivityWithContent(): void;

  setToast(value: {}): void;

  onProceedButtonClick(): void;

  setSwiper(value: any): void;

  setShowProceedButton(value: boolean): void;

  isLoading: boolean;
  toast: any;
  currentSlide: number;
  swiper: any;
  img: string;
  slideElements: number;
  showProceedButton: boolean;
}

const Music: React.FC<IProps> = (props: IProps) => {
  const {
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    onProceedButtonClick,
    setToast,
    setSwiper,
    setShowProceedButton,
    isLoading,
    toast,
    swiper,
    currentSlide,
    img,
    slideElements,
    showProceedButton,
  } = props;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="music__loader"
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
    if (swiper?.activeIndex === 3) return <div className="music__header" />;

    return (
      <div className="music__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="music">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="music__wrapper">
            <Pet
              src={img}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <div className="music__horizontal-progress-bar">
              <HorizontalProgressBar
                currentElement={currentSlide}
                elements={slideElements}
              />
            </div>

            <div className="music__swiper">
              <Swiper
                allowTouchMove={false}
                effect="fade"
                centeredSlides
                slidesPerView={1}
                onSwiper={(swiperData) => setSwiper(swiperData)}
              >
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Muzyka klasyczna</h4>
                    <p className="swiper-slide__paragraph">
                      Muzyka klasyczna w znacznym stopniu harmonizuje cały
                      organizm człowieka.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      O co chodzi w ćwiczeniu?
                    </h4>
                    <p className="swiper-slide__paragraph">
                      Włącz playlistę z utworami klasycznymi - może to być
                      przygotowana przez nas, bądź wybrana przez Ciebie.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      Słuchaj tyle ile będziesz chcieć
                    </h4>
                    <p className="swiper-slide__paragraph">
                      w sytuacjach kiedy musisz być skupiony bądź, kiedy chcesz
                      się odciąć od bodźców i odpocząć.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Przemyślenia</h4>
                    <p className="swiper-slide__paragraph">
                      Co zaobserwowałeś_aś po muzycznym seansie? Jak się
                      czułeś_aś? Co dało Ci to ćwiczenie?
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {showProceedButton && (
              <ProceedButton
                title="Prowadź mnie!"
                onClick={onProceedButtonClick}
              />
            )}

            <CSSTransition
              in={!showProceedButton}
              timeout={300}
              classNames="swiper__proceed-buttons"
              unmountOnExit
              onEnter={() => setShowProceedButton(false)}
              onExited={() => setShowProceedButton(true)}
            >
              <div className="final-buttons">
                <CancelButton
                  title="Zakończ"
                  onClick={onCreateActivityWithNoContent}
                />
                <SaveActivityButton
                  title="Zapisz"
                  onClick={onCreateActivityWithContent}
                />
              </div>
            </CSSTransition>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Music;
