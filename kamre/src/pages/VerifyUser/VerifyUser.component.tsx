import React from "react";
import { IonContent, IonPage, IonLoading, IonToast } from "@ionic/react";

import { ToastType } from "@Types/toast.type";

interface IProps {
  isLoading: boolean;
  toast: ToastType;
  setToast(toast: ToastType): void;
}

const VerifyUser: React.FC<IProps> = (props: IProps) => {
  const { isLoading, toast, setToast } = props;

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

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="verify-user__loader"
        isOpen={isLoading}
        message="Trwa uwierzytelnianie, proszę czekać"
      />
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        {renderToast()}
        {renderLoader()}
      </IonContent>
    </IonPage>
  );
};

export default VerifyUser;
