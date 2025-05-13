import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { LogoutButton }  from "../components/firebase/logOut";
import { auth } from "../services/firebase/firebaseConfig";
import { MostrarDatosUsuario } from "../pages/profile/profile";
import './Tab2.css';

const Tab2: React.FC = () => {
  const user = auth.currentUser;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pefil</IonTitle>
          <div slot="end" style={{marginRight: '10px'}}>
          <LogoutButton/>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pefil</IonTitle>
          </IonToolbar>
        </IonHeader>
        {user ? (
          <>
            <MostrarDatosUsuario />
          </>
        ) : (
          <div>No esta logueado</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
