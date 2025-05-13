import {  IonLabel,IonTabBar, IonTabButton, IonTabs,  IonIcon, } from "@ionic/react";
import { ellipse, square, triangle,logOut } from 'ionicons/icons';
import "./option.css"
import { LogoutButton }  from "../firebase/logOut";
export const ButonNavegation = ({ rol }: { rol: string }) => {

return (
<IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home"> 
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Perfil" href="/perfil">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Perfil</IonLabel> 
          </IonTabButton>
        {rol === "admin" && (
        <IonTabButton tab="notification" href="/notification">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Notification</IonLabel>
        </IonTabButton>
      )}
       <IonTabButton tab="suscription" href="/suscription">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>suscription</IonLabel> 
          </IonTabButton>
          {/*<IonTabButton tab="logout-action1" className="papaOut" style={{paddin:"0px"}}>
            <LogoutButton/>
          </IonTabButton>*/}
         
    </IonTabBar>
);

};
