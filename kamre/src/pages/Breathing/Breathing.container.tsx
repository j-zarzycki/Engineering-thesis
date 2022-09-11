import React, { useState, useEffect } from "react";

import {
  MAX_EXHAUST,
  MAX_INHALATION,
  MAX_PAUSE,
} from "@Constants/breathing.constants";
import Breathing from "./Breathing.component";

enum RenderType {
  EXHAUST = "EXHAUST",
  PAUSE = "PAUSE",
  INHALE = "INHALE",
}

const BreathingContainer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [counter, setCounter] = useState(0);
  const [renderType, setRenderType] = useState(RenderType.EXHAUST);
  let intervalId: any;

  const handleInterval = () => setIsPlaying(true);

  const startCounting = () => {
    switch (renderType) {
      case RenderType.EXHAUST:
        if (counter === MAX_EXHAUST) {
          clearInterval(intervalId);
          setRenderType(RenderType.PAUSE);
          setCounter(0);
        }

        setCounter((prevCount) => prevCount + 1);
        break;
      case RenderType.PAUSE:
        if (counter === MAX_PAUSE) {
          clearInterval(intervalId);
          setRenderType(RenderType.INHALE);
          setCounter(0);
        }

        setCounter((prevCount) => prevCount + 1);
        break;

      case RenderType.INHALE:
        if (counter === MAX_INHALATION) {
          clearInterval(intervalId);
          setRenderType(RenderType.EXHAUST);
          setCounter(0);
          setIsPlaying(false);
        }

        setCounter((prevCount) => prevCount + 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isPlaying) intervalId = setInterval(startCounting, 1000);

    return () => clearInterval(intervalId);
  }, [counter, isPlaying, renderType]);

  return (
    <Breathing
      renderType={renderType}
      counter={counter}
      handleButtonClick={handleInterval}
      isPlaying={isPlaying}
    />
  );
};

export default BreathingContainer;
