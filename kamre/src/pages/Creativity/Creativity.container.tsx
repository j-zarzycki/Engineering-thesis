import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper } from "swiper/types";

import { createNote } from "@Store/slices/noteSlice";
import useAppDispatch from "@Hooks/useAppDispatch";
import SWIPE_ELEMENTS from "@Constants/creativity.constants";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import Creativity from "./Creativity.component";

const CreativityContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const slideElements = SWIPE_ELEMENTS;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createCreativityWithContent = () => {
    dispatch(
      createNote({
        contentName: "Mięsień kreatywnośći",
        title: "Mięsień kreatywnośći",
        description: "Wypisz swoje 10 sposóbw na kawę:",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === 1) {
      setImg(quote);
    }
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1) {
      setImg(quote);
    }
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <Creativity
      onCreateActivityWithContent={createCreativityWithContent}
      onProceedButtonClick={onProceedButtonClick}
      setToast={setToast}
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default CreativityContainer;
