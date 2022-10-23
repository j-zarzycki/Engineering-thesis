import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { CSSTransition } from "react-transition-group";
import "./Emergency.style.scss";
import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import Pet from "@Components/Pet";
import ProceedButton from "@Components/ProceedButton";
import emergencyService from "@Services/emergency.service";

const Emergency: React.FC = () => {
  const [img, setImg] = useState("");
  const [showProceedButton, setShowProceedButton] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setImg(MainImg);
  }, []);

  useEffect(() => {
    // setData([]);
    setIsClicked(false);
    emergencyService().then((res) => {
      setData(res.data.res);
    });
  }, []);

  const adviseContent = async () => {
    await emergencyService().then((res) => {
      setData(res.data.res);
    });
  };

  const changeContent = () => {
    setIsClicked(true);
    adviseContent();
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="emergency ion-padding-top">
          <BackButton defaultHref="/home" />
          <div className="emergency__wrapper">
            <Pet
              src={img}
              alt="Uśmiechnięta ośmiorniczka jpg"
              height="200px"
              paddingTop="20px"
              paddingBottom="20px"
            />
            <div className="swiper-slide__wrapper">
              <h4 className="swiper-slide__header">Szybka Pomoc</h4>
            </div>
            <div className="swiper-slide__wrapper">
              <p className="swiper-slide__paragraph ion-text-center">{data}</p>
            </div>
            <ProceedButton title="Następny" onClick={changeContent} />
          </div>
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
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Emergency;
