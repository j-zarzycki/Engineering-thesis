import React from "react";
import { IonPage, IonContent, IonLoading, IonToast } from "@ionic/react";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";

import "./Note.style.scss";

interface IProps {
  title: String;
  description: String;
  hiddenDescription: String;
  isHidden: Boolean;
  isButtonDisabled: boolean;
  isLoading: boolean;
  toast: { isOpen: boolean; message: string };
  handleChevronClick(): void;
  handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  handleSaveButtonClick(): void;
  handleCancelButtonClick(): void;
  setToast(value: { isOpen: boolean; message: string }): void;
}

const Note: React.FC<IProps> = (props: IProps) => {
  const {
    title,
    description,
    hiddenDescription,
    isHidden,
    isButtonDisabled,
    toast,
    isLoading,
    handleChevronClick,
    handleTextAreaChange,
    handleSaveButtonClick,
    handleCancelButtonClick,
    setToast,
  } = props;

  const renderChevronIcon = () => {
    if (!hiddenDescription) return null;
    return isHidden ? (
      <div className="header-note__icon-wrapper">
        <BsChevronCompactDown
          className="header-note__icon"
          size={35}
          onClick={handleChevronClick}
        />
      </div>
    ) : (
      <div className="header-note__icon-wrapper">
        <BsChevronCompactUp
          className="header-note__icon"
          size={35}
          onClick={handleChevronClick}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="note__header">
        <h4>{title || "None"}</h4>
        <p className="header-note__description">{description || "None"}</p>
        <p
          className={`header-note__hidden-description${
            isHidden ? "--isHidden" : ""
          }`}
        >
          {hiddenDescription || "None"}
        </p>
        {renderChevronIcon()}
      </div>
    );
  };

  const renderContext = () => {
    return (
      <div className="note__context">
        <textarea onChange={handleTextAreaChange} />
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="note__buttons">
        <button
          className="buttons-note__cancel"
          type="button"
          onClick={handleCancelButtonClick}
        >
          Anuluj
        </button>
        <button
          className="buttons-note__save"
          type="button"
          onClick={handleSaveButtonClick}
          disabled={isButtonDisabled}
        >
          Zapisz
        </button>
      </div>
    );
  };

  const renderLoader = () => {
    return (
      <IonLoading
        cssClass="note__loader"
        isOpen={isLoading}
        message="Zapisywanie, proszę czekać"
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

  return (
    <IonPage>
      <IonContent
        fullscreen
        class="ion-padding-horizontal ion-padding-vertical"
      >
        <div className="note__wrapper">
          {renderToast()}
          {renderLoader()}
          {renderHeader()}
          {renderContext()}
          {renderButtons()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Note;
