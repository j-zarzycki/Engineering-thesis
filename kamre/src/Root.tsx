import React, { useEffect } from "react";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import { triangle, flash, today } from "ionicons/icons";
import { Redirect, Route, useLocation } from "react-router-dom";

import { checkIfTokenIsValid } from "@Utils/date";
import useLocalStorage from "@Hooks/useLocalStorage";
import YtPage from "@Pages/YtPage";
import SmallSteps from "@Pages/SmallSteps";
import Note from "@Pages/Note";
import PreviousDay from "@Pages/PreviousDay";
import GoodWord from "@Pages/GoodWord";
import Feet from "@Pages/Feet";
import Gratitude from "./pages/Gratitude";
import Walking from "./pages/Walking";
import FiveToOne from "./pages/FiveToOne";
import Home from "./pages/Home";
import All from "./pages/All";
import Anger from "./pages/Anger";
import ConsciousShower from "./pages/ConsciousShower";
import Calendar from "./pages/Calendar";
import Bike from "./pages/Bike";
import PrepareMeal from "./pages/PrepareMeal";
import Settings from "./pages/Settings";
import MigrateAccountPage from "./pages/MigrateAccountPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Music from "./pages/Music";
import Emergency from "./pages/Emergency";
import Weights from "./pages/Weights";
import Visualization from "./pages/Visualization";
import Page403 from "./pages/Page403";
import SoundMix from "./pages/SoundMix";
import ColdWater from "./pages/ColdWater";
import Creativity from "./pages/Creativity";
import Breathing from "./pages/Breathing";
import SchultzTraining from "./pages/SchultzTraining";
import EduVideo from "./pages/EduVideo";
import WelcomePage from "./pages/WelcomePage";
import VerifyUser from "./pages/VerifyUser";

const Root: React.FC = () => {
  const { value: shouldHomeRender } = useLocalStorage("shouldHomeRender");
  const { value: tokenExp } = useLocalStorage("token_exp");
  const { value: token } = useLocalStorage("token");
  const location = useLocation();
  const router = useIonRouter();

  useEffect(() => {
    console.log("location = ", location);
    console.log("is valid = ", checkIfTokenIsValid(String(tokenExp)));
    if (
      shouldHomeRender === "true" &&
      (!token || !checkIfTokenIsValid(String(tokenExp)) || !tokenExp)
    ) {
      router.push("/verify", "forward", "pop");
    }
  }, [location]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/verify" component={VerifyUser} />
        <Route path="/welcompage" component={WelcomePage} />
        <Route path="/all" component={All} />
        <Route path="/shower" component={ConsciousShower} />
        <Route path="/settings" component={Settings} />
        <Route path="/walking" component={Walking} />
        <Route path="/fivetoone" component={FiveToOne} />
        <Route path="/gratitude" component={Gratitude} />
        <Route path="/ytpage" component={YtPage} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/anger" component={Anger} />
        <Route exact path="/smallsteps" component={SmallSteps} />
        <Route exact path="/goodword" component={GoodWord} />
        <Route exact path="/feet" component={Feet} />
        <Route exact path="/previousday" component={PreviousDay} />
        <Route exact path="/note" component={Note} />
        <Route exact path="/bike" component={Bike} />
        <Route exact path="/preparemeal" component={PrepareMeal} />
        <Route exact path="/music" component={Music} />
        <Route exact path="/emergency" component={Emergency} />
        <Route exact path="/weights" component={Weights} />
        <Route exact path="/403" component={Page403} />
        <Route exact path="/sounds" component={SoundMix} />
        <Route exact path="/coldwater" component={ColdWater} />
        <Route exact path="/visualization" component={Visualization} />
        <Route exact path="/creativity" component={Creativity} />
        <Route exact path="/breathing" component={Breathing} />
        <Route exact path="/schultztraining" component={SchultzTraining} />
        <Route exact path="/eduvideo" component={EduVideo} />
        <Route exact path="/deleteaccountpage" component={DeleteAccountPage} />
        <Route
          exact
          path="/migrateaccountpage"
          component={MigrateAccountPage}
        />
        <Route exact path="/privacypolicy" component={PrivacyPolicy} />
        <Route exact path="/">
          {shouldHomeRender === "false" ||
          shouldHomeRender === null ||
          shouldHomeRender === undefined ? (
            <Redirect to="/welcompage" />
          ) : (
            <Redirect to="/home" />
          )}
        </Route>
        <Route path="/home" component={Home} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="emergency" href="/emergency">
          <IonIcon icon={flash} />
          <IonLabel>Szybka pomoc</IonLabel>
        </IonTabButton>
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={triangle} />
          <IonLabel>Strona główna</IonLabel>
        </IonTabButton>
        <IonTabButton tab="calendar" href="/calendar">
          <IonIcon icon={today} />
          <IonLabel>Kalendarz</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Root;
