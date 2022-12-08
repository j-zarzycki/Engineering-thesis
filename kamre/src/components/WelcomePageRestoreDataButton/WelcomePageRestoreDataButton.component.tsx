import React from "react";

import "./WelcomePageRestoreDataButton.style.scss";

interface IProps {
  title: String;
  disabled?: boolean;
  onClick: any;
}

const WelcomePageRestoreDataButton: React.FC<IProps> = (props: IProps) => {
  const { title, disabled, onClick } = props;

  return (
    <button
      className="welcome-page-restore-data-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

WelcomePageRestoreDataButton.defaultProps = {
  disabled: false,
};

export default WelcomePageRestoreDataButton;
