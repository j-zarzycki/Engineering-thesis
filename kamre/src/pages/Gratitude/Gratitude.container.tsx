import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getFullDateWithTime } from "@Utils/date";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import apiService from "@Services/api.service";
import Gratitude from "./Gratitude.component";

const GratitudeContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(MainImg);
  const slideElements = 2;
  const history = useHistory();

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
  };

  const onHandleFinishClick = async () => {
    const dateTime = getFullDateWithTime();
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(dateTime, "Wdzięczność")
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
  };

  return (
    <Gratitude
      isLoading={isLoading}
      toast={toast}
      setToast={setToast}
      swiper={swiper}
      onHandleFinishClick={onHandleFinishClick}
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      onProceedButtonClick={onProceedButtonClick}
    />
  );
};

export default GratitudeContainer;
