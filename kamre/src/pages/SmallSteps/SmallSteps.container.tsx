import React, { useEffect, useState } from "react";
import { useIonRouter } from "@ionic/react";
import { SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Input from "@Components/Input";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import GoodWord from "./SmallSteps.component";

const SmallStepsContainer: React.FC = () => {
  const router = useIonRouter();
  const slideElements = 3;
  const [canSwipe, setCanSwipe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [img, setImg] = useState(MainImg);
  const [slides, setSlides] = useState<React.ReactElement[]>([]);
  const [slideInputValue, setSlideInputValue] = useState("");
  const [slidesInputsValue, setSlidesInputsValue] = useState<string[]>([]);
  const [isAddingDisabled, setIsAddingDisabled] = useState(true);
  const [pageController, setPageController] = useState({
    isMainContextVisible: true,
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
          <h4 className="swiper-slide__header">Jestem z siebie dumny, bo:</h4>
          <p className="swiper-slide__paragraph">
            <Input
              type="text"
              placeholder="Wpisz coś miłego..."
              onChange={onInputChange}
            />
          </p>
        </div>
      </SwiperSlide>
    );
  };

  const onAddSlide = () => {
    setCanSwipe(false);
    swiper?.slideNext();
    setIsAddingDisabled(true);
    setSlidesInputsValue((prevState) => [...prevState, slideInputValue]);
    setSlides((prevState) => [...prevState, renderSlide()]);
  };

  const onContinueButtonClick = () =>
    setPageController({ isMainContextVisible: false, isFinalVisible: true });

  const onSaveActivityWithContent = async () => {
    if (slideInputValue.length > 0) {
      setSlidesInputsValue((prevState) => [...prevState, slideInputValue]);
    }
    const currentDate = getFullDateWithTime();
    setIsLoading(true);
    await apiService
      .CreateActivityWithContent(currentDate, slidesInputsValue, "Małe kroki")
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

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    if (Number(swiper?.activeIndex) < 2)
      setCurrentSlide(Number(swiper?.activeIndex));

    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
  };

  const onSwipeHandle = () => {
    if (swiper?.activeIndex === 1) setImg(quote);
    if (Number(swiper?.activeIndex) <= 2)
      setCurrentSlide(Number(swiper?.activeIndex));
    if (Number(swiper?.activeIndex) > 1) swiper!.allowTouchMove = false;
  };

  useEffect(() => {
    setSlides((prevState) => [...prevState, renderSlide()]);
  }, []);

  return (
    <GoodWord
      pageController={pageController}
      canSwipe={canSwipe}
      isLoading={isLoading}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      slides={slides}
      swiper={swiper}
      toast={toast}
      isAddingDisabled={isAddingDisabled}
      setSwiper={setSwiper}
      setToast={setToast}
      onProceedButtonClick={onProceedButtonClick}
      onAddSlide={onAddSlide}
      onInputChange={onInputChange}
      onSwipeHandle={onSwipeHandle}
      onSaveActivityWithContent={onSaveActivityWithContent}
      onContinueButtonClick={onContinueButtonClick}
    />
  );
};

export default React.memo(SmallStepsContainer);
