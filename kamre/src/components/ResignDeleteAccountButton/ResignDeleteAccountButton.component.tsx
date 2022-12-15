import React from "react";
import { useIonRouter } from "@ionic/react";
import { BiChevronRight } from "react-icons/bi";

import "./ResignDeleteAccountButton.style.scss";

interface IProps {
  title: String;
  icon?: React.ReactElement;
  disabled?: boolean;
}

const ResignDeleteAccountButton: React.FC<IProps> = (props: IProps) => {
  const { title, icon, disabled } = props;

  const router = useIonRouter();
  const onClickHandler = () => router.goBack();

  return (
    <button
      className="resign-delete-account-button"
      type="button"
      onClick={onClickHandler}
      disabled={disabled}
    >
      {title}
      {icon}
    </button>
  );
};

ResignDeleteAccountButton.defaultProps = {
  disabled: false,
  icon: <BiChevronRight size={40} />,
};

export default ResignDeleteAccountButton;
