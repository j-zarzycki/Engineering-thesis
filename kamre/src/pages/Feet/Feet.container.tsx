import React, { useState } from "react";

import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import Feet from "./Feet.component";

const FeetContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(MainImg);
  const slideElements = 23;

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
  };

  return (
    <Feet
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      onProceedButtonClick={onProceedButtonClick}
    />
  );
};

export default FeetContainer;
