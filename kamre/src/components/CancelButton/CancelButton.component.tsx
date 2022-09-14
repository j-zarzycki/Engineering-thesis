import React from "react";

import "./CancelButton.style.scss";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: String;
}

const CancelButton: React.FC<IProps> = (props: IProps) => {
  const { onClick, title } = props;

  return (
    <button className="cancel-button" type="button" onClick={onClick}>
      <div className="cancel-button-text">{title}</div>
    </button>
  );
};

export default CancelButton;
