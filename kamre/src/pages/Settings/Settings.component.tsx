import React from "react";
import { IonContent, IonPage, IonCard, IonCardHeader } from "@ionic/react";

import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import DeleteAccountButton from "@Components/DeleteAccountButton";
import MigrateAccountButton from "@Components/MigrateAccountButton";
import Pet from "@Components/Pet";
// import PrivacyPolicyButton from "@Components/PrivacyPolicyButton";

import "swiper/css";
import "./Settings.style.scss";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="settings">
          <div className="settings__header">
            <BackButton />
          </div>
          <div className="settings__wrapper">
            <div className="settings__wrapper_image">
              <Pet
                src={MainImg}
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
                  <MigrateAccountButton
                    defaultHref="/migrateaccountpage"
                    title="Przenieś konto"
                  />

                  <DeleteAccountButton
                    defaultHref="/deleteaccountpage"
                    title="Usuń konto"
                  />

                  {/* <PrivacyPolicyButton
                    defaultHref="/privacypolicy"
                    title="Polityka prywatności"
                  /> */}
                </div>
              </IonCard>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Settings);
