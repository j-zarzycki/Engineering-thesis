import React, { useState, useEffect, useRef } from "react";
import {
  useIonRouter,
  useIonViewWillEnter,
  createGesture,
  Gesture,
} from "@ionic/react";

import useLayout from "@Hooks/useLayout";
import Home from "./Home.component";

const HomeContainer: React.FC = () => {
  const { enableTabBar } = useLayout();
  const router = useIonRouter();
  const recommendedActivitiesCardsRef = useRef<any>(null);
  const allActivitiesMenuComponentRef = useRef<HTMLIonMenuElement>(null);
  const blurbRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const [isActivitiesCardHidden, setIsActivitiesCardHidden] = useState(false);

  let numberOfTransform = 0;
  let maxDownTransformValue = 0;

  const onSettingsClickHandler = () => router.push("/settings", "forward");
  const onMenuClickHandler = () =>
    allActivitiesMenuComponentRef.current?.toggle();

  useIonViewWillEnter(() => {
    enableTabBar();
  }, []);

  useEffect(() => {
    const c = recommendedActivitiesCardsRef.current;
    c.style.transform = "translateY(0px)";
    const gesture: Gesture = createGesture({
      el: c,
      gestureName: "my-swipe",
      direction: "y",
      onMove: (event) => {
        c.style.transform = `translateY(${event.deltaY + numberOfTransform}px)`;
      },

      onEnd: () => {
        const blurb = document.querySelector(
          ".homepage-header-wrapper",
        ) as HTMLElement | null;
        const activitiesCardWrapper = document.querySelector(
          ".activities-card__wrapper",
        ) as HTMLElement | null;
        const contentWrapper = document.querySelector(
          ".homepage-content",
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

      onWillStart: async () => {
        c.style.transition = ".2s ease-out";

        const activitiesCardHeight =
          recommendedActivitiesCardsRef.current.offsetHeight;
        const contentWrapper = document.querySelector(
          ".homepage-content",
        ) as HTMLElement | null;
        const contentHeight = contentWrapper!.offsetHeight;
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

        maxDownTransformValue =
          (activitiesCardHeight - contentHeight + blurbHeight) * -1;
      },
    });

    gesture.enable(true);
  }, []);

  const refs: any = {
    recommendedActivitiesCardsRef,
    allActivitiesMenuComponentRef,
    blurbRef,
    contentRef,
  };

  return (
    <Home
      ref={refs}
      isActivitiesCardHidden={isActivitiesCardHidden}
      onSettingsClickHandler={onSettingsClickHandler}
      onMenuClickHandler={onMenuClickHandler}
    />
  );
};

export default HomeContainer;
