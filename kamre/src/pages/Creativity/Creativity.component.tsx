import React, { useEffect, useState } from "react";
import { IonContent, IonPage, useIonAlert } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./Creativity.style.scss";
import SWIPE_ELEMENTS from "@Constants/creativity.constants";
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

const Creativity: React.FC<IProps> = (props: IProps) => {
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
        <div className="sound-mix">
          <BackButton defaultHref="/home" />
          <div className="sound-mix__wrapper">
            <Pet
              src={img}
              alt="Ośmiorniczka ze znakiem zapytania jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <HorizontalProgressBar
              currentElement={currentSlide}
              elements={slideElements}
            />
            ;
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
                    <h4 className="swiper-slide__header">Muzyka dla duszy</h4>
                    <p className="swiper-slide__description">
                      Muzyka jest jedną z najlepszych rzeczy dla serca i duszy -
                      pomaga łagodzić ból, poprawia nastrój i budzi w nas
                      pozytywne emocje. W skrócie, czyni nas szczęśliwszymi!
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      O co chodzi w ćwiczeniu?
                    </h4>
                    <p className="swiper-slide__description">
                      Puść swoją ulubioną piosenkę lub playlistę! Oglądałeś
                      Stranger Thnigs? Czas otwórzyć własny magiczny portal i
                      uciec w przyjemniejsze miejsce. Spróbuj poczuć muzykę,
                      każde jej brzmienie. Jeśli masz ochotę, rozluźnij mięśnie
                      i zacznij poruszać w rytm muzyki. Poczuj napływ endorfin!
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <p className="swiper-slide__description">
                      Szukasz muzycznych inspiracji? Sprawdź naszą playlistę!
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      Gratulacje, udało&nbsp;Ci&nbsp;się!
                    </h4>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="sound-mix__buttons">
              {showProceedButton && (
                <ProceedButton title="Dalej" onClick={onProceedButtonClick} />
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
                  <CancelButton
                    title="Dodaj przemyślenia"
                    onClick={onProceedButtonClickWithContent}
                  />
                  <SaveActivityButton
                    title="Zakończ"
                    onClick={onCreateActivityWithNoContent}
                  />
                </div>
              </CSSTransition>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Creativity;
