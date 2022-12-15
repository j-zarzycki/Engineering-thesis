import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import MainImg from "@Assets/main.png";
import Quote from "@Assets/what.png";
import Walking from "./Walking.component";

const WalkingContainer: React.FC = () => {
  const slideElements = 4;
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(MainImg);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const createWalkingWithNoContent = async () => {
    const currentDateWithTime: String = getFullDateWithTime();
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Spacer")
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

  const createWalkingWithContent = () => {
    dispatch(
      createNote({
        contentName: "Spacer",
        title: "Spacer",
        description: "Co zaobserwowałeś_aś po spacerze? Jak się czułeś_aś?",
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(Number(swiper?.activeIndex));
    if (swiper?.activeIndex === slideElements - 4) {
      setImg(Quote);
    }
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  const onSlideChangeHandler = (slide: SwiperType) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1 || slide?.activeIndex === 2) {
      setImg(Quote);
    }
    if (slide?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  return (
    <Walking
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      setToast={setToast}
      setSwiper={setSwiper}
      onCreateActivityWithNoContent={createWalkingWithNoContent}
      onCreateActivityWithContent={createWalkingWithContent}
      onProceedButtonClick={onProceedButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default React.memo(WalkingContainer);
