/* eslint-disable */

import {IonContent, IonItem, IonLabel, IonList, IonPage} from '@ionic/react';
import './Walking.css';
import BackButton from "../components/BackButton";
import SaveButton from "../components/SaveButton";
import Header from "../components/Header";
import walkingService from "../services/walking.services"


const Walking = () => {

    const createWalking = () => {

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ':' + time;

        walkingService.CreateWalking(dateTime, "Spacer").then(res => (console.log("działa ten post"))).catch(err => console.log(err))
    }


    return (
        <IonPage>
            <IonContent fullscreen class={"ion-padding-horizontal"}>
                <div className={"title"}>
                    <BackButton defaultHref="/home"/>
                    <Header title={"Świadomy Spacer"}
                            subtitle={"poniżej znajdziesz instrukcję, krok po kroku jak wykonać zadanie"}/>
                </div>
                <div>
                    <IonList class="ion-text-wrap">
                        <IonItem>
                            <IonLabel>1. Wstań i załóż buty.</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>2. Najpierw spróbuj wyjść poza swoją posesję.</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-wrap">3. Gdy już to zrobisz, wybierz kierunek - lewo, prawo,
                                może prosto?</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-wrap">4. W trakcie spaceru skup się na tym co słyszysz,
                                widzisz, czujesz. Daj swoim emocjom Cię ponieść.</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>5. Po spacerze zanotuj swoje odczucia.</IonLabel>
                        </IonItem>
                    </IonList>
                </div>
                <div class="ion-text-center">
                    <SaveButton text={"Gotowe"} type={"submit"} onClick={createWalking}/>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Walking;
  