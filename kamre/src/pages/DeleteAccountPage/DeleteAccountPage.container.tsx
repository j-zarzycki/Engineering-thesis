import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import DeleteAccountPage from "./DeleteAccountPage.component";

const DeleteAccountPageContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const currentDateWithTime: String = getFullDateWithTime();
  const router = useIonRouter();

  const createDeleteAccountPageWithNoContent = async () => {
    await apiService
      .CreateActivityWithNoContent(currentDateWithTime, "DeleteAccountPage")
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const createDeleteAccountPageWithContent = async (
    activityContent: String,
  ) => {
    await apiService
      .CreateActivityWithContent(
        currentDateWithTime,
        activityContent,
        "DeleteAccountPage",
      )
      .then((data) => console.log("data = ", data))
      .catch((err) => console.log("err = ", err));
  };

  const onDeleteClick = async () => {
    setIsLoading(true);
    await apiService
      .DeleteUser()
      .finally(() => {
        localStorage.setItem("isFirstStart", "true");
        router.push("/welcompage", "forward", "pop");
        setToast({ isOpen: true, message: "Pomyślnie usunięto!" });
        setIsLoading(false);
      })
      .catch(() => {
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        });
      });
  };

  return (
    <DeleteAccountPage
      setToast={setToast}
      isLoading={isLoading}
      toast={toast}
      onDeleteClick={onDeleteClick}
      onCreateActivityWithNoContent={createDeleteAccountPageWithNoContent}
      onCreateActivityWithContent={createDeleteAccountPageWithContent}
    />
  );
};

export default DeleteAccountPageContainer;
