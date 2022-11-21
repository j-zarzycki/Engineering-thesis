import React, { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper } from "swiper/types";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import SWIPE_ELEMENTS from "@Constants/walking.constants";
import MainImg from "@Assets/main.png";
import Question from "@Assets/what.png";
import Rest from "@Assets/rest.png";
import ConsciousShower from "./ConsciousShower.component";

const ConsciousShowerContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const currentDateWithTime: String = getFullDateWithTime();
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const createConsciousShowerWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Świadomy prysznic")
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

  const createConsciousShowerWithContent = () => {
    dispatch(
      createNote({
        contentName: "Świadomy prysznic",
        title: "Świadomy prysznic",
        description: "Co zaobserwowałeś/aś po spacerze? Jak się czułeś/aś?",
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1) setImg(Question);
    if (slide?.activeIndex === 2) setImg(Rest);
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <ConsciousShower
      onCreateActivityWithNoContent={createConsciousShowerWithNoContent}
      onCreateActivityWithContent={createConsciousShowerWithContent}
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

export default React.memo(ConsciousShowerContainer);
