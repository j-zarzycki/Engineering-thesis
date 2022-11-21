import React, { useState, useEffect, useRef } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper } from "swiper/types";
import { Device } from "@capacitor/device";

import { authLogin } from "@Actions/auth";
import useAppDispatch from "@Hooks/useAppDispatch";
import apiService from "@Services/api.service";
import SWIPE_ELEMENTS from "@Constants/walking.constants";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import WelcomePage from "./WelcomePage.component";

const WelcomePageContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [img, setImg] = useState("");
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const slideElements = SWIPE_ELEMENTS;
  const [pageController, setPageController] = useState({
    isWelcomeViewVisible: true,
    isRecoveryViewVisible: false,
  });
  const router = useIonRouter();
  const swiperRef = useRef<any>(null);
  const recoveryRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const authenticateUser = () => {
    Device.getId().then((info) => {
      localStorage.setItem("deviceId", info.uuid);
      dispatch(authLogin(info.uuid))
        .then(async () => {
          localStorage.setItem("isFirstStart", "false");
          router.push("/home", "forward");
          setIsLoading(false);
        })
        .catch(() => {
          router.push("/403", "forward");
        });
    });
  };

  const onStartButtonClick = () => {
    setIsLoading(true);
    setTimeout(authenticateUser, 3000);
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(swiper?.activeIndex);
    if (swiper?.activeIndex === slideElements - 4) {
      setImg(quote);
    }
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  const onSlideChangeHandler = (slide: Swiper) => {
    setCurrentSlide(slide?.activeIndex);
    setImg(MainImg);
    if (slide?.activeIndex === 1 || slide?.activeIndex === 2) {
      setImg(quote);
    }
  };

  const onRecoveryButtonClick = () => {
    if (swiperRef !== undefined) swiperRef.current!.style.display = "none";
    if (recoveryRef !== undefined) recoveryRef.current!.style.display = "flex";
    setPageController({
      isWelcomeViewVisible: false,
      isRecoveryViewVisible: true,
    });
  };

  const onRestoreDataButtonClick = async () => {
    setIsLoading(true);
    Device.getId().then(async (info) => {
      await apiService
        .SendRecoveryCode(info.uuid.replace(/\s/g, ""), inputValue)
        .then(() => {
          setTimeout(authenticateUser, 3000);
          setToast({
            isOpen: true,
            message: "Konto zostało pomyślnie zmigrowane!",
          });
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setToast({
            isOpen: true,
            message: "Wystąpił błąd podczas migrowania konta.",
          });
        });
    });
  };

  const onCancelRecoveryButtonHandle = () => {
    if (swiperRef !== undefined) swiperRef.current!.style.display = "block";
    if (recoveryRef !== undefined) recoveryRef.current!.style.display = "none";
    setPageController({
      isWelcomeViewVisible: true,
      isRecoveryViewVisible: false,
    });

    swiper.slideNext();
  };

  const onInputChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setInputValue(value);
  };

  useEffect(() => {
    const tabs = document.querySelector("ion-tab-bar");
    tabs!.style.display = "none";
    setImg(MainImg);
    if (recoveryRef !== undefined) recoveryRef.current!.style.display = "none";
  }, []);

  return (
    <WelcomePage
      swiperRef={swiperRef}
      recoveryRef={recoveryRef}
      onCancelRecoveryButtonHandle={onCancelRecoveryButtonHandle}
      pageController={pageController}
      onRecoveryButtonClick={onRecoveryButtonClick}
      onInputChange={onInputChange}
      onStartButtonClick={onStartButtonClick}
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
      onRestoreDataButtonClick={onRestoreDataButtonClick}
    />
  );
};

export default React.memo(WelcomePageContainer);
