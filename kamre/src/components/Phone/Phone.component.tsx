import React from "react";
import { IonImg, IonRow } from "@ionic/react";

interface IProps {
  src: any;
  alt: any;
  height: "100px" | string;
  paddingTop: "20px";
  paddingBottom: "20px" | "10px"; // jeżeli ktoś chce dodać swój padding robi tak: | "15px"
}

const Phone: React.FC<IProps> = (props: IProps) => {
  const { src, alt, height, paddingTop, paddingBottom } = props;

  return (
    <IonRow className="ion-align-items-start">
      <IonImg
        src={src}
        alt={alt}
        style={{
          height,
          paddingTop,
          paddingBottom,
        }}
      />
    </IonRow>
  );
};

export default Phone;
