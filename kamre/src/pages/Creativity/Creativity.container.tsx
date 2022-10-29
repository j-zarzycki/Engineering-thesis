import React, { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper } from "swiper/types";

import { createNote } from "@Store/slices/noteSlice";
import useAppDispatch from "@Hooks/useAppDispatch";
import SWIPE_ELEMENTS from "@Constants/creativity.constants";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import Creativity from "./Creativity.component";

const CreativityContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState("");
  const [subjectShort, setsubjectShort] = useState("");
  const [subjectLong, setsubjectLong] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const currentDateWithTime: String = getFullDateWithTime();
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const subjects = [
    { shortText: "kawę", longText: "zaparzenie kawy" },
    { shortText: "herbatę", longText: "zaparzenie herbaty" },
    { shortText: "szalik", longText: "ubranie szalika" },
    { shortText: "oszczędności", longText: "zaoszczędzenie pieniędzy" },
    { shortText: "wodę", longText: "zaoszczędzenie wody" },
    {
      shortText: "husteczkę",
      longText: "wykorzystanie husteczki higienicznej",
    },
    { shortText: "słoik", longText: "wykorzystanie słoika" },
    { shortText: "ścianę", longText: "ozdobienie ściany w pokoju" },
    { shortText: "weekend", longText: "spędzenie czasu w weekend" },
    { shortText: "pranie", longText: "zrobienie prania" },
    { shortText: "śrubkę", longText: "wkręcenie śrubki" },
  ];

  const createCreativityWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Mięsień kreatywności")
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

  const createCreativityWithContent = () => {
    dispatch(
      createNote({
        contentName: "Mięsień kreatywności",
        title: "Mięsień kreatywnośći",
        description: `Wypisz swoje 10 sposobów na ${subjectShort}: `,
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === 1) {
      setImg(quote);
    }
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1) {
      setImg(quote);
    }
  };

  const generateSubject = () => {
    const randomIndex = Math.floor(Math.random() * subjects.length);
    const subject = subjects[randomIndex];
    setsubjectShort(subject.shortText);
    setsubjectLong(subject.longText);
  };

  useEffect(() => {
    setImg(MainImg);
    generateSubject();
  }, []);

  return (
    <Creativity
      onGenerateSubject={generateSubject}
      onCreateActivityWithNoContent={createCreativityWithNoContent}
      onCreateActivityWithContent={createCreativityWithContent}
      onProceedButtonClick={onProceedButtonClick}
      setToast={setToast}
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      subjectShort={subjectShort}
      subjectLong={subjectLong}
      slideElements={slideElements}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};
export default CreativityContainer;
