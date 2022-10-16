import React from "react";

import { CalendarResponseType } from "@Types/calendar.type";

import "./ShowHideText.style.scss";

interface IProps {
  dayContent: CalendarResponseType;
}

const ShowHideText: React.FC<IProps> = (props: IProps) => {
  const {
    dayContent: {
      activity_content: activityContent,
      activity_category: activityCategory,
      activity_name: activityName,
      has_content: hasContent,
    },
  } = props;

  const renderHeader = () => {
    switch (activityCategory) {
      case "Aktywne":
        return (
          <div className="show-hide__header show-hide__header--yellow">
            <h4>{activityName}</h4>
          </div>
        );
      case "Bierne":
        return (
          <div className="show-hide__header show-hide__header--green">
            <h4>{activityName}</h4>
          </div>
        );
      case "Zmiana myślenia":
        return (
          <div className="show-hide__header show-hide__header--blue">
            <h4>{activityName}</h4>
          </div>
        );
      case "Pozytywne emocje":
        return (
          <div className="show-hide__header show-hide__header--red">
            <h4>{activityName}</h4>
          </div>
        );

      default:
        return (
          <div className="show-hide__header show-hide__header--red>">
            <h4>{activityName}</h4>
          </div>
        );
    }
  };

  const renderContent = () => {
    return (
      hasContent && <div className="show-hide__content">{activityContent}</div>
    );
  };

  return (
    <div className="show-hide__wrapper">
      {renderHeader()}
      {renderContent()}
    </div>
  );
};

export default ShowHideText;
