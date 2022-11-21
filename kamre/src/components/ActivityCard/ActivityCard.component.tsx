import React from "react";

import "./ActivityCard.style.scss";

interface IProps {
  variant: "big" | "medium" | "small";
  title: string;
  description?: string;
  icon?: React.ReactElement;
  onClick?: (ev: any) => void;
}

const ActivityCard: React.FC<IProps> = (props: IProps) => {
  const { variant, title, description, icon, onClick } = props;

  const renderSmall = () => {
    return (
      <div
        className="activity-card activity-card--small"
        role="presentation"
        onClick={onClick}
      >
        <div className="activity-card__title">{title}</div>
        <p className="activity-card__description">{description}</p>
      </div>
    );
  };

  const renderMedium = () => {
    return (
      <div
        className="activity-card activity-card--medium"
        role="presentation"
        onClick={onClick}
      >
        <div className="activity-card__icon">{icon}</div>
        <div className="activity-card__title">{title}</div>
      </div>
    );
  };

  const renderBig = () => {
    return (
      <div
        className="activity-card activity-card--big"
        role="presentation"
        onClick={onClick}
      >
        <div className="activity-card__title">{title}</div>
      </div>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case "small":
        return renderSmall();
      case "medium":
        return renderMedium();
      case "big":
        return renderBig();
      default:
        return null;
    }
  };

  return <>{renderVariant()}</>;
};

ActivityCard.defaultProps = {
  description: "",
  icon: <span />,
  onClick: () => {
    console.log("clicked");
  },
};

export default ActivityCard;
