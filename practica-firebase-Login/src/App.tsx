import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {ButonNavegation} from './components/menu/option';
import Home from './pages/home';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import {Login} from './pages/security/login';
import { useAuth } from './components/context/userContext';
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

setupIonicReact();

const App: React.FC = () => {
  const {user, rol, loading}= useAuth(); // Ensure 'user' exists in UserContextType
  console.log(user, rol);
 if(loading){
    return (
      <IonApp>
        <div className="centered-loading" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IonSpinner name="crescent" />
        </div>
      </IonApp>
    );
  }
  return(
  <IonApp>
    <IonReactRouter>
      {user ? (
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/tab2" component={Tab2} />
          <Route path="/tab3" component={Tab3} />
           <Route exact path="/">
            <Redirect to="/home" />
          </Route>
         {/*<Route path="*">
                <Redirect to="/home" />
          </Route>*/} 
        </IonRouterOutlet>
        <ButonNavegation rol={rol || 'defaultRole'}/>
      </IonTabs>
      ) : (
      <>
      <Route exact path="/login" component={Login} />
     <Route path="*">
        <Redirect to="/login" />
      </Route>
    </>
      )}
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
