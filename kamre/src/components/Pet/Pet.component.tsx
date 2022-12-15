import React from "react";
import { IonImg, IonRow } from "@ionic/react";

interface IProps {
  src: any;
  alt: any;
  height: "200px" | string;
  paddingTop: "20px";
  paddingBottom: "20px" | "10px";
}

const Pet: React.FC<IProps> = (props: IProps) => {
  const { src, alt, height, paddingTop, paddingBottom } = props;

  return (
    <IonRow className="ion-align-items-start">
      <IonImg
        className="pet-octopus"
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

export default Pet;
