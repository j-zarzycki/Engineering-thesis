/* eslint-disable react/no-unknown-property */

import React, { useEffect } from "react";

import VerticalProgressBar from "./VerticalProgressBar.component";

interface IProps {
  elements: number;
  currentElement: number;
}

const VerticalProgressBarContainer: React.FC<IProps> = (props: IProps) => {
  const { elements, currentElement } = props;

  const renderNumberOfElements = () => {
    const arrElements = [];

    for (let i = 0; i < elements; i += 1) {
      if (i === currentElement) {
        arrElements.push(
          <div
            element-index={i}
            key={i}
            className="vertical-progress-bar__element vertical-progress-bar__element--active"
          />,
        );
      } else if (i === Number(elements) - 1 && currentElement >= elements) {
        arrElements.push(
          <div
            element-index={Number(elements) - 1}
            key={Number(elements) - 1}
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
    renderNumberOfElements();
  }, [currentElement]);

  return (
    <VerticalProgressBar renderNumberOfElements={renderNumberOfElements} />
  );
};

export default VerticalProgressBarContainer;
