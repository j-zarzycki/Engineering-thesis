import React from "react";

import "./SaveActivityButton.style.scss";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: String;
}

const SaveActivityButton: React.FC<IProps> = (props: IProps) => {
  const { onClick, title } = props;

  return (
    <button className="save-activity-button" type="button" onClick={onClick}>
      <div className="save-activity-button-text">{title}</div>
    </button>
  );
};

export default SaveActivityButton;
