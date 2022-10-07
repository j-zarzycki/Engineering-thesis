import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import SWIPE_ELEMENTS from "@Constants/music.constants";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import Music from "./Music.component";

const MusicContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [showProceedButton, setShowProceedButton] = useState(true);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createWalkingWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Muzyka klasyczna")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
      })
      .finally(() => {
        setIsLoading(false);
        history.push("/home");
      })
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
  };

  const createWalkingWithContent = () => {
    dispatch(
      createNote({
        contentName: "Muzyka klasyczna",
        title: "Muzyka klasyczna",
        description:
          "Co zaobserwowałeś_aś podczas sesji muzycznej? Jak się czułeś_aś?",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements - 3) {
      setImg(quote);
    }
    if (swiper?.activeIndex === slideElements - 1) {
      setShowProceedButton(false);
      setImg(MainImg);
    }
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <Music
      onCreateActivityWithNoContent={createWalkingWithNoContent}
      onCreateActivityWithContent={createWalkingWithContent}
      onProceedButtonClick={onProceedButtonClick}
      setToast={setToast}
      setSwiper={setSwiper}
      setShowProceedButton={setShowProceedButton}
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      showProceedButton={showProceedButton}
    />
  );
};

export default MusicContainer;
