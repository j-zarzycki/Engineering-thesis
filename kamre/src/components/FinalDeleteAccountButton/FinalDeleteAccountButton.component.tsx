import React from "react";
import { BiChevronRight } from "react-icons/bi";

import "./FinalDeleteAccountButton.style.scss";

interface IProps {
  title: String;
  icon?: React.ReactElement;
  disabled?: boolean;
  onClick: () => void;
}

const FinalDeleteAccountButton: React.FC<IProps> = (props: IProps) => {
  const { title, icon, disabled, onClick } = props;

  return (
    <button
      className="final-delete-account-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {icon}
    </button>
  );
};

FinalDeleteAccountButton.defaultProps = {
  disabled: false,
  icon: <BiChevronRight size={40} />,
};

export default FinalDeleteAccountButton;
