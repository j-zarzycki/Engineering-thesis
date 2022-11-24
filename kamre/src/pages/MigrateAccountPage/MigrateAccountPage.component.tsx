import React from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonToast,
} from "@ionic/react";
import { AiFillCopy } from "react-icons/ai";

// Import Swiper styles
import "swiper/css";

import "./MigrateAccountPage.style.scss";
import MainImg from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import Pet from "@Components/Pet";
import ProceedButton from "@Components/ProceedButton";

interface IProps {
  recoveryCode: string;
  toast: { isOpen: boolean; message: string };
  onCopyButtonClickHandler(): void;
  setToast(value: {}): void;
}

const MigrateAccountPage: React.FC<IProps> = (props: IProps) => {
  const { recoveryCode, toast, onCopyButtonClickHandler, setToast } = props;

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

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderToast()}
        <div className="migrateaccountpage">
          <div className="migrateaccountpage__header">
            <BackButton defaultHref="/settings" />
          </div>
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
                <ProceedButton
                  title="Skopiuj"
                  onClick={onCopyButtonClickHandler}
                  icon={<AiFillCopy size={25} />}
                />
              </IonCard>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(MigrateAccountPage);
