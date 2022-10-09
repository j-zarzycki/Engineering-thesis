import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonLoading,
  IonToast,
  useIonAlert,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./YtPage.style.scss";
import BackButton from "@Components/BackButton";
import SaveButton from "@Components/SaveButton";
import VideoHeader from "@Components/VideoHeader";
import { YTPAGE_URL, SWIPE_ELEMENTS } from "@Constants/ytPage.constants";

import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import MainImg from "@Assets/main.png";
import ProceedButton from "@Components/ProceedButton";
import Pet from "@Components/Pet";
import quote from "@Assets/what.png";

{
  /* import components on Test
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
*/
}

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(): void;
  setToast(value: {}): void;
  isLoading: boolean;
  toast: { isOpen: boolean; message: string };
}

const YtPage: React.FC<IProps> = (props: IProps) => {
  const {
    onCreateActivityWithNoContent,
    onCreateActivityWithContent,
    setToast,
    isLoading,
    toast,
  } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [showProceedButton, setShowProceedButton] = useState(true);
  const slideElements = SWIPE_ELEMENTS;
  const videoUrl = YTPAGE_URL;
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    setImg(MainImg);
  }, []);
  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements) {
      setImg(quote);
    }
    if (swiper?.activeIndex === slideElements) {
      setShowProceedButton(false);
    }
  };

  const renderHeader = () => {
    if (swiper?.activeIndex === 3)
      return <div className="conscious-shower__header" />;

    return (
      <div className="conscious-shower__header">
        <BackButton defaultHref="/home" />
      </div>
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

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="edu-vid">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          <div className="edu-vid__wrapper">
            <HorizontalProgressBar
              currentElement={currentSlide}
              elements={slideElements}
            />
            <div className="edu-vid__swiper">
              <Swiper
                allowTouchMove={false}
                effect="fade"
                centeredSlides
                slidesPerView={1}
                onSwiper={(swiperData) => setSwiper(swiperData)}
              >
                <SwiperSlide>
                  <Pet
                    src={img}
                    alt="Uśmiechnięta ośmiorniczka jpg"
                    height="200px"
                    paddingTop="20px"
                    paddingBottom="20px"
                  />
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Świadomy prysznic</h4>
                    <p className="swiper-slide__paragraph">
                      Kąpiel to czas odprężenia i skupienia na sobie. Oderwij
                      się na chwilę od rzeczywistości i oczyść umysł.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <div className="video-container">
                      <iframe
                        className="embed"
                        src={videoUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      />
                    </div>
                    <p className="source">
                      Źródło Youtube: Katarzyna Miller - Co z tym stresem?
                    </p>
                    <p className="swiper-slide__paragraph">
                      Weź kąpiel z pełną świadomością tego co widzisz, słyszysz
                      i czujesz. W tym czasie spróbuj oderwać się od spraw
                      bieżących.
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
                {/* Zmiana na teście
                  <CancelButton
                      title="Zakończ"
                      onClick={onCreateActivityWithNoContent}
                  />
                  <SaveActivityButton
                      title="Zapisz"
                      onClick={onCreateActivityWithContent}
                  />
                  */}
                <ProceedButton
                  title="Dodaj przemyślenia"
                  onClick={onCreateActivityWithContent}
                />
                <ProceedButton
                  title="Zakończ"
                  onClick={onCreateActivityWithNoContent}
                />
              </div>
            </CSSTransition>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default YtPage;
