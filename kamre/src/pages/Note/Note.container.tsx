import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getFullDateWithTime } from "@Utils/date";
import apiService from "@Services/api.service";
import useAppSelector from "@Hooks/useAppSelector";
import Note from "./Note.component";

const NoteContainer: React.FC = () => {
  const { prevContent, title, description, hiddenDescription } = useAppSelector(
    (state) => state.note,
  );

  const [isHidden, setIsHidden] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [textAreaInput, setTextAreaInput] = useState("");
  const history = useHistory();

  const handleChevronClick = () => setIsHidden((prevState) => !prevState);
  const backToHomePage = () => history.push("/home");

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
    const currentDate = getFullDateWithTime();
    await apiService
      .CreateActivityWithContent(currentDate, textAreaInput, prevContent)
      .then(() => backToHomePage());
  };

  const handleCancelButtonClick = () => backToHomePage();

  return (
    <Note
      title={title}
      description={description}
      hiddenDescription={hiddenDescription}
      isHidden={isHidden}
      isButtonDisabled={isButtonDisabled}
      handleChevronClick={handleChevronClick}
      handleTextAreaChange={handleTextAreaChange}
      handleSaveButtonClick={handleSaveButtonClick}
      handleCancelButtonClick={handleCancelButtonClick}
    />
  );
};

export default NoteContainer;
