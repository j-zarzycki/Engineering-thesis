import React from "react";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";

import Pet from "@Components/Pet";
import ProceedButton from "@Components/ProceedButton";
import MainImg from "@Assets/main.png";

import "./Emergency.style.scss";

interface IProps {
  isLoading: boolean;
  emergencyAdviceData: any;
  onNewAdviceClickHandler(): void;
}

const Emergency: React.FC<IProps> = (props: IProps) => {
  const { isLoading, emergencyAdviceData, onNewAdviceClickHandler } = props;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="emergency ion-padding-top">
          <div className="emergency__wrapper">
            <Pet
              src={MainImg}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <div className="emergency__swiper">
              <div className="swiper-slide__wrapper">
                <h4 className="swiper-slide__header">Szybka Pomoc</h4>
              </div>
              <div className="swiper-slide__wrapper">
                <p className="swiper-slide__paragraph ion-text-center">
                  {isLoading ? <IonSpinner name="dots" /> : emergencyAdviceData}
                </p>
              </div>
            </div>
            <ProceedButton title="Następny" onClick={onNewAdviceClickHandler} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Emergency);
