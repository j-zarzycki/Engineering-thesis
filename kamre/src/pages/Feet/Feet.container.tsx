import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";

import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import happy from "@Assets/happy.png";
import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import Feet from "./Feet.component";

const FeetContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(MainImg);
  const slideElements = 23;
  const router = useIonRouter();

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
    if (swiper?.activeIndex === 7) {
      setImg(happy);
    }
  };

  const createFeetNoContent = async () => {
    setIsLoading(true);
    const dateTime = getFullDateWithTime();
    await apiService
      .CreateActivityWithNoContent(dateTime, "Stopy")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
      })
      .finally(() => setIsLoading(false))
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
  };

  const handleRepeatButtonClick = async () => {
    setCurrentSlide(0);
    swiper?.slideTo(0);
    createFeetNoContent();
  };

  const handleFinishButtonClick = async () => {
    createFeetNoContent();
    router.push("/home", "forward", "pop");
  };

  const onSlideChangeHandler = () => {
    setCurrentSlide(swiper?.activeIndex);
    setImg(MainImg);
    if (swiper?.activeIndex === 1) {
      setImg(quote);
    }

    if (swiper?.activeIndex === 7) {
      setImg(happy);
    }
  };

  return (
    <Feet
      setSwiper={setSwiper}
      swiper={swiper}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      isLoading={isLoading}
      toast={toast}
      setToast={setToast}
      onProceedButtonClick={onProceedButtonClick}
      handleRepeatButtonClick={handleRepeatButtonClick}
      handleFinishButtonClick={handleFinishButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default FeetContainer;
