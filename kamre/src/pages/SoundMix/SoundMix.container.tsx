import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper } from "swiper/types";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import { SWIPE_ELEMENTS } from "@Constants/soundMix.constatns";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import SoundMix from "./SoundMix.component";

const SoundMixContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();
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
        history.replace("/home");
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

    history.push("/note");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === 1 || swiper?.activeIndex === 2) {
      setImg(quote);
    }
    if (swiper?.activeIndex === 0 || swiper?.activeIndex === 4) {
      setImg(MainImg);
    }
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1 || slide?.activeIndex === 2) {
      setImg(quote);
    }
    if (slide?.activeIndex === 4) {
      setImg(MainImg);
    }
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <SoundMix
      onCreateActivityWithNoContent={createSoundMixWithNoContent}
      onCreateActivityWithContent={createSoundMixWithContent}
      onProceedButtonClick={onProceedButtonClick}
      setToast={setToast}
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default SoundMixContainer;
