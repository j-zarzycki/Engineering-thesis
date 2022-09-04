import React, { useState, useEffect } from "react";

import VerticalProgressBar from "./VerticalProgressBar.component";

export interface IProps {
  elements: Number;
  currentElement: Number;
}

const VerticalProgressBarContainer: React.FC<IProps> = (props: IProps) => {
  const { currentElement, elements } = props;
  const [prevCurrentElementValue, setPrevCurrentElementValue] =
    useState(currentElement);

  const onCurrentElementChange = () => {
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

  useEffect(() => {
    onCurrentElementChange();
  }, [currentElement]);

  return (
    <VerticalProgressBar renderNumberOfElements={renderNumberOfElements} />
  );
};

export default VerticalProgressBarContainer;
