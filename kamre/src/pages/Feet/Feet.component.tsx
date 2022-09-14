import React from "react";
import { IonContent, IonPage, IonImg } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import BackButton from "@Components/BackButton";
import VerticalProgressBar from "@Components/VerticalProgressBar";

import ProceedButton from "@Components/ProceedButton";

import "./Feet.style.scss";

interface IProps {
  setSwiper(value: any): void;
  onProceedButtonClick(): void;
  currentSlide: number;
  slideElements: number;
  img: string;
}

const Feet: React.FC<IProps> = (props: IProps) => {
  const { setSwiper, currentSlide, slideElements, onProceedButtonClick, img } =
    props;

  const renderHeader = () => {
    return (
      <div className="feet__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="feet__swiper">
        <Swiper
          allowTouchMove={false}
          effect="fade"
          slidesPerView={1}
          height={190}
          onSwiper={(swiperData) => setSwiper(swiperData)}
        >
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Stopy</h4>
              <p className="swiper-slide__paragraph">
                Niewidoczny trening uważnościowy w każdej sytuacji
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">O co chodzi w ćwiczeniu?</h4>
              <p className="swiper-slide__paragraph">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Prawa stopa</h4>
              <p className="swiper-slide__paragraph">
                skieruj uwagę na prawą stopę, poruszaj palcami - czy palce mają
                przestrzeń czy jednak czujesz opór.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Prawa stopa</h4>
              <p className="swiper-slide__paragraph">
                dociskaj podłoże palcami, poczuj jakie partie mięśni się
                napinają, jakie to uczucie?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Prawa stopa</h4>
              <p className="swiper-slide__paragraph">Rozluźnij mięśnie</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Prawa stopa</h4>
              <p className="swiper-slide__paragraph">
                Przenieś ciężar na pięte, poczuj jak mięśnie się napinają, czy
                to te same, czy inne?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Prawa stopa</h4>
              <p className="swiper-slide__paragraph">Rozluźnij mięśnie</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Prawa stopa</h4>
              <p className="swiper-slide__paragraph">
                Teraz przenieś ciężar na całą prawą stopę, co teraz czujesz? W
                której pozycji czułeś się najlepiej?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Prawa stopa</h4>
              <p className="swiper-slide__paragraph">Rozluźnij mięśnie</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lewa stopa</h4>
              <p className="swiper-slide__paragraph">
                Teraz przejdźmy przez to samo z lewą stopą
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lewa stopa</h4>
              <p className="swiper-slide__paragraph">
                skieruj uwagę na lewą stopę, poruszaj palcami - czy palce mają
                przestrzeń czy jednak czujesz opór.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lewa stopa</h4>
              <p className="swiper-slide__paragraph">
                dociskaj podłoże palcami, poczuj jakie partie mięśni się
                napinają, jakie to uczucie?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lewa stopa</h4>
              <p className="swiper-slide__paragraph">Rozluźnij mięśnie</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lewa stopa</h4>
              <p className="swiper-slide__paragraph">
                Przenieś ciężar na pięte, poczuj jak mięśnie się napinają, czy
                to te same, czy inne?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lewa stopa</h4>
              <p className="swiper-slide__paragraph">Rozluźnij mięśnie</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lewa stopa</h4>
              <p className="swiper-slide__paragraph">
                Teraz przenieś ciężar na całą lewą stopę, co teraz czujesz? W
                której pozycji czułeś się najlepiej?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Lewa stopa</h4>
              <p className="swiper-slide__paragraph">Rozluźnij mięśnie</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Razem</h4>
              <p className="swiper-slide__paragraph">
                Teraz skup się na oby dwóch stopach
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Razem</h4>
              <p className="swiper-slide__paragraph">
                Przenieś ciężar na palce - czy teraz czujesz że pracują inne
                mięśnie niż poprzednio?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Razem</h4>
              <p className="swiper-slide__paragraph">
                Przenieś ciężar na pięty - jak teraz się czujesz?
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Razem</h4>
              <p className="swiper-slide__paragraph">
                Dociskaj podłożę całymi stopami
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Razem</h4>
              <p className="swiper-slide__paragraph">Rozlużnij mięśnie</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Koniec</h4>
              <p className="swiper-slide__paragraph">
                Stosuj to ćwiczenie tak długo jak chcesz z tyloma powtórzeniami
                ile potrzebujesz
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };

  const renderProgressBar = () => {
    return (
      <div className="vertical-progress-bar__wrapper">
        <VerticalProgressBar
          currentElement={currentSlide}
          elements={slideElements}
        />
      </div>
    );
  };

  const renderProceedButton = () => {
    return <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />;
  };

  const renderImage = () => {
    return <IonImg className="feet__image" alt="pet" src={img} />;
  };

  const renderContext = () => {
    return (
      <div className="feet__context">
        {renderImage()}
        {renderSwiper()}
        {renderProceedButton()}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        class="ion-padding-horizontal ion-padding-vertical"
      >
        {renderHeader()}
        <div className="feet__wrapper">
          {renderProgressBar()}
          {renderContext()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feet;
