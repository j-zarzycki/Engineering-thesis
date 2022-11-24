import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonCard, IonCardHeader } from "@ionic/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./PrivacyPolicy.style.scss";
import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import DeleteAccountButton from "@Components/DeleteAccountButton";
import MigrateAccountButton from "@Components/MigrateAccountButton";
import Pet from "@Components/Pet";

const PrivacyPolicy: React.FC = () => {
  const [img, setImg] = useState("");

  const [showDeleteAccountButton, setShowDeleteAccountButton] = useState(true);
  const [showMigrateAccountButton, setShowMigrateAccountButton] =
    useState(true);

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="privacypolicy">
          <div className="privacypolicy__header">
            <BackButton defaultHref="/settings" />
          </div>
          <div className="privacypolicy__wrapper">
            <div className="privacypolicy__wrapper_image">
              <Pet
                src={img}
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
                <div className="privacypolicy__wrapper_content__buttons">
                  {showMigrateAccountButton && (
                    <MigrateAccountButton
                      defaultHref="/migrateaccountpage"
                      title="Migrate Account"
                    />
                  )}
                  {showDeleteAccountButton && (
                    <DeleteAccountButton
                      defaultHref="/deleteaccountpage"
                      title="Delete Account"
                    />
                  )}
                </div>
              </IonCard>
            </div>

            <CSSTransition
              in={!showDeleteAccountButton}
              timeout={300}
              classNames="swiper__delete-account-buttons"
              unmountOnExit
              onEnter={() => setShowDeleteAccountButton(false)}
              onExited={() => setShowDeleteAccountButton(true)}
            />

            <CSSTransition
              in={!showMigrateAccountButton}
              timeout={300}
              classNames="swiper__migrate-account-buttons"
              unmountOnExit
              onEnter={() => setShowMigrateAccountButton(false)}
              onExited={() => setShowMigrateAccountButton(true)}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(PrivacyPolicy);
