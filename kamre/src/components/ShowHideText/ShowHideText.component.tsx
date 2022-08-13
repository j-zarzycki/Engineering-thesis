import React, { useState } from "react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

import { CalendarResponseType } from "@Types/calendar.type";

import "./ShowHideText.style.css";

interface IProps {
  dayContent: CalendarResponseType;
}

const ShowHideText: React.FC<IProps> = (props: IProps) => {
  const {
    dayContent: {
      activity_content: activityContent,
      activity_name: activityName,
      has_content: hasContent,
    },
  } = props;

  const [isExpanded, setIsExpanded] = useState<Boolean>(false);

  const onExpandIconClick = () => setIsExpanded(!isExpanded);

  return (
    <div className="show-hide">
      <div className="show-hide__Wrapper">
        <h4 className="show-hide__header" onClick={onExpandIconClick}>
          {activityName}
          {isExpanded ? <HiChevronUp size={30} /> : <HiChevronDown size={30} />}
        </h4>
        <div
          className={`show-hide__hidden-block${
            hasContent && isExpanded ? "--isVisible" : ""
          }`}
        >
          {activityContent}
        </div>
      </div>
    </div>
  );
};

export default ShowHideText;
