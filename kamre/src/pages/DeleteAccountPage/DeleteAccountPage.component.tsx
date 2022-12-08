import React from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonLoading,
  IonToast,
} from "@ionic/react";

import { ToastType } from "@Types/toast.type";
import BackButton from "@Components/BackButton";
import ResignDeleteAccountButton from "@Components/ResignDeleteAccountButton";
import FinalDeleteAccountButton from "@Components/FinalDeleteAccountButton";
import Pet from "@Components/Pet";

import "swiper/css";
import "./DeleteAccountPage.style.scss";

interface IProps {
  isLoading: boolean;
  toast: ToastType;
  img: string;
  showMigrateAccountButton: boolean;
  showDeleteAccountButton: boolean;
  onDeleteClick(): void;
  setToast(toast: ToastType): void;
}

const DeleteAccountPage: React.FC<IProps> = (props: IProps) => {
  const {
    isLoading,
    toast,
    img,
    showMigrateAccountButton,
    showDeleteAccountButton,
    onDeleteClick,
    setToast,
  } = props;

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="deleteaccountpage__loader"
        isOpen={isLoading}
        message="Usuwanie, proszę czekać"
      />
    );
  };

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
    return (
      <div className="deleteaccountpage__header">
        <BackButton />
      </div>
    );
  };

  const renderImage = () => {
    return (
      <div className="deleteaccountpage__wrapper_image">
        <Pet
          src={img}
          alt="Smutna ośmiorniczka jpg"
          height="200px"
          paddingTop="20px"
          paddingBottom="20px"
        />
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="deleteaccountpage__wrapper_content__buttons">
        {showMigrateAccountButton && (
          <ResignDeleteAccountButton title="Zrezygnuj" />
        )}
        {showDeleteAccountButton && (
          <FinalDeleteAccountButton
            onClick={onDeleteClick}
            title="Usuń konto"
          />
        )}
      </div>
    );
  };

  const renderContext = () => {
    return (
      <div className="deleteaccountpage__wrapper_content">
        <IonCard>
          <div className="deleteaccountpage__wrapper_content__header">
            <IonCardHeader>
              <h2>Potwierdź usunięcie konta</h2>
              <div className="deleteaccountpage__wrapper_content__header-description">
                <span>Czy na pewno chcesz usunąć konto?</span>
              </div>
            </IonCardHeader>
          </div>
          {renderButtons()}
        </IonCard>
      </div>
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderLoader()}
        {renderToast()}
        <div className="deleteaccountpage">
          {renderHeader()}
          <div className="deleteaccountpage__wrapper">{renderImage()}</div>
          {renderContext()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(DeleteAccountPage);
