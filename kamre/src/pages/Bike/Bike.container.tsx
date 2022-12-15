import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import MainImg from "@Assets/main.png";
import Smile from "@Assets/smile.png";
import Happy from "@Assets/happy.png";
import Dumb from "@Assets/dumb.png";
import Question from "@Assets/what.png";
import Bike from "./Bike.component";

const BikeContainer: React.FC = () => {
  const slideElements = 5;
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(MainImg);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const createBikeWithNoContent = async () => {
    const currentDateWithTime: String = getFullDateWithTime();
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Jazda na rowerze")
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

  const createBikeWithContent = () => {
    dispatch(
      createNote({
        contentName: "Jazda na rowerze",
        title: "Jazda na rowerze",
        description: "Co zaobserwowałeś_aś po aktywności? Jak się czułeś_aś?",
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
  };

  const onSlideChangeHandler = (slide: SwiperType) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(Smile);
    if (slide?.activeIndex === 2 || slide?.activeIndex === 4) setImg(Question);
    if (slide?.activeIndex === 1) setImg(Happy);
    if (slide?.activeIndex === 3) setImg(Dumb);
  };

  return (
    <Bike
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      onCreateActivityWithNoContent={createBikeWithNoContent}
      onCreateActivityWithContent={createBikeWithContent}
      onProceedButtonClick={onProceedButtonClick}
      setToast={setToast}
      setSwiper={setSwiper}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default React.memo(BikeContainer);
