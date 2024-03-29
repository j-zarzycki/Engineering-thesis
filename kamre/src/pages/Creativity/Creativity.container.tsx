import React, { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { createNote } from "@Store/slices/noteSlice";
import { getFullDateWithTime } from "@Utils/date";
import useAppDispatch from "@Hooks/useAppDispatch";
import MainImg from "@Assets/main.png";
import Question from "@Assets/what.png";
import Think from "@Assets/think.png";
import apiService from "@Services/api.service";
import Creativity from "./Creativity.component";

const CreativityContainer: React.FC = () => {
  const slideElements = 3;
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(Think);
  const [subjectShort, setsubjectShort] = useState("");
  const [subjectLong, setsubjectLong] = useState("");
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const subjects = [
    { shortText: "kawę", longText: "zaparzenie kawy" },
    { shortText: "herbatę", longText: "zaparzenie herbaty" },
    { shortText: "szalik", longText: "ubranie szalika" },
    { shortText: "oszczędności", longText: "zaoszczędzenie pieniędzy" },
    { shortText: "wodę", longText: "zaoszczędzenie wody" },
    {
      shortText: "chusteczkę",
      longText: "wykorzystanie chusteczki higienicznej",
    },
    { shortText: "słoik", longText: "wykorzystanie słoika" },
    { shortText: "ścianę", longText: "ozdobienie ściany w pokoju" },
    { shortText: "weekend", longText: "spędzenie czasu w weekend" },
    { shortText: "pranie", longText: "zrobienie prania" },
    { shortText: "śrubkę", longText: "wkręcenie śrubki" },
  ];

  const createCreativityWithNoContent = async () => {
    const currentDateWithTime: String = getFullDateWithTime();
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
    setCurrentSlide(Number(swiper?.activeIndex));
  };

  const onSlideChangeHandler = (slide: SwiperType) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(Think);
    if (slide?.activeIndex === 1) setImg(Question);
    if (slide?.activeIndex === 2) setImg(MainImg);
  };

  const generateSubject = () => {
    const randomIndex = Math.floor(Math.random() * subjects.length);
    const subject = subjects[randomIndex];
    setsubjectShort(subject.shortText);
    setsubjectLong(subject.longText);
  };

  useEffect(() => {
    generateSubject();
  }, []);

  return (
    <Creativity
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      subjectShort={subjectShort}
      subjectLong={subjectLong}
      slideElements={slideElements}
      setToast={setToast}
      setSwiper={setSwiper}
      onGenerateSubject={generateSubject}
      onCreateActivityWithNoContent={createCreativityWithNoContent}
      onCreateActivityWithContent={createCreativityWithContent}
      onProceedButtonClick={onProceedButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};
export default React.memo(CreativityContainer);
