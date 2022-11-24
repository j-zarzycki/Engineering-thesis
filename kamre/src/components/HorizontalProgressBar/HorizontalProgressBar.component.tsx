/* eslint-disable */

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
      if (i === currentElement) {
        arrElements.push(
          <div
            element-index={i}
            key={i}
            className="horizontal-progress-bar__element horizontal-progress-bar__element--active"
          />,
        );
      } else if (i === Number(elements) - 1 && currentElement >= elements) {
        arrElements.push(
          <div
            element-index={Number(elements) - 1}
            key={Number(elements) - 1}
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

  useEffect(() => {
    renderNumberOfElements();
  }, [currentElement]);

  return (
    <div className="horizontal-progress-bar">{renderNumberOfElements()}</div>
  );
};

export default HorizontalProgressBar;
