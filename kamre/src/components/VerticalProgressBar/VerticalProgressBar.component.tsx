import React from "react";

import "./VerticalProgressBar.style.css";

interface IProps {
  renderNumberOfElements(): React.ReactNode;
}

const VerticalProgressBar: React.FC<IProps> = (props: IProps) => {
  const { renderNumberOfElements } = props;
  return (
    <div className="vertical-progress-bar">{renderNumberOfElements()}</div>
  );
};

export default VerticalProgressBar;
