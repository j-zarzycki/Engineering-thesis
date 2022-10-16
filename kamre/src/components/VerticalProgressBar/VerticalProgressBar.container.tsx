import React, { useEffect, useState } from "react";

import VerticalProgressBar from "./VerticalProgressBar.component";

interface IProps {
  elements: number;
  currentElement: number;
}

const VerticalProgressBarContainer: React.FC<IProps> = (props: IProps) => {
  const { elements, currentElement } = props;
  const [prevCurrentElementValue, setPrevCurrentElementValue] =
    useState(currentElement);

  const renderNumberOfElements = () => {
    const arrElements = [];

    for (let i = 0; i < elements; i += 1) {
      if (i === 0) {
        arrElements.push(
          <div
            element-index={i}
            key={i}
            className="vertical-progress-bar__element vertical-progress-bar__element--active"
          />,
        );
      } else {
        arrElements.push(
          <div
            element-index={i}
            key={i}
            className="vertical-progress-bar__element"
          />,
        );
      }
    }

    return <> {arrElements} </>;
  };

  const onCurrentElementChange = () => {
    const allActiveElements = document.querySelectorAll(
      ".vertical-progress-bar__element--active",
    );
    allActiveElements.forEach((element) =>
      element?.classList.remove("vertical-progress-bar__element--active"),
    );

    if (currentElement === 0) {
      const element = document.querySelector(
        `[element-index="${currentElement}"]`,
      );
      const prevElement = document.querySelector(
        `[element-index="${Number(elements - 1)}"]`,
      );

      element?.classList.add("vertical-progress-bar__element--active");
      prevElement?.classList.remove("vertical-progress-bar__element--active");
    }

    if (currentElement > prevCurrentElementValue) {
      const element = document.querySelector(
        `[element-index="${currentElement}"]`,
      );
      const prevElement = document.querySelector(
        `[element-index="${Number(currentElement) - 1}"]`,
      );
      element?.classList.add("vertical-progress-bar__element--active");
      prevElement?.classList.remove("vertical-progress-bar__element--active");
    } else if (currentElement < prevCurrentElementValue) {
      const element = document.querySelector(
        `[element-index="${currentElement}"]`,
      );
      const prevElement = document.querySelector(
        `[element-index="${Number(currentElement) + 1}"]`,
      );
      element?.classList.add("vertical-progress-bar__element--active");
      prevElement?.classList.remove("vertical-progress-bar__element--active");
    }
    setPrevCurrentElementValue(currentElement);
  };

  useEffect(() => {
    onCurrentElementChange();
  }, [currentElement]);

  return (
    <VerticalProgressBar renderNumberOfElements={renderNumberOfElements} />
  );
};

export default VerticalProgressBarContainer;
