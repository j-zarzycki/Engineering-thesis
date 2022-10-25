import React from "react";

import "./WelcomePageStartButton.style.scss";

interface IProps {
  title: String;
  disabled?: boolean;
  onClick: () => void;
}

const WelcomePageStartButton: React.FC<IProps> = (props: IProps) => {
  const { title, disabled, onClick } = props;

  return (
    <button
      className="welcome-page-start-button"
      type="button"
      onClick={onClick}
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
