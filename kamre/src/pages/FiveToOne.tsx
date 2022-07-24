import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './FiveToOne.css';
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import SaveButton from "../components/SaveButton";

const FiveToOne: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen class={"ion-padding-horizontal"}>
                <div className={"title"}>
                    <BackButton defaultHref="/home"/>
                    <Header title={"Technika 5-4-3-2-1"}
                            subtitle={"ćwiczenie uważności"}/>
                </div>
                <div>
                    <IonList class="ion-text-wrap">
                        <IonItem>
                            <IonLabel className="ion-text-wrap">5. Rozejrzyj się i spróbuj nazwać pięć rzeczy, które widzisz wokół siebie</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-wrap">4. Teraz dotknij 4 rzeczy, poczuj ich fakturę, czy są przyjemne w dotyku, zimne, szorstkie ...</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-wrap">3. Wytęż słuch i nazwij trzy rzeczy, które słyszysz.</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-wrap">2. Daj się ponieść zapachom i poczuj dwa różne zapachy.</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-wrap">1. Na koniec, opisz smak, jaki aktualnie czujesz na języku.</IonLabel>
                        </IonItem>
                    </IonList>
                </div>
                <div className="ion-text-center" >
                    <SaveButton text={"Gotowe"} type={"submit"}/>
                </div>
            </IonContent>
        </IonPage>
    );
  };
  
  export default FiveToOne;
  