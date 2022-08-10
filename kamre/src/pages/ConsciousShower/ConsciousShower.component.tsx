import React, { useState } from "react";
import { IonContent, IonPage, useIonAlert } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./ConsciousShower.css";
import SWIPE_ELEMENTS from "../../constants/consciousShower.constants";
import HorizontalProgressBar from "../../components/HorizontalProgressBar";
import Pet from "../../assets/image-12.png";
import BackButton from "../../components/BackButton";
import ProceedButton from "../../components/ProceedButton";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(activityContent: String): Promise<void>;
}

const ConsciousShower: React.FC<IProps> = (props) => {
  const { onCreateActivityWithNoContent, onCreateActivityWithContent } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [presentAlert] = useIonAlert();
  const [showProceedButton, setShowProceedButton] = useState(true);
  const slideElements = SWIPE_ELEMENTS;

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements - 1) setShowProceedButton(false);
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
        <div className="conscious-shower">
          <BackButton defaultHref="/home" />
          <div className="conscious-shower__wrapper">
            <div className="conscious-shower__image">
              <img src={Pet} alt="pet" />
            </div>
            <HorizontalProgressBar
              currentElement={currentSlide}
              elements={slideElements}
            />
            <div className="conscious-shower__swiper">
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
                      3 kroki do świadomego prysznicu
                    </h4>
                    <p className="swiper-slide__paragraph">
                      Pokażę Ci jak krok po kroku zwiększyć świadomość swoich
                      działań w codziennym życiu.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      3 kroki do świadomego prysznicu
                    </h4>
                    <p className="swiper-slide__paragraph">
                      Pokażę Ci jak krok po kroku zwiększyć świadomość swoich
                      działań w codziennym życiu.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      3 kroki do świadomego prysznicu
                    </h4>
                    <p className="swiper-slide__paragraph">
                      Pokażę Ci jak krok po kroku zwiększyć świadomość swoich
                      działań w codziennym życiu.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      3 kroki do świadomego prysznicu
                    </h4>
                    <p className="swiper-slide__paragraph">
                      Pokażę Ci jak krok po kroku zwiększyć świadomość swoich
                      działań w codziennym życiu.
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
              <div>
                <ProceedButton
                  title="Zakończ"
                  onClick={onCreateActivityWithNoContent}
                />
                <ProceedButton
                  title="Dodaj przemyślenia"
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

export default ConsciousShower;
