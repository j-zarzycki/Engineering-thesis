import React, { useEffect, useState } from "react";
import { useIonRouter } from "@ionic/react";
import { SwiperSlide } from "swiper/react";

import { ToastType } from "@Types/toast.type";
import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Input from "@Components/Input";
import MainImg from "@Assets/main.png";
import Question from "@Assets/what.png";
import GoodWord from "./GoodWord.component";

const GoodWordContainer: React.FC = () => {
  const router = useIonRouter();
  const slideElements = 3;
  const [canSwipe, setCanSwipe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(MainImg);
  const [slidesInputsValue, setSlidesInputsValue] = useState<string[]>([]);
  const [slides, setSlides] = useState<React.ReactElement[]>([]);
  const [slideInputValue, setSlideInputValue] = useState("");
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
          <h4 className="swiper-slide__header">
            Napisz do siebie jakąś miłą wiadomość!
          </h4>
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
    const currentDate = getFullDateWithTime();
    setIsLoading(true);
    await apiService
      .CreateActivityWithContent(currentDate, slidesInputsValue, "Dobre słowo")
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
    if (swiper?.activeIndex < 2) setCurrentSlide(swiper?.activeIndex);

    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(Question);
  };

  const onSwipeHandle = () => {
    if (swiper?.activeIndex === 1) setImg(Question);
    if (swiper?.activeIndex <= 2) setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex > 1) {
      setImg(MainImg);
      swiper.allowTouchMove = false;
    }
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

export default React.memo(GoodWordContainer);
