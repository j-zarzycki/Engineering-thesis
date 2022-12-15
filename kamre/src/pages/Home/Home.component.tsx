import React, { forwardRef } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import { FiMenu, FiSettings } from "react-icons/fi";

import Pet from "@Assets/happy.png";
import RecommendedActivitiesCards from "@Components/RecommendedActivitiesCards";
import Chat from "@Components/Chat";
import AllActivitiesMenuComponent from "@Components/AllActivitiesMenu";
import MessageQuestion from "@Components/Message/MessageQuestion.component";

import "./Home.scss";

interface IProps {
  isActivitiesCardHidden: boolean;
  onSettingsClickHandler(): void;
  onMenuClickHandler(): void;
}

const Home = forwardRef((props: IProps, ref: any) => {
  const { isActivitiesCardHidden, onSettingsClickHandler, onMenuClickHandler } =
    props;

  const {
    recommendedActivitiesCardsRef,
    allActivitiesMenuComponentRef,
    blurbRef,
    contentRef,
  } = ref;

  const renderAllActivitiesMenu = () => {
    return <AllActivitiesMenuComponent ref={allActivitiesMenuComponentRef} />;
  };

  const renderToolbar = () => {
    return (
      <IonHeader>
        <IonToolbar>
          <div className="homepage-toolbar">
            <div className="ion-title">Strona główna</div>
            <IonButtons>
              <FiSettings
                className="setting-button"
                size={25}
                onClick={onSettingsClickHandler}
              />
              <FiMenu
                className="menu-button"
                size={25}
                onClick={onMenuClickHandler}
              />
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>
    );
  };

  const renderBlurb = () => {
    return (
      <IonRow>
        <IonCol ref={blurbRef} className="homepage-header-wrapper">
          <IonRow>
            <IonCol className="homepage__image">
              <div>
                <img src={Pet} alt="pet" />
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="chat">
              <MessageQuestion
                value={
                  "Cześć! \n Przesuń palec w dół aby rozpocząć ze mną czat!"
                }
              />
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
    );
  };

  const renderRecommendedActivitiesCards = () => {
    return <RecommendedActivitiesCards ref={recommendedActivitiesCardsRef} />;
  };

  const renderChat = () => {
    return (
      isActivitiesCardHidden && (
        <Chat isActivitiesCardHidden={isActivitiesCardHidden} />
      )
    );
  };

  const renderContext = () => {
    return (
      <IonContent
        ref={contentRef}
        className="homepage-content"
        fullscreen
        class="ion-padding-horizontal"
        scroll-y="false"
      >
        <div className="homepage">
          <div className="homepage-wrapper">
            <IonGrid>
              {renderBlurb()}
              {renderRecommendedActivitiesCards()}
              {renderChat()}
            </IonGrid>
          </div>
        </div>
      </IonContent>
    );
  };

  return (
    <>
      {renderAllActivitiesMenu()}
      <IonPage>
        {renderToolbar()}
        {renderContext()}
      </IonPage>
    </>
  );
});

export default Home;
