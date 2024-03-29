/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback } from "react";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardContent,
  createGesture,
  Gesture,
} from "@ionic/react";
import Pet from "@Assets/happy.png";
import Avatar from "@Assets/image.png";
import ActivitiesCard from "@Components/ActivitiesCard";
import Chat from "@Components/Chat";
import { useHistory, useLocation } from "react-router";
import { FiSettings } from "react-icons/fi";
import MessageQuestion from "@Components/Message/MessageQuestion.component";

const All: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const replaceHistory = useCallback(() => {
    history.replace({ ...location, state: undefined });
  }, [history]);
  const ref = useRef<any>(null);
  const [isActivitiesCardHidden, setIsActivitiesCardHidden] = useState(false);
  let numberOfTransform = 0;
  let maxDownTransformValue = 0;

  const onSettingsClick = () => history.replace("/settings");

  useEffect(() => {
    let c = ref.current;
    c.style.transform = "translateY(0px)";
    const gesture: Gesture = createGesture({
      el: c,
      gestureName: "my-swipe",
      direction: "y",
      onMove: (event) => {
        c.style.transform = `translateY(${event.deltaY + numberOfTransform}px)`;
      },

      onEnd: (event) => {
        const blurb = document.querySelector(
          ".homepage-header-wrapper",
        ) as HTMLElement | null;
        const activitiesCardWrapper = document.querySelector(
          ".activities-card__wrapper",
        ) as HTMLElement | null;
        const contentWrapper = document.querySelector(
          ".all-content",
        ) as HTMLElement | null;
        const contentHeight = contentWrapper!.offsetHeight;
        const activitiesCardWrapperHeight = activitiesCardWrapper!.offsetHeight;
        const blurbHeight = blurb!.offsetHeight;

        const transformData = c.style.transform;
        const numberStart = transformData.indexOf("(");
        const numberEnd = transformData.indexOf("p");
        numberOfTransform = Number(
          transformData.slice(numberStart + 1, numberEnd),
        );
        c.style.transition = ".2s ease-out";

        if (numberOfTransform > 120) {
          setIsActivitiesCardHidden(true);
          if (contentHeight < activitiesCardWrapperHeight) {
            c.style.transform = `translateY(${contentHeight * 0.65}px)`;
          } else {
            c.style.transform = `translateY(${
              activitiesCardWrapperHeight * 0.95
            }px)`;
          }
        }

        if (numberOfTransform < 120 && numberOfTransform > -100) {
          setIsActivitiesCardHidden(false);
          c.style.transform = `translateY(${0}px)`;
        }

        if (numberOfTransform < -100 && numberOfTransform > blurbHeight * -1) {
          c.style.transform = `translateY(${blurbHeight * -1}px)`;
        }

        if (numberOfTransform < blurbHeight * -1) {
          if (contentHeight < activitiesCardWrapperHeight) {
            c.style.transform = `translateY(${numberOfTransform}px)`;
          } else {
            setIsActivitiesCardHidden(false);
            c.style.transform = `translateY(${0}px)`;
          }
        }

        if (numberOfTransform < maxDownTransformValue - 50) {
          if (contentHeight < activitiesCardWrapperHeight) {
            c.style.transform = `translateY(${maxDownTransformValue}px)`;
          }
        }
      },

      onWillStart: async (_details) => {
        c.style.transition = ".2s ease-out";
        let activitiesCardHeight;
        let blurbHeight;
        let contentHeight;

        activitiesCardHeight = ref.current.offsetHeight;
        const contentWrapper = document.querySelector(
          ".all-content",
        ) as HTMLElement | null;
        contentHeight = contentWrapper!.offsetHeight;
        const blurb = document.querySelector(
          ".homepage-header-wrapper",
        ) as HTMLElement | null;
        blurbHeight = blurb!.offsetHeight;

        const transformData = c.style.transform;
        const numberStart = transformData.indexOf("(");
        const numberEnd = transformData.indexOf("p");
        numberOfTransform = Number(
          transformData.slice(numberStart + 1, numberEnd),
        );

        maxDownTransformValue =
          (activitiesCardHeight - contentHeight + blurbHeight) * -1;
      },
    });

    gesture.enable(true);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="homepage-toolbar">
            <div className="ion-title">Strona główna</div>
            <FiSettings size={25} onClick={onSettingsClick} />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className="all-content"
        fullscreen
        class="ion-padding-horizontal"
        scroll-y="false"
      >
        <div className="homepage">
          <div className="homepage-wrapper">
            <IonGrid>
              <IonRow>
                <IonCol className="homepage-header-wrapper">
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
              <ActivitiesCard ref={ref} />
              <Chat isActivitiesCardHidden={isActivitiesCardHidden} />
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(All);
