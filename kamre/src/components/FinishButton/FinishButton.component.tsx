import React from "react";

import "./FinishButton.style.scss";

interface IProps {
  className?: string;
  title: string;
  onClick(): void;
}

const FinishButton: React.FC<IProps> = (props: IProps) => {
  const { className, title, onClick } = props;
  return (
    <button
      className={`finish-button ${className}`}
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

FinishButton.defaultProps = {
  className: "",
};

export default FinishButton;
