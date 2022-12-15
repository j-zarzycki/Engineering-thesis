import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import MainImg from "@Assets/main.png";
import Question from "@Assets/what.png";
import Happy from "@Assets/happy.png";
import Smile from "@Assets/smile.png";
import Rest from "@Assets/rest.png";
import apiService from "@Services/api.service";
import Feet from "./Feet.component";

const FeetContainer: React.FC = () => {
  const slideElements = 23;
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(MainImg);

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(Number(swiper?.activeIndex));
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(Question);
    if (
      swiper?.activeIndex === 3 ||
      swiper?.activeIndex === 5 ||
      swiper?.activeIndex === 9 ||
      swiper?.activeIndex === 10 ||
      swiper?.activeIndex === 11 ||
      swiper?.activeIndex === 12 ||
      swiper?.activeIndex === 17
    )
      setImg(Smile);
    if (
      swiper?.activeIndex === 4 ||
      swiper?.activeIndex === 6 ||
      swiper?.activeIndex === 8 ||
      swiper?.activeIndex === 12 ||
      swiper?.activeIndex === 14 ||
      swiper?.activeIndex === 16 ||
      swiper?.activeIndex === 21
    )
      setImg(Rest);
    if (swiper?.activeIndex === 7 || swiper?.activeIndex === 18) setImg(Happy);
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
    setCurrentSlide(Number(swiper?.activeIndex));
    setImg(MainImg);
    if (swiper?.activeIndex === 1) {
      setImg(Question);
    }

    if (swiper?.activeIndex === 7) {
      setImg(Happy);
    }
  };

  return (
    <Feet
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

export default React.memo(FeetContainer);
