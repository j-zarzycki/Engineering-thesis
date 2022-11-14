import React from "react";
import { IoMdAdd } from "react-icons/io";

import "./SaveActivityButton.style.scss";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: String;
  icon?: React.ReactElement;
}

const SaveActivityButton: React.FC<IProps> = (props: IProps) => {
  const { onClick, title, icon } = props;

  return (
    <button className="save-activity-button" type="button" onClick={onClick}>
      <div className="save-activity-button-text">
        {title}
        {icon}
      </div>
    </button>
  );
};

SaveActivityButton.defaultProps = {
  icon: <IoMdAdd size={25} />,
};

export default SaveActivityButton;
