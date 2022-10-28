import React from "react";

import "./VideoHeader.style.scss";

interface IProps {
  title: String;
}

const VideoHeader: React.FC<IProps> = (props: IProps) => {
  const { title } = props;

  return <h2 className="video-header">{title}</h2>;
};

export default VideoHeader;
