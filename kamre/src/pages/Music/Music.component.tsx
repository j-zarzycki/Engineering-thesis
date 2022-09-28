import React, { useEffect, useState } from "react";
import { IonContent, IonPage, useIonAlert, IonInput } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./Music.style.scss";
import SWIPE_ELEMENTS from "@Constants/music.constants";
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
}

const Music: React.FC<IProps> = (props: IProps) => {
  const { onCreateActivityWithNoContent, onCreateActivityWithContent } = props;
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

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="music">
          <BackButton defaultHref="/home" />
          <div className="music__wrapper">
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
                    <h4 className="swiper-slide__header">Relaksująca Muzyka</h4>
                    <p className="swiper-slide__paragraph">
                      Kliknij w <a href="/">link</a> i oddaj się relaksującym
                      rytmom. Poczuj muzykę całym Twoim ciałem i uspokój swoje
                      wewnętrzne 'JA'.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      Opisz swoje odczucia.
                    </h4>
                    <IonInput
                      className="music-input"
                      type="text"
                      placeholder="Napisz tutaj"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {showProceedButton && (
              <ProceedButton
                title="Co czujesz?"
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

export default Music;
