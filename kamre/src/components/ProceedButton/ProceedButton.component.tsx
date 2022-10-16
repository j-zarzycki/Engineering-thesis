import React from "react";
import { BiChevronRight } from "react-icons/bi";

import "./ProceedButton.style.scss";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: String;
  icon?: React.ReactElement;
  disabled?: boolean;
}

const ProceedButton: React.FC<IProps> = (props: IProps) => {
  const { onClick, title, icon, disabled } = props;

  return (
    <button
      className="proceed-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {icon}
    </button>
  );
};

ProceedButton.defaultProps = {
  disabled: false,
  icon: <BiChevronRight size={40} />,
};

export default ProceedButton;
