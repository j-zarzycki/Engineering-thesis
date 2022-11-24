import React, { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper } from "swiper/types";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = 5;
  const currentDateWithTime: String = getFullDateWithTime();
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const createBikeWithNoContent = async () => {
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

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(Smile);
    if (slide?.activeIndex === 2 || slide?.activeIndex === 4) setImg(Question);
    if (slide?.activeIndex === 1) setImg(Happy);
    if (slide?.activeIndex === 3) setImg(Dumb);
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <Bike
      onCreateActivityWithNoContent={createBikeWithNoContent}
      onCreateActivityWithContent={createBikeWithContent}
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

export default React.memo(BikeContainer);
