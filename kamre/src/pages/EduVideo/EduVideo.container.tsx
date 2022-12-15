import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { SWIPE_ELEMENTS } from "@Constants/eduVid.constatns";
import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import MainImg from "@Assets/main.png";
import Question from "@Assets/what.png";
import EduVideo from "./EduVideo.component";

const EduVideoContainer: React.FC = () => {
  const slideElements = SWIPE_ELEMENTS;
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(Question);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const createEduVideoWithNoContent = async () => {
    const currentDateWithTime: String = getFullDateWithTime();
    setIsLoading(true);

    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Filmik edukacyjny")
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

  const createEduVideoWithContent = () => {
    dispatch(
      createNote({
        contentName: "Filmik edukacyjny",
        title: "Film edukacyjny",
        description:
          "Co myślisz o obejrzanym filmie? Zapisz przemyślenia poniżej",
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(Number(swiper?.activeIndex));
  };

  const onSlideChangeHandler = (slide: SwiperType) => {
    setCurrentSlide(slide?.activeIndex);
    if (slide?.activeIndex === 2) setImg(MainImg);
  };

  return (
    <EduVideo
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      setToast={setToast}
      setSwiper={setSwiper}
      onCreateActivityWithNoContent={createEduVideoWithNoContent}
      onCreateActivityWithContent={createEduVideoWithContent}
      onProceedButtonClick={onProceedButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default React.memo(EduVideoContainer);
