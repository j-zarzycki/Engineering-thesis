/* eslint-disable */
import React, { useState, useEffect } from "react";

import { getFullDateWithTime } from "@Utils/date";
import { MAX_EXHAUST, MAX_INHALATION, MAX_PAUSE } from "@Constants/breathing.constants";
import apiService from "@Services/api.service";
import Breathing from "./Breathing.component";

enum RENDER_TYPE {
  Exhaust = "EXHAUST",
  Pause = "PAUSE",
  Inhale = "INHALE",
  End = "END"
}

const BreathingContainer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [counter, setCounter] = useState(0);
  const [renderType, setRenderType] = useState(RENDER_TYPE.Exhaust);
  let intervalId: any;

  const handleInterval = () => setIsPlaying(true);

  const startCounting = () => {
    switch (renderType) {
      case RENDER_TYPE.Exhaust:
        if (counter === MAX_EXHAUST) {
          clearInterval(intervalId);
          setRenderType(RENDER_TYPE.Pause);
          setCounter(0);
        }

        setCounter((prevCount) => prevCount + 1);
        break;
      case RENDER_TYPE.Pause:
        if (counter === MAX_PAUSE) {
          clearInterval(intervalId);
          setRenderType(RENDER_TYPE.Inhale);
          setCounter(0);
        }

        setCounter((prevCount) => prevCount + 1);
        break;

      case RENDER_TYPE.Inhale:
        if (counter === MAX_INHALATION) {
          clearInterval(intervalId);
          setRenderType(RENDER_TYPE.End);
          setCounter(0);
        }

        setCounter((prevCount) => prevCount + 1);
        break;
      case RENDER_TYPE.End:
        clearInterval(intervalId);
        setIsPlaying(false);
        break;
    }
  };

  const createBreathing = async () => {
    const dateTime = getFullDateWithTime();
    await apiService.CreateActivityWithNoContent(dateTime, "Oddychanie");
  };

  useEffect(() => {
    if (isPlaying) intervalId = setInterval(startCounting, 1000);
    
    return () => clearInterval(intervalId);

  }, [counter, isPlaying, renderType]);

  return (
    <Breathing
      counter={counter}
      handleButtonClick={handleInterval}
      isPlaying={isPlaying}
      createBreathing={createBreathing}
    />
  );
};

export default BreathingContainer;
