import React, { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper } from "swiper/types";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import SWIPE_ELEMENTS from "@Constants/walking.constants";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import PrepareMeal from "./PrepareMeal.component";

const PrepareMealContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const currentDateWithTime: String = getFullDateWithTime();
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const createPrepareMealWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(
        currentDateWithTime,
        "Przygotuj coś pysznego",
      )
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

  const createPrepareMealWithContent = () => {
    dispatch(
      createNote({
        contentName: "Przygotuj coś pysznego",
        title: "Przygotuj coś pysznego",
        description: "Co zaobserwowałeś_aś po aktywności? Jak się czułeś_aś?",
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
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
    if (slide?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <PrepareMeal
      onCreateActivityWithNoContent={createPrepareMealWithNoContent}
      onCreateActivityWithContent={createPrepareMealWithContent}
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

export default React.memo(PrepareMealContainer);
