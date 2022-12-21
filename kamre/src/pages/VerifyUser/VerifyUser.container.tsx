import React, { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";

import { ToastType } from "@Types/toast.type";
import { authLogin } from "@Actions/auth";
import { delay } from "@Utils/delay";
import useLayout from "@Hooks/useLayout";
import useLocalStorage from "@Hooks/useLocalStorage";
import useAppDispatch from "@Hooks/useAppDispatch";
import VerifyUser from "./VerifyUser.component";

const VerifyUserContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const { value: deviceId } = useLocalStorage("deviceId");
  const { disableTabBar } = useLayout();

  useEffect(() => {
    disableTabBar();
    setIsLoading(true);

    dispatch(authLogin(String(deviceId)))
      .then(async () => {
        await delay(1500);
        setIsLoading(false);
        router.push("/home", "forward", "pop");
      })
      .catch(() => {
        router.push("/403", "forward", "pop");
      });
  }, []);

  return <VerifyUser isLoading={isLoading} toast={toast} setToast={setToast} />;
};

export default VerifyUserContainer;
