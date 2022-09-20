import React, { ChangeEvent } from "react";

import "./Input.style.scss";

interface IProps {
  type?: string;
  placeholder?: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

const Input: React.FC<IProps> = (props: IProps) => {
  const { type, placeholder, onChange } = props;
  return (
    <input
      className="kamre-input"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

Input.defaultProps = {
  type: "text",
  placeholder: "Podaj wartość...",
  onChange: () => console.log("clicked"),
};

export default Input;
