import React, { useEffect, useState } from "react";
import { useIonRouter } from "@ionic/react";
import { SwiperSlide } from "swiper/react";
import { Swiper as SwiperTypes } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import { createNote } from "@Store/slices/noteSlice";
import apiService from "@Services/api.service";
import Input from "@Components/Input";
import Angry from "@Assets/angry.png";
import Question from "@Assets/what.png";
import useAppDispatch from "@Hooks/useAppDispatch";
import Anger from "./Anger.component";

const AngerContainer: React.FC = () => {
  const slideElements = 3;
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperTypes>();
  const [img, setImg] = useState(Angry);
  const [slidesInputsValue, setSlidesInputsValue] = useState<string[]>([]);
  const [slides, setSlides] = useState<React.ReactElement[]>([]);
  const [slideInputValue, setSlideInputValue] = useState("");
  const [isAddingDisabled, setIsAddingDisabled] = useState(true);
  const [pageController, setPageController] = useState({
    isMainContextVisible: true,
    isAngerListVisible: false,
    isFinalVisible: false,
  });

  const generateKey = () => {
    return `slide_${new Date().getTime()}`;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setSlideInputValue(value);
    setIsAddingDisabled(true);
    if (value.length > 0) setIsAddingDisabled(false);
  };

  const renderSlide = (): React.ReactElement => {
    return (
      <SwiperSlide key={generateKey()}>
        <div className="swiper-slide__wrapper">
          <h4 className="swiper-slide__header">Co Cię złości?:</h4>
          <p className="swiper-slide__paragraph">
            <Input
              type="text"
              placeholder="Wpisz tutaj..."
              onChange={onInputChange}
            />
          </p>
        </div>
      </SwiperSlide>
    );
  };

  const onAddSlide = () => {
    swiper?.slideNext();
    setIsAddingDisabled(true);
    setSlidesInputsValue((prevState) => [...prevState, slideInputValue]);
    setSlides((prevState) => [...prevState, renderSlide()]);
  };

  const onContinueButtonClick = () => {
    setPageController((prevState) => {
      return {
        ...prevState,
        isMainContextVisible: false,
        isAngerListVisible: true,
      };
    });
  };

  const onDestroyButtonClick = () => {
    setPageController({
      isMainContextVisible: false,
      isAngerListVisible: false,
      isFinalVisible: true,
    });
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(Number(swiper?.activeIndex));
    setImg(Angry);

    if (swiper?.activeIndex === 1) setImg(Question);
  };

  const createAngerNoContent = async () => {
    const currentDateWithTime: String = getFullDateWithTime();
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Złość")
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

  const createAngerWithContent = () => {
    dispatch(
      createNote({
        contentName: "Złość",
        title: "Złość",
        description:
          "Przyjmij, że twoja złość, jest dla Ciebie informacją, co Ci w trakcie ćwiczenia powiedziała? ",
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
  };

  const onSlideChangeHandler = () => {
    const swiperActiveIndex = Number(swiper?.activeIndex);
    if (swiperActiveIndex === 1) setImg(Question);
    if (swiperActiveIndex <= 2) setCurrentSlide(swiperActiveIndex);
    if (swiperActiveIndex > 1) swiper!.allowTouchMove = false;
  };

  useEffect(() => {
    setSlides((prevState) => [...prevState, renderSlide()]);
  }, []);

  return (
    <Anger
      isLoading={isLoading}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      slides={slides}
      swiper={swiper}
      toast={toast}
      pageController={pageController}
      slidesInputsValue={slidesInputsValue}
      isAddingDisabled={isAddingDisabled}
      setToast={setToast}
      setSwiper={setSwiper}
      onProceedButtonClick={onProceedButtonClick}
      onAddSlide={onAddSlide}
      onInputChange={onInputChange}
      onContinueButtonClick={onContinueButtonClick}
      onDestroyButtonClick={onDestroyButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
      onCreateActivityWithContent={createAngerWithContent}
      onCreateActivityWithNoContent={createAngerNoContent}
    />
  );
};

export default React.memo(AngerContainer);
