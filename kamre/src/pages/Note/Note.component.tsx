import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";

import "./Note.style.scss";

interface IProps {
  title: String;
  description: String;
  hiddenDescription: String;
  isHidden: Boolean;
  isButtonDisabled: boolean;
  handleChevronClick(): void;
  handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  handleSaveButtonClick(): void;
  handleCancelButtonClick(): void;
}

const Note: React.FC<IProps> = (props: IProps) => {
  const {
    title,
    description,
    hiddenDescription,
    isHidden,
    isButtonDisabled,
    handleChevronClick,
    handleTextAreaChange,
    handleSaveButtonClick,
    handleCancelButtonClick,
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
  return (
    <IonPage>
      <IonContent
        fullscreen
        class="ion-padding-horizontal ion-padding-vertical"
      >
        <div className="note__wrapper">
          {renderHeader()}
          {renderContext()}
          {renderButtons()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Note;
