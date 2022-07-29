import './ExploreContainer.css';
import React from 'react';

interface IProps {
  name: string;
}

const ExploreContainer: React.FC<IProps> = (props) => {
  const { name } = props;
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>
        Explore
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
    </div>
  );
};

export default ExploreContainer;
