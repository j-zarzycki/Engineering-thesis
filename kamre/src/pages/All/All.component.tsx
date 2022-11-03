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
    window.addEventListener("beforeunload", () => replaceHistory);

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
        const blurbHeight = blurb!.offsetHeight;
        const transformData = c.style.transform;
        const numberStart = transformData.indexOf("(");
        const numberEnd = transformData.indexOf("p");
        numberOfTransform = Number(
          transformData.slice(numberStart + 1, numberEnd),
        );
        c.style.transition = ".2s ease-out";

        if (numberOfTransform > 120) {
          c.style.transform = `translateY(${485}px)`;
          setIsActivitiesCardHidden(true);
        }

        if (numberOfTransform < 120 && numberOfTransform > -100) {
          setIsActivitiesCardHidden(false);
          c.style.transform = `translateY(${0}px)`;
        }

        if (numberOfTransform < -100 && numberOfTransform > blurbHeight * -1) {
          c.style.transform = `translateY(${blurbHeight * -1}px)`;
        }

        if (numberOfTransform < blurbHeight * -1) {
          c.style.transform = `translateY(${numberOfTransform}px)`;
        }

        if (numberOfTransform < maxDownTransformValue - 50) {
          c.style.transform = `translateY(${maxDownTransformValue}px)`;
        }
      },

      onWillStart: async (_details) => {
        c.style.transition = ".2s ease-out";
        let activitiesCardHeight;
        let blurbHeight;
        let contentHeight;

        activitiesCardHeight = ref.current.offsetHeight;
        contentHeight = document.querySelector("ion-content")!.offsetHeight;
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

    return () => {
      window.removeEventListener("beforeunload", replaceHistory);
    };
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
      <IonContent fullscreen class="ion-padding-horizontal" scroll-y="false">
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
                      <IonCard class="chat-styles">
                        <IonCardContent class="chat-description">
                          <span>Cześć!</span>
                        </IonCardContent>
                      </IonCard>

                      <IonCard class="chat-styles">
                        <IonCardContent class="chat-description">
                          <span>Co chcesz dziś porobić?</span>
                        </IonCardContent>
                      </IonCard>
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

export default All;
