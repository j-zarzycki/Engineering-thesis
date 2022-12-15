import React from "react";

import "./HorizontalProgressBar.style.scss";

interface IProps {
  renderNumberOfElements(): JSX.Element;
}

const HorizontalProgressBar: React.FC<IProps> = (props: IProps) => {
  const { renderNumberOfElements } = props;

  return (
    <div className="horizontal-progress-bar">{renderNumberOfElements()}</div>
  );
};

export default HorizontalProgressBar;
