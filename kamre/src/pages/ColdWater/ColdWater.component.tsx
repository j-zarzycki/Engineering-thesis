import React, { useEffect, useState } from "react";
import { IonContent, IonPage, useIonAlert } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import "./ColdWater.style.scss";
import SWIPE_ELEMENTS from "@Constants/coldWater.constants";
import quote from "@Assets/what.png";
import main from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import Pet from "@Components/Pet";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(activityContent: String): Promise<void>;
}

const ColdWater: React.FC<IProps> = (props: IProps) => {
  const { onCreateActivityWithNoContent, onCreateActivityWithContent } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [presentAlert] = useIonAlert();
  const [showProceedButton, setShowProceedButton] = useState(true);
  const slideElements = SWIPE_ELEMENTS;

  useEffect(() => {
    setImg(main);
  }, []);
  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(main);
      setShowProceedButton(false);
    }
    if (swiper?.activeIndex === slideElements - 3) {
      setImg(quote);
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
        <div className="cold-water">
          <BackButton defaultHref="/home" />
          <div className="cold-water__wrapper">
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
                      Ostudzenie napięcia
                    </h4>
                    <p className="swiper-slide__description">
                      Potrzebujesz szybkiej ulgi? Oto szybka porada jak zmieszyć
                      uczucie stresu wykorzystując chłodną wodę.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Chłodne nadgarstki</h4>
                    <p className="swiper-slide__description">
                      Znajdź najbliższą łazienkę. Odkręć zminą wodę i zmocz nią
                      nadgarstki oddychając równomiernie.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Chłodny kark </h4>
                    <p className="swiper-slide__description">
                      Jeśli uczucie stresu nadal się utrzymuje, spróbuj
                      przyłożyć zmine wilgotne dłonie do karku, cały czas
                      utrzymując spokojny odech.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Jak to działa?</h4>
                    <p className="swiper-slide__description">
                      Poczucie napięcia i nasze fizyczne reakcje są ze sobą
                      ściśle związane. Tak samo jak stres może przyśpieszyć i
                      spłycić nasz oddech, tak nasze świadome spokojne wdechy i
                      wydechy mogą zmiejszyć uczucie stresu. Spróbuj!{" "}
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
            <div className="cold-water__buttons">
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
                  <ProceedButton
                    title="Dodaj przemyślenia"
                    onClick={onProceedButtonClickWithContent}
                  />
                  <ProceedButton
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
export default ColdWater;
