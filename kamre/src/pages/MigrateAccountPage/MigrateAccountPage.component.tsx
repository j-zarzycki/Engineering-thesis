import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  useIonAlert,
  IonCard,
  IonCardHeader,
} from "@ionic/react";
import { CSSTransition } from "react-transition-group";

// Import Swiper styles
import "swiper/css";

import "./MigrateAccountPage.style.scss";
import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import DeleteAccountButton from "@Components/DeleteAccountButton";
import MigrateAccountButton from "@Components/MigrateAccountButton";
import SaveActivityButton from "@Components/SaveActivityButton";
import CancelButton from "@Components/CancelButton";
import Pet from "@Components/Pet";

interface IProps {
  onCreateActivityWithNoContent(): Promise<void>;
  onCreateActivityWithContent(activityContent: String): Promise<void>;
}

const MigrateAccountPage: React.FC<IProps> = (props: IProps) => {
  const { onCreateActivityWithNoContent, onCreateActivityWithContent } = props;
  const [img, setImg] = useState("");
  const [presentAlert] = useIonAlert();
  const [showDeleteAccountButton, setShowDeleteAccountButton] = useState(true);
  const [showMigrateAccountButton, setShowMigrateAccountButton] =
    useState(true);

  useEffect(() => {
    setImg(MainImg);
  }, []);
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
        <div className="migrateaccountpage">
          <BackButton defaultHref="/settings" />
          <div className="migrateaccountpage__wrapper">
            <div className="migrateaccountpage__wrapper_image">
              <Pet
                src={img}
                alt="Uśmiechnięta ośmiorniczka jpg"
                height="200px"
                paddingTop="20px"
                paddingBottom="20px"
              />
            </div>
            <div className="migrateaccountpage__wrapper_content">
              <IonCard>
                <div className="migrateaccountpage__wrapper_content__header">
                  <IonCardHeader>
                    <h2>Przenieś swoje konto</h2>
                    <div className="migrateaccountpage__wrapper_content__header-description">
                      <span className="migrate-code">KOD123</span>
                      <span>
                        Powyższy kod jest ważny 12 godzin i musi być wpisany do
                        nowego urządzenia.
                      </span>
                      <span>Po 12 godzinach pojawi się nowy kod.</span>
                    </div>
                  </IonCardHeader>
                </div>
                <div className="migrateaccountpage__wrapper_content__buttons">
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

export default MigrateAccountPage;
