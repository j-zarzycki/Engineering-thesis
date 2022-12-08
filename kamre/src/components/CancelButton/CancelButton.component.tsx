import React from "react";

import "./CancelButton.style.scss";

interface IProps {
  title: String;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CancelButton: React.FC<IProps> = (props: IProps) => {
  const { title, onClick } = props;

  return (
    <button className="cancel-button" type="button" onClick={onClick}>
      <div className="cancel-button-text">{title}</div>
    </button>
  );
};

export default CancelButton;
