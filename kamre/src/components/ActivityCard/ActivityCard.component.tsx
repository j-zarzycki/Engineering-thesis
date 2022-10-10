import React from "react";

import "./ActivityCard.style.scss";

interface IProps {
  variant: "big" | "medium" | "small";
  title: string;
  description?: string;
  icon?: React.ReactElement | HTMLElement;
}

const ActivityCard: React.FC<IProps> = (props: IProps) => {
  const { variant, title, description, icon } = props;

  const renderSmall = () => {
    return (
      <div className="activity-card activity-card--small">
        <div className="activity-card__title">{title}</div>
        <p className="activity-card__description">{description}</p>
      </div>
    );
  };

  const renderMedium = () => {
    return (
      <div className="activity-card activity-card--medium">
        <div className="activity-card__icon">{icon}</div>
        <div className="activity-card__title">{title}</div>
      </div>
    );
  };

  const renderBig = () => {
    return (
      <div className="activity-card activity-card--big">
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
};

export default ActivityCard;
