import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { createNote } from "@Store/slices/noteSlice";
import { getFullDateWithTime } from "@Utils/date";
import useAppDispatch from "@Hooks/useAppDispatch";
import apiService from "@Services/api.service";
import Input from "@Components/Input";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import Weights from "./Weights.component";

const WeightsContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(MainImg);
  const [slidesInputsValue, setSlidesInputsValue] = useState<string[]>([]);
  const [slides, setSlides] = useState<React.ReactElement[]>([]);
  const [slideInputValue, setSlideInputValue] = useState("");
  const [isAddingDisabled, setIsAddingDisabled] = useState(true);
  const [pageController, setPageController] = useState({
    isMainContextVisible: true,
    isWeightsListVisible: false,
    isFinalVisible: false,
  });
  const history = useHistory();
  const slideElements = 3;
  const dispatch = useAppDispatch();

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
          <h4 className="swiper-slide__header">Wpisz ciężar:</h4>
          <p className="swiper-slide__paragraph">
            <Input
              type="text"
              placeholder="Wpisz swój ciężar..."
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

  const onEndButtonClick = () => {
    setPageController((prevState) => {
      return {
        ...prevState,
        isMainContextVisible: false,
        isWeightsListVisible: true,
      };
    });
  };

  const onDestroyButtonClick = () => {
    setPageController({
      isMainContextVisible: false,
      isWeightsListVisible: false,
      isFinalVisible: true,
    });
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
  };

  const onSaveButtonWithNoContentClick = async () => {
    const currentDateWithTime = getFullDateWithTime();
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "Ciężary")
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

  const onSaveButtonClick = () => {
    dispatch(
      createNote({
        contentName: "Ciężary",
        title: "Ciężary",
        description: "Co zaobserwowałeś/aś po aktywności? Jak się czułeś/aś?",
        hiddenDescription: "",
      }),
    );

    history.push("/note");
  };

  const onSlideChangeHandler = () => {
    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === 1) setImg(quote);
    if (swiper?.activeIndex <= 2) setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex > 1) swiper.allowTouchMove = false;
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  useEffect(() => {
    setSlides((prevState) => [...prevState, renderSlide()]);
  }, []);

  return (
    <Weights
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
      onEndButtonClick={onEndButtonClick}
      onDestroyButtonClick={onDestroyButtonClick}
      onSaveButtonWithNoContentClick={onSaveButtonWithNoContentClick}
      onSaveButtonClick={onSaveButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
    />
  );
};

export default WeightsContainer;
