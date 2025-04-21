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
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel> 
          </IonTabButton>
          {rol === "admin" && (
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Admin Button</IonLabel>
        </IonTabButton>
      )}
          <IonTabButton tab="logout-action1" className="papaOut" style={{paddin:"0px"}}>
            <LogoutButton />
          </IonTabButton>
         
    </IonTabBar>
);

};
