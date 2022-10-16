import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./Emergency.style.scss";
import SWIPE_ELEMENTS from "@Constants/emergency.constants";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import Pet from "@Components/Pet";
import EmergencyGet from "@Services/emergency.service";

const Emergency: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [showProceedButton, setShowProceedButton] = useState(true);
  const slideElements = SWIPE_ELEMENTS;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setImg(MainImg);
  }, []);
  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
  };
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    EmergencyGet()
      .then((v) => {
        console.log(`w useefect${isClicked}`);
        setData(v.data.res);
      })
      .catch((err) => console.log(["APIGet error:", err]));
  }, [isClicked]);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="emergency">
          <BackButton defaultHref="/home" />
          <div className="emergency__wrapper">
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
            <div className="emergency__swiper">
              <Swiper
                allowTouchMove={false}
                effect="fade"
                centeredSlides
                slidesPerView={1}
                onSwiper={(swiperData) => setSwiper(swiperData)}
              >
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Szybka Pomoc</h4>
                    <p>Hej hej, spokojnie jestem przy Tobie!</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <p className="swiper-slide__paragraph">
                      <p>{data}</p>
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {showProceedButton && (
              <ProceedButton title="Następny" onClick={onProceedButtonClick} />
            )}
            <CSSTransition
              in={!showProceedButton}
              timeout={300}
              classNames="swiper__proceed-buttons"
              unmountOnExit
              onEnter={() => {
                setShowProceedButton(false);
                setIsClicked(true);
                console.log(isClicked);
              }}
              onExited={() => setShowProceedButton(true)}
            >
              <div className="final-buttons">aaa</div>
            </CSSTransition>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Emergency;
