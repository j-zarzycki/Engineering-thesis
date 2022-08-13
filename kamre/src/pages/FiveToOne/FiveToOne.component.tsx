import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";

// Import Swiper styles
import "swiper/css";

import "./FiveToOne.style.css";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import Pet from "@Assets/image-12.png";
import ProceedButton from "@Components/ProceedButton";
import BackButton from "@Components/BackButton";
import SWIPE_ELEMENTS from "@Constants/fiveToOne.constans";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

interface IProps {
  createFiveToOne(): Promise<void>;
}

const FiveToOne: React.FC<IProps> = (props: IProps) => {
  const { createFiveToOne } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [showProceedButton, setShowProceedButton] = useState(true);
  const slideElements = SWIPE_ELEMENTS;

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements - 1) setShowProceedButton(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="five-to-one">
          <BackButton defaultHref="/home" />
          <div className="five-to-one__wrapper">
            <div className="five-to-one__image">
              <img src={Pet} alt="pet" />
            </div>
            <HorizontalProgressBar
              currentElement={currentSlide}
              elements={slideElements}
            />
            <div className="five-to-one__swiper">
              <Swiper
                allowTouchMove={false}
                effect="fade"
                centeredSlides
                slidesPerView={1}
                onSwiper={(swiperData) => setSwiper(swiperData)}
              >
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Technika 5-4-3-2-1</h4>
                    <p className="swiper-slide__paragraph">
                      Czujesz się bardzo zestresowany? Czujesz, że tracisz
                      kontrolę z powodu paniki? Zaufaj mi, zaraz na to
                      zaradzimy!
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">5</h4>
                    <p className="swiper-slide__paragraph">
                      Rozejrzyj się i spróbuj nazwać <strong>pięć</strong>{" "}
                      rzeczy, które widzisz.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">4</h4>
                    <p className="swiper-slide__paragraph">
                      Teraz dotknij cztery rzeczy, poczuj ich fakturę, czy są
                      przyjemne w dotyku, zimne, szorstkie. Skup na tym uwagę,
                      nie śpiesz się.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">3</h4>
                    <p className="swiper-slide__paragraph">
                      Wytęż słuch i nazwij trzy rzeczy, które słyszysz. Czy te
                      dźwięki są przyjemne? Co czujesz, gdy je słyszysz?
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">2</h4>
                    <p className="swiper-slide__paragraph">
                      Daj się ponieść zapachom i poczuj dwa różne zapachy. Co to
                      takiego? Co Ci przypominają te zapachy?
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">1</h4>
                    <p className="swiper-slide__paragraph">
                      Na koniec, opisz smak, jaki aktualnie czujesz na języku
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Zadanie ukończone</h4>
                    <p className="swiper-slide__paragraph">
                      Mam nadzieję, że dzięki temu ćwiczeniu poczułeś się choć
                      trochę spokojniejszy. Jeżeli czujesz taką potrzebę wykonaj
                      zadanie jeszcze raz. Trzymaj się :)
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
                <ProceedButton title="Zakończ" onClick={createFiveToOne} />
              </div>
            </CSSTransition>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FiveToOne;
