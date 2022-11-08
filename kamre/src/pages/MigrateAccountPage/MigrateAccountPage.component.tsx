import React from "react";
import { IonContent, IonPage, IonCard, IonCardHeader } from "@ionic/react";

// Import Swiper styles
import "swiper/css";

import "./MigrateAccountPage.style.scss";
import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import Pet from "@Components/Pet";

interface IProps {
  recoveryCode: string;
}

const MigrateAccountPage: React.FC<IProps> = (props: IProps) => {
  const { recoveryCode } = props;

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="migrateaccountpage">
          <BackButton defaultHref="/settings" />
          <div className="migrateaccountpage__wrapper">
            <div className="migrateaccountpage__wrapper_image">
              <Pet
                src={MainImg}
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
                      <span className="migrate-code">{recoveryCode}</span>
                      <span>
                        Powyższy kod jest ważny 12 godzin i musi być wpisany do
                        nowego urządzenia.
                      </span>
                      <span>Po 12 godzinach pojawi się nowy kod.</span>
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

export default MigrateAccountPage;
