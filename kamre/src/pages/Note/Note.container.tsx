import React, { useState } from "react";
import { useIonRouter } from "@ionic/react";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import useAppSelector from "@Hooks/useAppSelector";
import Note from "./Note.component";

const NoteContainer: React.FC = () => {
  const { prevContent, title, description, hiddenDescription } = useAppSelector(
    (state) => state.note,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [isHidden, setIsHidden] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [textAreaInput, setTextAreaInput] = useState("");
  const router = useIonRouter();

  const handleChevronClick = () => setIsHidden((prevState) => !prevState);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;

    setTextAreaInput(value);

    if (value.length <= 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleSaveButtonClick = async () => {
    setIsLoading(true);
    const currentDate = getFullDateWithTime();

    await apiService
      .CreateActivityWithContent(currentDate, textAreaInput, prevContent)
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
        router.push("/home", "forward", "pop");
      })
      .finally(() => setIsLoading(false))
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );
  };

  const handleCancelButtonClick = async () => {
    if (prevContent === "Poprzedni dzień") {
      router.push("/home", "forward", "pop");
      return null;
    }

    setIsLoading(true);
    const currentDate = getFullDateWithTime();

    await apiService
      .CreateActivityWithNoContent(currentDate, prevContent)
      .then(() => {
        setToast({ isOpen: true, message: "Pomyślnie zapisano!" });
        router.push("/home", "forward", "pop");
      })
      .finally(() => setIsLoading(false))
      .catch(() =>
        setToast({
          isOpen: true,
          message: "Wystąpił błąd podczas zapisywania.",
        }),
      );

    return null;
  };

  return (
    <Note
      title={title}
      description={description}
      hiddenDescription={hiddenDescription}
      isHidden={isHidden}
      isLoading={isLoading}
      toast={toast}
      setToast={setToast}
      isButtonDisabled={isButtonDisabled}
      handleChevronClick={handleChevronClick}
      handleTextAreaChange={handleTextAreaChange}
      handleSaveButtonClick={handleSaveButtonClick}
      handleCancelButtonClick={handleCancelButtonClick}
    />
  );
};

export default NoteContainer;
