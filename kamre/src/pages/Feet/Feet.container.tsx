import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Feet from "./Feet.component";

const FeetContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [img, setImg] = useState(MainImg);
  const slideElements = 23;
  const history = useHistory();

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
  };

  const handleRepeatButtonClick = async () => {
    setIsLoading(true);
    const dateTime = getFullDateWithTime();
    setCurrentSlide(0);
    swiper?.slideTo(0);
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

  const handleFinishButtonClick = async () => {
    setIsLoading(true);
    const dateTime = getFullDateWithTime();
    await apiService
      .CreateActivityWithNoContent(dateTime, "Stopy")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
        history.push("/home");
      })
      .finally(() => setIsLoading(false))
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
    history.push("/home");
  };

  return (
    <Feet
      toast={toast}
      setToast={setToast}
      swiper={swiper}
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      isLoading={isLoading}
      onProceedButtonClick={onProceedButtonClick}
      handleRepeatButtonClick={handleRepeatButtonClick}
      handleFinishButtonClick={handleFinishButtonClick}
    />
  );
};

export default FeetContainer;
