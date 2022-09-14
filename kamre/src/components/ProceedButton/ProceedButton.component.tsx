import React from "react";
import { BiChevronRight } from "react-icons/bi";

import "./ProceedButton.style.scss";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: String;
  disabled?: boolean;
}

const ProceedButton: React.FC<IProps> = (props: IProps) => {
  const { onClick, title, disabled } = props;

  return (
    <button
      className="proceed-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      <BiChevronRight size={40} />
    </button>
  );
};

ProceedButton.defaultProps = {
  disabled: false,
};

export default ProceedButton;
