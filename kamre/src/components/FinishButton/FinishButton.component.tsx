import React from "react";

import "./FinishButton.style.scss";

interface IProps {
  onClick(): void;
  className?: string;
  title: string;
}

const FinishButton: React.FC<IProps> = (props: IProps) => {
  const { onClick, className, title } = props;
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
