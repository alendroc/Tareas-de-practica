import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Home from './pages/home';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Seguridad, {userData} from './Router/seguridad';
import { use, useState } from 'react';
import Login from './pages/login';

setupIonicReact();

const App: React.FC = () => {

  const [user, setuser] = useState<userData | undefined >();


    const userLogin = (user: userData)  =>
    {
      setuser(user);
    }

  return(
  <IonApp>

    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          <Route exact path="/login">
            <Login login={userLogin} />
          </Route>


          <Route exact path="/tab1">
            <Tab1 />
          </Route>

          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route> 

          <Seguridad rolPermitido={["admin"]} 
                user={user}
                    path={'/seguridad'} 
                    component={Tab2}  />

          <Route exact path="/">
           <Home/>
          </Route> 

        </IonRouterOutlet> 
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Services</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>

          <IonTabButton tab="seguridad" href="/seguridad">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Seguridad</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>)
}
;

export default App;
