import React, { useEffect, useState } from "react";
import { IonContent, IonPage, useIonAlert } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
// import "swiper/css";

import "./YtPage.style.scss";
import { YTPAGE_URL, SWIPE_ELEMENTS } from "@Constants/ytPage.constants";
import quote from "@Assets/what.png";
import main from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import ProceedButton from "@Components/ProceedButton";
import Pet from "@Components/Pet";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(activityContent: String): Promise<void>;
}

const YtPage: React.FC<IProps> = (props: IProps) => {
  const { onCreateActivityWithNoContent, onCreateActivityWithContent } = props;
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [presentAlert] = useIonAlert();
  const [showProceedButton, setShowProceedButton] = useState(true);
  const slideElements = SWIPE_ELEMENTS;
  const videoUrl = YTPAGE_URL;

  useEffect(() => {
    setImg(quote);
  }, []);
  const onProceedButtonClick = () => {
    swiper?.slideNext();
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(main);
      setShowProceedButton(false);
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
        <div className="edu-video">
          <BackButton defaultHref="/home" />
          <div className="edu-video__wrapper">
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
                    <Pet
                      src={img}
                      alt="Ośmiorniczka ze znakiem zapytania jpg"
                      height="200px"
                      paddingTop="20px"
                      paddingBottom="20px"
                    />
                    <h4 className="swiper-slide__header">Netflix and chill?</h4>
                    <p className="swiper-slide__description">
                      Internet to gigantyczne źródło informacji - czas zrobić z
                      tego pożytek! Usiądź wygodnie, weź popcorn lub lody i
                      obejrzyj krótki film dotyczący stresu. Im więcej się o nim
                      dowiesz tym lepiej będziesz umiał_a z nim walczyć.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <div className="video-container">
                      <iframe
                        className="video-container__embed"
                        src={videoUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      />
                    </div>
                    <p className="swiper-slide__source">
                      Źródło Youtube: Katarzyna Miller - Co z tym stresem?
                    </p>
                    <p className="swiper-slide__description">
                      Pokażę Ci jak krok po kroku zwiększyć świadomość swoich
                      działań w codziennym życiu.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide__wrapper">
                    <Pet
                      src={img}
                      alt="Uśmiechnięta ośmiorniczka jpg"
                      height="200px"
                      paddingTop="20px"
                      paddingBottom="20px"
                    />
                    <h4 className="swiper-slide__header">
                      Gratulacje, udało&nbsp;Ci&nbsp;się!
                    </h4>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="edu-video__buttons">
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

export default YtPage;
