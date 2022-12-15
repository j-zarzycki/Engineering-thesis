import React from "react";
import { IonContent, IonPage, IonCard, IonCardHeader } from "@ionic/react";

import BackButton from "@Components/BackButton";
import Pet from "@Components/Pet";
import MainImg from "@Assets/main.png";

import "swiper/css";
import "./PrivacyPolicy.style.scss";

const PrivacyPolicy: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="privacypolicy">
          <div className="privacypolicy__header">
            <BackButton />
          </div>
          <div className="privacypolicy__wrapper">
            <div className="privacypolicy__wrapper_image">
              <Pet
                src={MainImg}
                alt="Uśmiechnięta ośmiorniczka jpg"
                height="200px"
                paddingTop="20px"
                paddingBottom="20px"
              />
            </div>
            <div className="privacypolicy__wrapper_content">
              <IonCard>
                <div className="privacypolicy__wrapper_content__header">
                  <IonCardHeader>
                    <h2>Polityka prywatności</h2>
                    <div className="privacypolicy__wrapper_content__header-description">
                      <span>
                        Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit
                        Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum
                        Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem
                        Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit
                        Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum
                        Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem
                        Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit
                        Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum
                        Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem
                        Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit
                        Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum
                        Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem
                        Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit
                        Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum
                        Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem
                        Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit
                        Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum
                        Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem
                        Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit
                        Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem Lorem Ipsum
                        Dolor Sit Amet Lorem Lorem Ipsum Dolor Sit Amet Lorem
                        Lorem Ipsum Dolor Sit Amet Lorem
                      </span>
                    </div>
                  </IonCardHeader>
                </div>
              </IonCard>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(PrivacyPolicy);
