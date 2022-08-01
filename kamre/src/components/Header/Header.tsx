import React from "react";
import "./Header.css";

interface Props {
  title: String;
  subtitle: String;
}

const Header: React.FC<Props> = (props: Props) => {
  const { title, subtitle } = props;
  return (
    <div className="ion-text-center">
      <h3>{title}</h3>
      <h6>{subtitle}</h6>
    </div>
  );
};
export default Header;
