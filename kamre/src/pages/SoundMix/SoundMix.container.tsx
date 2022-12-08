import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { SWIPE_ELEMENTS } from "@Constants/soundMix.constatns";
import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import SoundMix from "./SoundMix.component";

const SoundMixContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(MainImg);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const currentDateWithTime: String = getFullDateWithTime();
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const createSoundMixWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Piosenka")
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

  const createSoundMixWithContent = () => {
    dispatch(
      createNote({
        contentName: "Piosenka",
        title: "Piosenka",
        description: "Zapisz, jakie uczucia wywołała w Tobie piosenka.",
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(Number(swiper?.activeIndex));
    if (swiper?.activeIndex === 1 || swiper?.activeIndex === 2) {
      setImg(quote);
    }
    if (swiper?.activeIndex === 0 || swiper?.activeIndex === 4) {
      setImg(MainImg);
    }
  };

  const onSlideChangeHandler = (slide: SwiperType) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1 || slide?.activeIndex === 2) {
      setImg(quote);
    }
    if (slide?.activeIndex === 4) {
      setImg(MainImg);
    }
  };

  return (
    <SoundMix
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      setToast={setToast}
      setSwiper={setSwiper}
      onCreateActivityWithNoContent={createSoundMixWithNoContent}
      onCreateActivityWithContent={createSoundMixWithContent}
      onProceedButtonClick={onProceedButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default React.memo(SoundMixContainer);
