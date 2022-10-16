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
import { triangle } from "ionicons/icons";
import SmallSteps from "@Pages/SmallSteps";
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
import Music from "./pages/Music";
import Emergency from "./pages/Emergency";
import Weights from "./pages/Weights";
import Visualization from "./pages/Visualization";
import Page403 from "./pages/Page403";
import SoundMix from "./pages/SoundMix";
import ColdWater from "./pages/ColdWater";
import Creativity from "./pages/Creativity";
import Breathing from "./pages/Breathing";
import SchulzTraining from "./pages/SchulzTraining";
import EduVideo from "./pages/EduVideo";

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
    dispatch(authLogin("test_user"));
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/shower" component={ConsciousShower} />
            <Route path="/home" component={Home} />
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
            <Route exact path="/schulztraining" component={SchulzTraining} />
            <Route exact path="/eduvideo" component={EduVideo} />
            <Route
              exact
              path="/deleteaccountpage"
              component={DeleteAccountPage}
            />
            <Route
              exact
              path="/migrateaccountpage"
              component={MigrateAccountPage}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
