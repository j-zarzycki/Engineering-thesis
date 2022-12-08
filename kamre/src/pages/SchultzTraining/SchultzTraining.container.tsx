import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { SWIPE_ELEMENTS } from "@Constants/schultzTraining.constatns";
import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import SchultzTraining from "./SchultzTraining.component";

const SchultzTrainingContainer: React.FC = () => {
  const slideElements = SWIPE_ELEMENTS;
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const createSchultzTrainingWithNoContent = async () => {
    const currentDateWithTime: String = getFullDateWithTime();

    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Podcast")
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

  const createSchultzTrainingWithContent = () => {
    dispatch(
      createNote({
        contentName: "Podcast",
        title: "Trening Schultza",
        description: "Możesz zapisać swoje przemyślenia na temat treingu.",
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
  };

  return (
    <SchultzTraining
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      slideElements={slideElements}
      setToast={setToast}
      setSwiper={setSwiper}
      onCreateActivityWithNoContent={createSchultzTrainingWithNoContent}
      onCreateActivityWithContent={createSchultzTrainingWithContent}
      onProceedButtonClick={onProceedButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default React.memo(SchultzTrainingContainer);
