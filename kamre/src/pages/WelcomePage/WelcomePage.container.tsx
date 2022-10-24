import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper } from "swiper/types";

import { createNote } from "@Store/slices/noteSlice";
import useAppDispatch from "@Hooks/useAppDispatch";
import SWIPE_ELEMENTS from "@Constants/walking.constants";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import WelcomePage from "./WelcomePage.component";

const WelcomePageContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createWelcomePageWithContent = () => {
    dispatch(
      createNote({
        contentName: "Strona powitalna",
        title: "Strona powitalna",
        description: "Przejdź do strony głównej lub przywróć dane",
        hiddenDescription: "",
      }),
    );
    // przeniesienie po nacisnieciu buttona przywroc dane
    history.replace("/home");
  };

  const onStartButtonClick = () => {
    localStorage.setItem("isFirstStart", "false");
    history.push("/home");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements - 4) {
      setImg(quote);
    }
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1 || slide?.activeIndex === 2) {
      setImg(quote);
    }
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <WelcomePage
      onStartButtonClick={onStartButtonClick}
      onCreateActivityWithContent={createWelcomePageWithContent}
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

export default WelcomePageContainer;
