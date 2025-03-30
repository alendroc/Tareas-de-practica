import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";

const Unauthorized: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sin permisos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>No tiene permisos necesarios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='No tiene permisos necesarios' />
      </IonContent>
    </IonPage>
  );
};

export default Unauthorized;
