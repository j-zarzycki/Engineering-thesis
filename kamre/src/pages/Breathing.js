/* eslint-disable */

import {IonContent, IonPage} from '@ionic/react';
import './Breathing.css';
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import SaveButton from "../components/SaveButton";
import breathingService from "../services/breathing.services"


const Breathing = () => {

    const createBreathing = () => {

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ':' + time;

        breathingService.CreateBreathing(dateTime, "Breath").then(res => (console.log("działa ten post"))).catch(err => console.log(err))
    }

    return (
        <IonPage>
            <IonContent fullscreen class={"ion-padding-horizontal"}>
                <div className={"title"}>
                    <BackButton defaultHref="/home"/>
                    <Header title={"Oddychanie"}
                            subtitle={"poniżej znajdziesz instrukcję, krok po kroku jak wykonać zadanie"}/>
                </div>
                <div>

                </div>
                <div className="ion-text-center">
                    <SaveButton text={"Gotowe"} type={"submit"} onClick={createBreathing}/>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Breathing;
  