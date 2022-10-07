import React, { useEffect, useState } from "react";
import { IonContent, IonPage, useIonAlert, IonInput } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./Emergency.style.scss";
import SWIPE_ELEMENTS from "@Constants/emergency.constants";
import HorizontalProgressBar from "@Components/HorizontalProgressBar";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import PhoneIcon from "@Assets/phone-icon.png";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";
import Phone from "@Components/Phone";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(activityContent: String): Promise<void>;
}

const Emergency: React.FC<IProps> = (props: IProps) => {
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
                    <h4 className="swiper-slide__header">Emergency</h4>
                    <p className="swiper-slide__paragraph">
                      <strong>
                        Zadzwoń do bliskiej Ci osoby lub czytaj dalej!
                      </strong>
                    </p>
                    <div className="emergency-phone-container">
                      <a href="tel:+48123456789">
                        <Phone
                          src={PhoneIcon}
                          alt="Ikona telefonu png"
                          height="200px"
                          paddingTop="20px"
                          paddingBottom="20px"
                        />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Nie martw się</h4>
                    <p className="swiper-slide__paragraph">
                      Nigdy nie było ani fizycznego, ani mentalnego ubytku na
                      zdrowiu z powodu ataku paniki.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Zaufanie</h4>
                    <p className="swiper-slide__paragraph">
                      Możesz zaufać swojemu ciału, aby oddychało za Ciebie samo.
                      Odpuść i pozwól mu przejąć kontrolę.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">Równowaga</h4>
                    <p className="swiper-slide__paragraph">
                      Twoje ciało upewni się, że odzyskujesz równowagę oraz
                      spokojny stan bez względu na to jak bardzo umysł
                      próbowałby Cię przekonać, że tak nie jest.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <h4 className="swiper-slide__header">
                      Czy udało Ci się uspokoić?
                    </h4>
                    <IonInput
                      className="emergency-input"
                      type="text"
                      placeholder="Napisz tutaj"
                    />
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

export default Emergency;
