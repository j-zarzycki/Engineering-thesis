import React, { useState, useEffect, forwardRef } from "react";
import { useIonRouter } from "@ionic/react";

import { AllActivitiesType } from "@Types/allActivities.type";
import apiService from "@Services/api.service";
import AllActivitiesMenu from "./AllActivitiesMenu.component";

const AllActivitiesMenuContainer = forwardRef((_, menuRef: any) => {
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [allActivitiesData, setAllActivitiesData] = useState<AllActivitiesType>(
    {
      Aktywne: [],
      Bierne: [],
      "Pozytywne emocje": [],
      "Zmiana myślenia": [],
    },
  );

  const onItemClick = (route: string) => {
    menuRef.current?.toggle();
    router.push(`${route}`, "forward");
  };

  const getAllActivitiesData = async () => {
    setIsLoading(true);
    await apiService
      .GetAllActivities()
      .then(({ data: { res } }) => {
        setAllActivitiesData(res);
      })
      .finally(() => setIsLoading(false))
      .catch(() => {
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas wczytywania danych.",
        });

        router.push("/403", "forward", "pop");
      });
  };

  useEffect(() => {
    getAllActivitiesData();
  }, []);

  return (
    <AllActivitiesMenu
      ref={menuRef}
      isLoading={isLoading}
      toast={toast}
      allActivitiesData={allActivitiesData}
      onItemClick={onItemClick}
      setToast={setToast}
    />
  );
});

export default AllActivitiesMenuContainer;
