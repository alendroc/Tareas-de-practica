import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { homeOutline, locateOutline, personOutline, triangle } from "ionicons/icons";
import { useAuth } from "../../contexts/authContext";

export const MenuLoggedIn = () => {
  const { user } = useAuth();
  return (
    <IonTabBar slot='bottom'>
      <IonTabButton tab='home' href='/'>
        <IonIcon aria-hidden='true' icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      {["admin"].includes(user?.rol || "") && (
        <IonTabButton tab='notificaciones' href='/notificaciones'>
          <IonIcon aria-hidden='true' icon={triangle} />
          <IonLabel>Notificaciones</IonLabel>
        </IonTabButton>
      )}

      <IonTabButton tab='location' href='/location'>
        <IonIcon aria-hidden='true' icon={locateOutline} />
        <IonLabel>Location</IonLabel>
      </IonTabButton>

      {["admin", "user"].includes(user?.rol || "") && (
        <IonTabButton tab='perfil' href='/perfil'>
          <IonIcon aria-hidden='true' icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      )}
    </IonTabBar>
  );
};
