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
import PetWhat from "@Assets/what.png";
import PetMain from "@Assets/main.png";
import BackButton from "@Components/BackButton";
import Pet from "@Components/Pet";
import ProceedButton from "@Components/ProceedButton";

interface IProps {
  recoveryCode: string;
  toast: { isOpen: boolean; message: string };
  pageController: {
    isWarningPageVisible: boolean;
    isMigrationPageVisible: boolean;
  };
  onCopyButtonClickHandler(): void;
  onAcceptWarningClickHandler(): void;
  setToast(value: {}): void;
}

const MigrateAccountPage: React.FC<IProps> = (props: IProps) => {
  const {
    pageController,
    recoveryCode,
    toast,
    onCopyButtonClickHandler,
    onAcceptWarningClickHandler,
    setToast,
  } = props;

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

  const renderHeader = () => {
    const { isMigrationPageVisible } = pageController;

    if (isMigrationPageVisible)
      return <div className="migrateaccountpage__header" />;

    return (
      <div className="migrateaccountpage__header">
        <BackButton defaultHref="/home" />
      </div>
    );
  };

  const renderPetImage = () => {
    const { isWarningPageVisible } = pageController;
    return (
      <div className="migrateaccountpage__wrapper_image">
        <Pet
          src={isWarningPageVisible ? PetWhat : PetMain}
          alt="Uśmiechnięta ośmiorniczka jpg"
          height="200px"
          paddingTop="20px"
          paddingBottom="20px"
        />
      </div>
    );
  };

  const renderContext = () => {
    const { isWarningPageVisible } = pageController;
    if (isWarningPageVisible) {
      return (
        <IonCard className="migrateaccountpage__warning">
          <div className="migrateaccountpage__wrapper_content__header">
            <IonCardHeader>
              <h2>Czy na pewno chcesz przenieść swoje konto?</h2>
              <div className="migrateaccountpage__wrapper_content__header-description">
                <span>
                  Ten proces spowoduje przeniesienie bieżących danych na nowe
                  urządzenie, przy czym obecne, nie będzie mieć do nich dostęp.
                </span>
              </div>
            </IonCardHeader>
          </div>
          <ProceedButton title="Dalej!" onClick={onAcceptWarningClickHandler} />
        </IonCard>
      );
    }

    return (
      <IonCard className="migrateaccountpage__migrate">
        <div className="migrateaccountpage__wrapper_content__header">
          <IonCardHeader>
            <h2>Przenieś swoje konto</h2>
            <div className="migrateaccountpage__wrapper_content__header-description">
              <span className="migrate-code">{recoveryCode}</span>
              <span>
                Powyższy kod jest ważny 12 godzin i musi być wpisany do nowego
                urządzenia. Po jego skopiowaniu przeniesiemy Cię na ekran
                startowy.
              </span>
            </div>
          </IonCardHeader>
        </div>
        <ProceedButton
          title="Skopiuj"
          onClick={onCopyButtonClickHandler}
          icon={<AiFillCopy size={25} />}
        />
      </IonCard>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderToast()}
        <div className="migrateaccountpage">
          {renderHeader()}
          <div className="migrateaccountpage__wrapper">
            {renderPetImage()}
            <div className="migrateaccountpage__wrapper_content">
              {renderContext()}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(MigrateAccountPage);
