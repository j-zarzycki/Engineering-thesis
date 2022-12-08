import React from "react";
import { BiChevronRight } from "react-icons/bi";

import "./ProceedButton.style.scss";

interface IProps {
  title: String;
  icon?: React.ReactElement;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ProceedButton: React.FC<IProps> = (props: IProps) => {
  const { title, icon, disabled, onClick } = props;

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
