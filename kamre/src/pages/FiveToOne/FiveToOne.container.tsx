import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import MainImg from "@Assets/main.png";
import Question from "@Assets/what.png";
import Happy from "@Assets/happy.png";
import Think from "@Assets/think.png";
import apiService from "@Services/api.service";
import FiveToOne from "./FiveToOne.component";

const FiveToOneContainer: React.FC = () => {
  const slideElements = 8;
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(MainImg);

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(Number(swiper?.activeIndex));
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
    setCurrentSlide(Number(swiper?.activeIndex));
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(Question);
    if (swiper?.activeIndex === 4) setImg(Think);
    if (swiper?.activeIndex === 7) setImg(Happy);
  };

  return (
    <FiveToOne
      swiper={swiper}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      isLoading={isLoading}
      toast={toast}
      setSwiper={setSwiper}
      setToast={setToast}
      onProceedButtonClick={onProceedButtonClick}
      handleRepeatButtonClick={handleRepeatButtonClick}
      handleFinishButtonClick={handleFinishButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default React.memo(FiveToOneContainer);
