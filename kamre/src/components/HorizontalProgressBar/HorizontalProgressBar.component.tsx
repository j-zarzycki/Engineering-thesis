import React, { useState, useEffect } from "react";

import "./HorizontalProgressBar.style.scss";

interface IProps {
  elements: Number;
  currentElement: Number;
}

const HorizontalProgressBar: React.FC<IProps> = (props: IProps) => {
  const { currentElement, elements } = props;
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
            className="horizontal-progress-bar__element horizontal-progress-bar__element--active"
          />,
        );
      } else {
        arrElements.push(
          <div
            element-index={i}
            key={i}
            className="horizontal-progress-bar__element"
          />,
        );
      }
    }

    return <> {arrElements} </>;
  };

  const onCurrentElementChange = () => {
    const allActiveElements = document.querySelectorAll(
      ".horizontal-progress-bar__element--active",
    );
    allActiveElements.forEach((element) =>
      element?.classList.remove("horizontal-progress-bar__element--active"),
    );

    if (currentElement === 0) {
      const element = document.querySelector(
        `[element-index="${currentElement}"]`,
      );

      element?.classList.add("horizontal-progress-bar__element--active");
    }

    if (currentElement > prevCurrentElementValue) {
      const element = document.querySelector(
        `[element-index="${currentElement}"]`,
      );
      const prevElement = document.querySelector(
        `[element-index="${Number(currentElement) - 1}"]`,
      );
      element?.classList.add("horizontal-progress-bar__element--active");
      prevElement?.classList.remove("horizontal-progress-bar__element--active");
    } else if (currentElement < prevCurrentElementValue) {
      const element = document.querySelector(
        `[element-index="${currentElement}"]`,
      );
      const prevElement = document.querySelector(
        `[element-index="${Number(currentElement) + 1}"]`,
      );
      element?.classList.add("horizontal-progress-bar__element--active");
      prevElement?.classList.remove("horizontal-progress-bar__element--active");
    }
    setPrevCurrentElementValue(currentElement);
  };

  useEffect(() => {
    onCurrentElementChange();
  }, [currentElement]);

  return (
    <div className="horizontal-progress-bar">{renderNumberOfElements()}</div>
  );
};

export default HorizontalProgressBar;
