import React from 'react';
import './Header.css'

interface Props {
    title : String
    subtitle: String
}

export const Header: (props: Props) => JSX.Element = (props:Props) => (
    <div className="ion-text-center">
        <h3>{props.title}</h3>
        <h6>{props.subtitle}</h6>
    </div>
);
export default Header