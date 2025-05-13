import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/react';
import NotificationIcon from '../components/notification/notificationIcon';
import ExploreContainer from '../components/ExploreContainer';
import FirebaseStatus from '../components/verifyConeccion/apiNotification'
import './home.css';
import "../components/notification/notificationicon.css";
const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar-flex'>
          <IonTitle>Home</IonTitle>
          <div slot="end">
          <FirebaseStatus></FirebaseStatus>  
          </div>
          <IonButtons slot='end'>
          <NotificationIcon />
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Pagina principal" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
