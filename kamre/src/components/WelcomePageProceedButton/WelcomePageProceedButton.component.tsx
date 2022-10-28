import React from "react";

import "./WelcomePageProceedButton.style.scss";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: String;
  disabled?: boolean;
}

const WelcomePageProceedButton: React.FC<IProps> = (props: IProps) => {
  const { onClick, title, disabled } = props;

  return (
    <button
      className="welcome-page-proceed-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

WelcomePageProceedButton.defaultProps = {
  disabled: false,
};

export default WelcomePageProceedButton;
