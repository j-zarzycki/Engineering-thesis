import React, { useEffect, useState } from "react";
import { useIonRouter } from "@ionic/react";
import { SwiperSlide } from "swiper/react";
import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import Input from "@Components/Input";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import { createNote } from "@Store/slices/noteSlice";
import useAppDispatch from "@Hooks/useAppDispatch";
import Visualization from "./Visualization.component";

const VisualizationContainer: React.FC = () => {
  const router = useIonRouter();
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
    isVisualizationListVisible: false,
    isFinalVisible: false,
  });
  const currentDateWithTime: String = getFullDateWithTime();
  const dispatch = useAppDispatch();
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
          <h4 className="swiper-slide__header">Napisz to!</h4>
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

  const onEndButtonClick = () => {
    setPageController((prevState) => {
      return {
        ...prevState,
        isMainContextVisible: false,
        isVisualizationListVisible: true,
      };
    });
  };

  const onDestroyButtonClick = () => {
    setPageController({
      isMainContextVisible: false,
      isVisualizationListVisible: false,
      isFinalVisible: true,
    });
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
  };

  const createVisualizationWithNoContent = async () => {
    setIsLoading(true);
    await apiService
      .CreateActivityWithNoContent(
        currentDateWithTime,
        "Wizualizacja swojego procesu zmiany",
      )
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

  const createVisualizationWithContent = () => {
    dispatch(
      createNote({
        contentName: "Wizualizacja swojego procesu zmiany",
        title: "Wizualizacja swojego procesu zmianyr",
        description: "Co czujesz po wykonaniu tego ćwiczenia?",
        hiddenDescription: "",
      }),
    );

    router.push("/note", "forward", "pop");
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
    <Visualization
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
      onSlideChangeHandler={onSlideChangeHandler}
      onCreateActivityWithNoContent={createVisualizationWithNoContent}
      onCreateActivityWithContent={createVisualizationWithContent}
    />
  );
};

export default VisualizationContainer;
