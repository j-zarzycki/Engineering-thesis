import React from "react";

import "./VerticalProgressBar.style.scss";

interface IProps {
  renderNumberOfElements(): any;
}

const VerticalProgressBar: React.FC<IProps> = (props: IProps) => {
  const { renderNumberOfElements } = props;
  return (
    <div className="vertical-progress-bar">{renderNumberOfElements()}</div>
  );
};

export default VerticalProgressBar;
