import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import "./PrivacyPolicyButton.style.scss";

interface IProps {
  defaultHref: string;
  title: String;
  icon?: React.ReactElement;
  disabled?: boolean;
}

const PrivacyPolicyButton: React.FC<IProps> = (props: IProps) => {
  const { defaultHref, title, icon, disabled } = props;

  const history = useHistory();
  const onClickHandler = () => history.push(defaultHref);

  return (
    <button
      className="privacy-policy-button"
      type="button"
      onClick={onClickHandler}
      disabled={disabled}
    >
      {title}
      {icon}
    </button>
  );
};

PrivacyPolicyButton.defaultProps = {
  disabled: false,
  icon: <BiChevronRight size={40} />,
};

export default PrivacyPolicyButton;
