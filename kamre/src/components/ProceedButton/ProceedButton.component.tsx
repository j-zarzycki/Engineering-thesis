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
      <div className="proceed-button-text">{title}</div>
      <div className="proceed-button-svg">
        <BiChevronRight size={40} />
      </div>
    </button>
  );
};

export default ProceedButton;
