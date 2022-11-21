import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonCard, IonCardHeader } from "@ionic/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./Settings.style.scss";
import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import DeleteAccountButton from "@Components/DeleteAccountButton";
import MigrateAccountButton from "@Components/MigrateAccountButton";
import PrivacyPolicyButton from "@Components/PrivacyPolicyButton";
import Pet from "@Components/Pet";

const Settings: React.FC = () => {
  const [img, setImg] = useState("");
  const [showDeleteAccountButton, setShowDeleteAccountButton] = useState(true);
  const [showMigrateAccountButton, setShowMigrateAccountButton] =
    useState(true);
  const [showPrivacyPolicyButton, setShowPrivacyPolicyButton] = useState(true);

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="settings">
          <BackButton defaultHref="/home" />
          <div className="settings__wrapper">
            <div className="settings__wrapper_image">
              <Pet
                src={img}
                alt="Uśmiechnięta ośmiorniczka jpg"
                height="200px"
                paddingTop="20px"
                paddingBottom="20px"
              />
            </div>
            <div className="settings__wrapper_content">
              <IonCard>
                <div className="settings__wrapper_content__header">
                  <IonCardHeader>
                    <h2>Ustawienia</h2>
                  </IonCardHeader>
                </div>
                <div className="settings__wrapper_content__buttons">
                  {showMigrateAccountButton && (
                    <MigrateAccountButton
                      defaultHref="/migrateaccountpage"
                      title="Przenieś konto"
                    />
                  )}
                  {showDeleteAccountButton && (
                    <DeleteAccountButton
                      defaultHref="/deleteaccountpage"
                      title="Usuń konto"
                    />
                  )}
                  {showPrivacyPolicyButton && (
                    <PrivacyPolicyButton
                      defaultHref="/privacypolicy"
                      title="Polityka prywatności"
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
            <CSSTransition
              in={!showPrivacyPolicyButton}
              timeout={300}
              classNames="swiper__privacy-policy-buttons"
              unmountOnExit
              onEnter={() => setShowPrivacyPolicyButton(false)}
              onExited={() => setShowPrivacyPolicyButton(true)}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Settings);
