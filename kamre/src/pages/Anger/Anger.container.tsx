import React, { useEffect, useState } from "react";
import { useIonRouter } from "@ionic/react";
import { SwiperSlide } from "swiper/react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Input from "@Components/Input";
import Angry from "@Assets/angry.png";
import Question from "@Assets/what.png";
import { createNote } from "@Store/slices/noteSlice";
import useAppDispatch from "@Hooks/useAppDispatch";
import Anger from "./Anger.component";

const AngerContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(Angry);
  const [slidesInputsValue, setSlidesInputsValue] = useState<string[]>([]);
  const [slides, setSlides] = useState<React.ReactElement[]>([]);
  const [slideInputValue, setSlideInputValue] = useState("");
  const [isAddingDisabled, setIsAddingDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const [pageController, setPageController] = useState({
    isMainContextVisible: true,
    isAngerListVisible: false,
    isFinalVisible: false,
  });
  const router = useIonRouter();
  const slideElements = 3;

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
    setCurrentSlide(swiper?.activeIndex);
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
    if (swiper?.activeIndex === 1) setImg(Question);
    if (swiper?.activeIndex <= 2) setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex > 1) swiper.allowTouchMove = false;
  };

  useEffect(() => {
    setSlides((prevState) => [...prevState, renderSlide()]);
  }, []);

  return (
    <Anger
      isLoading={isLoading}
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      slides={slides}
      swiper={swiper}
      toast={toast}
      pageController={pageController}
      slidesInputsValue={slidesInputsValue}
      setToast={setToast}
      isAddingDisabled={isAddingDisabled}
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

export default AngerContainer;
