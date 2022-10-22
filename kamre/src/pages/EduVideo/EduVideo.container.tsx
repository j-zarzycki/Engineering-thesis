import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper } from "swiper/types";

import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import useAppDispatch from "@Hooks/useAppDispatch";
import { SWIPE_ELEMENTS } from "@Constants/eduVid.constatns";
import MainImg from "@Assets/main.png";
import EduVideo from "./EduVideo.component";

const EduVideoContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const currentDateWithTime: String = getFullDateWithTime();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const createEduVideoWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Edu Video")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
      })
      .finally(() => {
        setIsLoading(false);
        history.replace("/home");
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
        contentName: "Edu Video",
        title: "Film edukacyjny",
        description:
          "Co myślisz o obejrzanym filmie? Zapisz przemyślenia poniżej",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(swiper?.activeIndex);
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
  };

  useEffect(() => {
    setImg(MainImg);
  }, []);

  return (
    <EduVideo
      onCreateActivityWithNoContent={createEduVideoWithNoContent}
      onCreateActivityWithContent={createEduVideoWithContent}
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

export default EduVideoContainer;
