import React, { useState, useEffect, useRef } from "react";
import { useIonRouter } from "@ionic/react";
import { Swiper as SwiperType } from "swiper/types";
import { Device } from "@capacitor/device";

import { ToastType } from "@Types/toast.type";
import { authLogin } from "@Actions/auth";
import useLayout from "@Hooks/useLayout";
import useLocalStorage from "@Hooks/useLocalStorage";
import useAppDispatch from "@Hooks/useAppDispatch";
import apiService from "@Services/api.service";
import MainImg from "@Assets/main.png";
import quote from "@Assets/what.png";
import WelcomePage from "./WelcomePage.component";

const WelcomePageContainer: React.FC = () => {
  let isMigrated = false;
  const slideElements = 4;
  const { disableTabBar } = useLayout();
  const { setValue } = useLocalStorage("shouldHomeRender");
  const router = useIonRouter();
  const swiperRef = useRef<any>(null);
  const recoveryRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [inputValue, setInputValue] = useState("");
  const [img, setImg] = useState(MainImg);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [pageController, setPageController] = useState({
    isWelcomeViewVisible: true,
    isRecoveryViewVisible: false,
  });

  const authenticateUser = () => {
    Device.getId().then((info) => {
      localStorage.setItem("deviceId", info.uuid);
      dispatch(authLogin(info.uuid))
        .then(async () => {
          setValue("true");
          setIsLoading(false);
          router.push("/home", "forward", "pop");
        })
        .catch(() => {
          router.push("/403", "forward", "pop");
        });
    });

    if (isMigrated) {
      setToast({
        isOpen: true,
        message: "Migracja konta przebiegła pomyślnie!",
      });
    } else {
      setToast({
        isOpen: true,
        message: "Witamy w aplikacji!",
      });
    }
  };

  const onStartButtonClick = () => {
    setIsLoading(true);
    setTimeout(authenticateUser, 3000);
  };

  const onProceedButtonClick = () => {
    swiper?.slideNext();

    setCurrentSlide(Number(swiper?.activeIndex));
    if (swiper?.activeIndex === slideElements - 4) {
      setImg(quote);
    }
    if (swiper?.activeIndex === slideElements - 1) {
      setImg(MainImg);
    }
  };

  const onSlideChangeHandler = (slide: SwiperType) => {
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
    Device.getId().then((info) => {
      apiService
        .SendRecoveryCode(info.uuid.replace(/\s/g, ""), inputValue)
        .then(() => {
          isMigrated = true;
          setTimeout(authenticateUser, 3000);
        })
        .catch(() => {
          setToast({
            isOpen: true,
            message: "Wystąpił błąd podczas migrowania konta.",
          });

          setIsLoading(false);
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

    swiper!.slideNext();
  };

  const onInputChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setInputValue(value);
  };

  useEffect(() => {
    setValue("false");
    disableTabBar();
    if (recoveryRef !== undefined) recoveryRef.current!.style.display = "none";
  }, []);

  return (
    <WelcomePage
      swiperRef={swiperRef}
      recoveryRef={recoveryRef}
      currentSlide={currentSlide}
      isLoading={isLoading}
      toast={toast}
      swiper={swiper}
      img={img}
      slideElements={slideElements}
      pageController={pageController}
      setToast={setToast}
      setSwiper={setSwiper}
      onCancelRecoveryButtonHandle={onCancelRecoveryButtonHandle}
      onRecoveryButtonClick={onRecoveryButtonClick}
      onInputChange={onInputChange}
      onStartButtonClick={onStartButtonClick}
      onProceedButtonClick={onProceedButtonClick}
      onSlideChangeHandler={onSlideChangeHandler}
      onRestoreDataButtonClick={onRestoreDataButtonClick}
    />
  );
};

export default React.memo(WelcomePageContainer);
