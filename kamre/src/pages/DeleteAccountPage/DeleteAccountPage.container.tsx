import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";

import { ToastType } from "@Types/toast.type";
import apiService from "@Services/api.service";
import Sad from "@Assets/sad.png";
import DeleteAccountPage from "./DeleteAccountPage.component";

const DeleteAccountPageContainer: React.FC = () => {
  const router = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastType>({ isOpen: false, message: "" });
  const [img] = useState(Sad);
  const [showDeleteAccountButton] = useState(true);
  const [showMigrateAccountButton] = useState(true);

  const onDeleteClick = async () => {
    setIsLoading(true);
    await apiService
      .DeleteUser()
      .finally(() => {
        localStorage.setItem("shouldHomeRender", "false");
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
      img={img}
      isLoading={isLoading}
      toast={toast}
      showMigrateAccountButton={showMigrateAccountButton}
      showDeleteAccountButton={showDeleteAccountButton}
      setToast={setToast}
      onDeleteClick={onDeleteClick}
    />
  );
};

export default React.memo(DeleteAccountPageContainer);
