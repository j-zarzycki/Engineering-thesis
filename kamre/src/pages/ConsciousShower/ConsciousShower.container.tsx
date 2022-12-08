import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import MainImg from "@Assets/main.png";
import Question from "@Assets/what.png";
import Rest from "@Assets/rest.png";
import ConsciousShower from "./ConsciousShower.component";

const ConsciousShowerContainer: React.FC = () => {
  const slideElements = 4;
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(MainImg);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const createConsciousShowerWithNoContent = async () => {
    const currentDateWithTime: String = getFullDateWithTime();

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
    setCurrentSlide(Number(swiper?.activeIndex));
  };

  const onSlideChangeHandler = (slide: SwiperType) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1) setImg(Question);
    if (slide?.activeIndex === 2) setImg(Rest);
  };

  return (
    <ConsciousShower
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      setToast={setToast}
      setSwiper={setSwiper}
      onCreateActivityWithNoContent={createConsciousShowerWithNoContent}
      onCreateActivityWithContent={createConsciousShowerWithContent}
      onProceedButtonClick={onProceedButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default React.memo(ConsciousShowerContainer);
