import React from "react";
import { BiChevronRight } from "react-icons/bi";

import "./ProceedButton.style.scss";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: String;
}

const ProceedButton: React.FC<IProps> = (props: IProps) => {
  const { onClick, title } = props;

  return (
    <button className="proceed-button" type="button" onClick={onClick}>
      {title}
      <BiChevronRight size={40} />
    </button>
  );
};

export default ProceedButton;
