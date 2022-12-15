import React from "react";

import "./WelcomePageProceedButton.style.scss";

interface IProps {
  title: String;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const WelcomePageProceedButton: React.FC<IProps> = (props: IProps) => {
  const { title, disabled, onClick } = props;

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
