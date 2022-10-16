import React from "react";
import { useHistory } from "react-router-dom";

import "./WelcomePageStartButton.style.scss";

interface IProps {
  defaultHref: string;
  title: String;
  disabled?: boolean;
}

const WelcomePageStartButton: React.FC<IProps> = (props: IProps) => {
  const { defaultHref, title, disabled } = props;
  const history = useHistory();
  const onClickHandler = () => history.push(defaultHref);

  return (
    <button
      className="welcome-page-start-button"
      type="button"
      onClick={onClickHandler}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

WelcomePageStartButton.defaultProps = {
  disabled: false,
};

export default WelcomePageStartButton;
