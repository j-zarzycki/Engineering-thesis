import React from "react";
import { IoMdAdd } from "react-icons/io";

import "./SaveActivityButton.style.scss";

interface IProps {
  title: String;
  icon?: React.ReactElement;
  isIconVisible?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SaveActivityButton: React.FC<IProps> = (props: IProps) => {
  const { title, icon, isIconVisible, onClick } = props;

  return (
    <button className="save-activity-button" type="button" onClick={onClick}>
      <div className="save-activity-button-text">
        {title}
        {isIconVisible && icon}
      </div>
    </button>
  );
};

SaveActivityButton.defaultProps = {
  icon: <IoMdAdd size={25} />,
  isIconVisible: true,
};

export default SaveActivityButton;
