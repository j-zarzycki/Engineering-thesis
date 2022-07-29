import React from 'react';
import './Header.css';

interface IProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<IProps> = (props) => {
  const { title, subtitle } = props;
  return (
    <div className="ion-text-center">
      <h3>{title}</h3>
      <h6>{subtitle}</h6>
    </div>
  );
};

export default Header;
