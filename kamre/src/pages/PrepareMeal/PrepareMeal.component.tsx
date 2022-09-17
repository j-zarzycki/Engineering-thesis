import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  useIonAlert,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./PrepareMeal.style.scss";
import SWIPE_ELEMENTS from "@Constants/preparemeal.constants";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(activityContent: String): Promise<void>;
  setToast(value: {}): void;
  isLoading: boolean;
  toast: { isOpen: boolean; message: string };
}

const PrepareMeal: React.FC<IProps> = (props: IProps) => {
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
  const [presentAlert] = useIonAlert();
  const [showProceedButton, setShowProceedButton] = useState(true);
  const slideElements = SWIPE_ELEMENTS;

  useEffect(() => {
    setImg(MainImg);
  }, []);
  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements - 4) {
      setImg(quote);
    }
    if (swiper?.activeIndex === slideElements - 1) {
      setShowProceedButton(false);
      setImg(MainImg);
    }
  };
  const onAlertButtonClick = (alertData: String) => {
    onCreateActivityWithContent(alertData);
  };

  const onProceedButtonClickWithContent = () => {
    presentAlert({
      header: "Dodaj swoje przemyślenia",
      buttons: [
        {
          text: "OK",
          handler: (alertData) => {
            onAlertButtonClick(alertData.content);
          },
        },
      ],
      inputs: [
        {
          name: "content",
          placeholder: "Wpisz je tutaj...",
        },
      ],
    });
  };

  const renderHeader = () => {
    if (swiper?.activeIndex === 3)
      return <div style={{ paddingTop: "32px" }} className="bike__header" />;

    return (
      <div>
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
        <div className="spacer">
          {renderHeader()}
          {renderToast()}
          {renderLoader()}
          <div className="spacer__wrapper">
            <Pet
              src={img}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <HorizontalProgressBar
              currentElement={currentSlide}
              elements={slideElements}
            />
            <div className="spacer__swiper">
              <Swiper
                allowTouchMove={false}
                effect="fade"
                centeredSlides
                slidesPerView={1}
                onSwiper={(swiperData) => setSwiper(swiperData)}
              >
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      Przygotuj coś pysznego!
                    </h4>
                    <p className="swiper-slide__paragraph">
                      Na co masz dzisiaj ochotę? Spraw sobie przyjemność i
                      przygotuj ucztę dla zmysłów!
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Co schrupać?</h4>
                    <p className="swiper-slide__paragraph">
                      Co byś dzisiaj zjadł/a? Przeszukaj lodówkę lub przejdź się
                      do sklepu i przygotuj samodzielnie potrawę. Oczyść swój
                      umysł i oderwij się od natrętnych myśli.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      O co chodzi w ćwiczeniu?
                    </h4>
                    <p className="swiper-slide__paragraph">
                      Poświęć całą swoją uwagę na przygotowaniu swojego
                      kulinarnego dzieła. Zainspiruj się przepisem, bądź użyj
                      swojej fantazji i kreatywności - wymyśl to, co
                      podpowiadają Ci zmysły.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Przemyślenia</h4>
                    <p className="swiper-slide__paragraph">
                      Pomyśl, jak czułeś/aś się podczas gotowania? Czy miałeś/aś
                      jakieś problemy, opory?
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
                  title="Anuluj"
                  onClick={onCreateActivityWithNoContent}
                />
                <SaveActivityButton
                  title="Zapisz"
                  onClick={onProceedButtonClickWithContent}
                />
              </div>
            </CSSTransition>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PrepareMeal;
