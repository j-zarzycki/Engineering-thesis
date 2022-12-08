import React, { useEffect } from "react";

import HorizontalProgressBar from "./HorizontalProgressBar.component";

interface IProps {
  elements: Number;
  currentElement: Number;
}

const HorizontalProgressBarContainer: React.FC<IProps> = (props: IProps) => {
  const { currentElement, elements } = props;

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
    <HorizontalProgressBar renderNumberOfElements={renderNumberOfElements} />
  );
};

export default HorizontalProgressBarContainer;
