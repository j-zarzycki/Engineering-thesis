import React, { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper } from "swiper/types";

import {
  MAX_EXHAUST,
  MAX_INHALATION,
  MAX_PAUSE,
  SWIPE_ELEMENTS,
} from "@Constants/breathing.constants";
import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Breathing from "./Breathing.component";

enum RenderType {
  EXHAUST = "EXHAUST",
  PAUSE = "PAUSE",
  INHALE = "INHALE",
}

const BreathingContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [counter, setCounter] = useState(0);
  const [renderType, setRenderType] = useState(RenderType.INHALE);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const slideElements = SWIPE_ELEMENTS;

  const router = useIonRouter();
  let intervalId: any;

  const handleInterval = () => setIsPlaying(true);

  const startCounting = () => {
    switch (renderType) {
      case RenderType.EXHAUST:
        if (counter === MAX_EXHAUST) {
          clearInterval(intervalId);
          setRenderType(RenderType.INHALE);
          setCounter(0);
        }

        setCounter((prevCount) => prevCount + 1);
        break;
      case RenderType.PAUSE:
        if (counter === MAX_PAUSE) {
          clearInterval(intervalId);
          setRenderType(RenderType.EXHAUST);
          setIsAnimationPaused(false);
          setCounter(0);
        }

        setCounter((prevCount) => prevCount + 1);
        break;

      case RenderType.INHALE:
        if (counter === MAX_INHALATION) {
          clearInterval(intervalId);
          setRenderType(RenderType.PAUSE);
          setIsAnimationPaused(true);
          setCounter(0);
        }

        setCounter((prevCount) => prevCount + 1);
        break;
      default:
        break;
    }
  };

  const onCancelButtonClick = async () => {
    const currentDateWithTime: String = getFullDateWithTime();
    setIsPlaying(false);
    clearInterval(intervalId);
    setCounter(0);

    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Oddychanie")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/home", "forward", "pop");
      })
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
  };
  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
  };

  useEffect(() => {
    if (isPlaying) intervalId = setInterval(startCounting, 1000);

    return () => clearInterval(intervalId);
  }, [counter, isPlaying, renderType]);

  return (
    <Breathing
      isLoading={isLoading}
      setSwiper={setSwiper}
      swiper={swiper}
      slideElements={slideElements}
      currentSlide={currentSlide}
      onSlideChangeHandler={onSlideChangeHandler}
      onProceedButtonClick={onProceedButtonClick}
      toast={toast}
      renderType={renderType}
      counter={counter}
      handleButtonClick={handleInterval}
      isPlaying={isPlaying}
      isAnimationPaused={isAnimationPaused}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};

export default React.memo(BreathingContainer);
