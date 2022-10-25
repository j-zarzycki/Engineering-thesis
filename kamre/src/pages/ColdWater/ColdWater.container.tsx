import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper } from "swiper/types";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import SWIPE_ELEMENTS from "@Constants/coldWater.constants";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import ColdWater from "./ColdWater.component";

const ColdWaterContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createColdWaterWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(
        currentDateWithTime,
        "Schłodzenie nadgarstków",
      )
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

  const createColdWaterWithContent = () => {
    dispatch(
      createNote({
        contentName: "Schłodzenie nadgarstków",
        title: "Schłodzenie nadgarstków",
        description:
          "Jake efekty udało Ci się poczuć po użyciu chłodnej wody? Zapisz swoje przemyślenia poniżej.",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (
      slide?.activeIndex === 1 ||
      slide?.activeIndex === 2 ||
      slide?.activeIndex === 3
    ) {
      setImg(quote);
    }
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <ColdWater
      onCreateActivityWithNoContent={createColdWaterWithNoContent}
      onCreateActivityWithContent={createColdWaterWithContent}
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

export default ColdWaterContainer;
