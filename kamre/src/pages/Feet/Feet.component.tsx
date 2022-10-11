import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowRepeat } from "react-icons/bs";
// Import Swiper styles
import "swiper/css";

import Pet from "@Components/Pet";
import CancelButton from "@Components/CancelButton";
import VerticalProgressBar from "@Components/VerticalProgressBar";
import ProceedButton from "@Components/ProceedButton";
import BackButton from "@Components/BackButton";

import "./Feet.style.scss";

interface IProps {
  setSwiper(value: any): void;
  onProceedButtonClick(): void;
  handleRepeatButtonClick(): void;
  handleFinishButtonClick(): void;
  onSlideChangeHandler(): void;
  setToast(value: {}): void;
  currentSlide: number;
  slideElements: number;
  img: string;
  swiper: any;
  isLoading: boolean;
  toast: { isOpen: boolean; message: string };
}

const Feet: React.FC<IProps> = (props: IProps) => {
  const {
    setSwiper,
    currentSlide,
    slideElements,
    onProceedButtonClick,
    img,
    swiper,
    handleRepeatButtonClick,
    handleFinishButtonClick,
    setToast,
    onSlideChangeHandler,
    toast,
    isLoading,
  } = props;

  const renderHeader = () => {
    if (swiper?.activeIndex === 22) return null;

    return (
      <div className="walking__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderSwiper = () => {
    return (
      <div className="feet__swiper">
        <Swiper
          direction="vertical"
          effect="fade"
          onSwiper={(swiperData) => setSwiper(swiperData)}
          onSlideChange={onSlideChangeHandler}
          height={260}
          spaceBetween={20}
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
                Zadanie ma na celu odciągnąć twoją uwagę w stresowej sytuacji,
                wykonuj zadania krok po kroku.
                <br />
                Ćwiczenie to jest dobre w każdej sytuacji - nikt nie zauważy, że
                je wykoujesz.
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
    if (swiper?.activeIndex === 22) {
      return (
        <div className="final-buttons">
          <ProceedButton
            title="Powtórz"
            onClick={handleRepeatButtonClick}
            icon={<BsArrowRepeat size={25} />}
          />
          <CancelButton title="Zakończ" onClick={handleFinishButtonClick} />
        </div>
      );
    }

    return (
      <div>
        <ProceedButton title="Dalej!" onClick={onProceedButtonClick} />
      </div>
    );
  };

  const renderImage = () => {
    return (
      <Pet
        src={img}
        alt="Uśmiechnięta ośmiorniczka jpg"
        height="200px"
        paddingTop="20px"
        paddingBottom="20px"
      />
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

  const renderContext = () => {
    return (
      <div className="feet__wrapper">
        {renderImage()}
        {renderSwiper()}
        {renderProceedButton()}
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderToast()}
        {renderLoader()}
        {renderHeader()}
        <div className="feet">
          {renderProgressBar()}
          {renderContext()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feet;
