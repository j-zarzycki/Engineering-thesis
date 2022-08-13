import React from "react";

interface IProps {
  title: String;
  subtitle: String;
}

const Header: React.FC<IProps> = (props: IProps) => {
  const { title, subtitle } = props;

  return (
    <div className="ion-text-center">
      <h3>{title}</h3>
      <h6>{subtitle}</h6>
    </div>
  );
};

export default Header;
