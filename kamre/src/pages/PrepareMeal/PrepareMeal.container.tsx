import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import PrepareMeal from "./PrepareMeal.component";

const PrepareMealContainer: React.FC = () => {
  const slideElements = 4;
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(MainImg);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const createPrepareMealWithNoContent = async () => {
    const currentDateWithTime: String = getFullDateWithTime();
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

    setCurrentSlide(Number(swiper?.activeIndex));
    if (swiper?.activeIndex === slideElements - 4) {
      setImg(quote);
    }
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  const onSlideChangeHandler = (slide: SwiperType) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1 || slide?.activeIndex === 2) {
      setImg(quote);
    }
    if (slide?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

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
