import { IonPage, IonContent } from "@ionic/react";
import React, { useEffect } from "react";
import Pet from "@Components/Pet";
import img from "@Assets/cry.png";

import "./Page403.style.scss";

const Page403: React.FC = () => {
  useEffect(() => {
    const tabBar = document.querySelector("ion-tab-bar");
    tabBar!.style.display = "none";
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding-horizontal">
        <div className="page-403">
          <Pet
            src={img}
            alt="Uśmiechnięta ośmiorniczka jpg"
            height="200px"
            paddingTop="20px"
            paddingBottom="20px"
          />
          <h4>
            Przepraszamy, ale nasze usługi są w tym momencie niedostępne.
            Spróbuj później
          </h4>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Page403);
