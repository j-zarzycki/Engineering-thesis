import React, { useState, useEffect } from "react";

import "./HorizontalProgressBar.css";

interface IProps {
  elements: Number;
  currentElement: Number;
}

const HorizontalProgressBar: React.FC<IProps> = (props) => {
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
            className="HorizontalProgressBar__Element Active"
          />,
        );
      } else {
        arrElements.push(
          <div
            element-index={i}
            key={i}
            className="HorizontalProgressBar__Element"
          />,
        );
      }
    }

    return <> {arrElements} </>;
  };

  const onCurrentElementChange = () => {
    if (currentElement > prevCurrentElementValue) {
      const element = document.querySelector(
        `[element-index="${currentElement}"]`,
      );
      const prevElement = document.querySelector(
        `[element-index="${Number(currentElement) - 1}"]`,
      );
      element?.classList.add("Active");
      prevElement?.classList.remove("Active");
    } else if (currentElement < prevCurrentElementValue) {
      const element = document.querySelector(
        `[element-index="${currentElement}"]`,
      );
      const prevElement = document.querySelector(
        `[element-index="${Number(currentElement) + 1}"]`,
      );
      element?.classList.add("Active");
      prevElement?.classList.remove("Active");
    }
    setPrevCurrentElementValue(currentElement);
  };

  useEffect(() => {
    onCurrentElementChange();
  }, [currentElement]);

  return (
    <div className="HorizontalProgressBar">{renderNumberOfElements()}</div>
  );
};

export default HorizontalProgressBar;
