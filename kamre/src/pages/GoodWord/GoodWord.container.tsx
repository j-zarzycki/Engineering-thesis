import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";

import Input from "@Components/Input";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import apiService from "@Services/api.service";
import { getFullDateWithTime } from "@Utils/date";
import GoodWord from "./GoodWord.component";

const GoodWordContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [img, setImg] = useState(MainImg);
  const [slidesInputsValue, setSlidesInputsValue] = useState<string[]>([]);
  const [slides, setSlides] = useState<React.ReactElement[]>([]);
  const [slideInputValue, setSlideInputValue] = useState("");
  const [isAddingDisabled, setIsAddingDisabled] = useState(true);
  const history = useHistory();
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
    swiper?.slideNext();
    setIsAddingDisabled(true);
    setSlidesInputsValue((prevState) => [...prevState, slideInputValue]);
    setSlides((prevState) => [...prevState, renderSlide()]);
  };

  const onEndButtonClick = async () => {
    setIsLoading(true);
    const dateTime = getFullDateWithTime();
    await apiService
      .CreateActivityWithContent(dateTime, slidesInputsValue, "Dobre słowo")
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
        history.push("/home");
      })
      .finally(() => setIsLoading(false))
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();
    setCurrentSlide(swiper?.activeIndex);
    setImg(MainImg);

    if (swiper?.activeIndex === 1) setImg(quote);
  };

  useEffect(() => {
    setSlides((prevState) => [...prevState, renderSlide()]);
  }, []);

  return (
    <GoodWord
      setSwiper={setSwiper}
      currentSlide={currentSlide}
      slideElements={slideElements}
      img={img}
      isLoading={isLoading}
      slides={slides}
      swiper={swiper}
      toast={toast}
      setToast={setToast}
      isAddingDisabled={isAddingDisabled}
      onProceedButtonClick={onProceedButtonClick}
      onAddSlide={onAddSlide}
      onInputChange={onInputChange}
      onEndButtonClick={onEndButtonClick}
    />
  );
};

export default GoodWordContainer;
