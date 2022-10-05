import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { triangle, settings } from "ionicons/icons";
import Sufficient from "@Pages/Sufficient";
import Note from "@Pages/Note";
import PreviousDay from "@Pages/PreviousDay";
import { authLogin } from "@Actions/auth";
import useAppDispatch from "@Hooks/useAppDispatch";
import GoodWord from "@Pages/GoodWord";
import Feet from "@Pages/Feet";
import Gratitude from "./pages/Gratitude";
import Walking from "./pages/Walking";
import FiveToOne from "./pages/FiveToOne";
import Home from "./pages/Home";
import Anger from "./pages/Anger";
import ConsciousShower from "./pages/ConsciousShower";
import Calendar from "./pages/Calendar";
import Bike from "./pages/Bike";
import PrepareMeal from "./pages/PrepareMeal";
import Settings from "./pages/Settings";
import MigrateAccountPage from "./pages/MigrateAccountPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Home css */
import "./pages/App.scss";
import YtPage from "./pages/YtPage";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authLogin("A21KS"));
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/shower">
              <ConsciousShower />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="/walking">
              <Walking />
            </Route>
            <Route path="/fivetoone">
              <FiveToOne />
            </Route>
            <Route path="/gratitude">
              <Gratitude />
            </Route>
            <Route path="/ytpage">
              <YtPage />
            </Route>
            <Route exact path="/calendar">
              <Calendar />
            </Route>
            <Route exact path="/anger">
              <Anger />
            </Route>
            <Route exact path="/sufficient">
              <Sufficient />
            </Route>
            <Route exact path="/goodword">
              <GoodWord />
            </Route>
            <Route exact path="/feet">
              <Feet />
            </Route>
            <Route exact path="/previousday">
              <PreviousDay />
            </Route>
            <Route exact path="/note">
              <Note />
            </Route>
            <Route exact path="/bike">
              <Bike />
            </Route>
            <Route exact path="/preparemeal">
              <PrepareMeal />
            </Route>
            <Route exact path="/deleteaccountpage">
              <DeleteAccountPage />
            </Route>
            <Route exact path="/migrateaccountpage">
              <MigrateAccountPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
