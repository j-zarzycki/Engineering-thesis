import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";

import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import happy from "@Assets/happy.png";
import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import FiveToOne from "./FiveToOne.component";

const FiveToOneContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(MainImg);
  const slideElements = 8;
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

  const handleRepeatButtonClick = async () => {
    setIsLoading(true);
    const dateTime = getFullDateWithTime();
    setCurrentSlide(0);
    swiper?.slideTo(0);
    await apiService
      .CreateActivityWithNoContent(dateTime, "5-4-3-2-1")
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

  const handleFinishButtonClick = async () => {
    setIsLoading(true);
    const dateTime = getFullDateWithTime();
    await apiService
      .CreateActivityWithNoContent(dateTime, "5-4-3-2-1")
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
    <FiveToOne
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

export default FiveToOneContainer;
