import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
} from '@ionic/react';
import { useState } from 'react';
import PushNotificationSender from './NotificationForm/NotificacionFCM';
import PushNotificationTopic from './NotificationForm/NotificacionTopic';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [mode, setMode] = useState<'token' | 'topic'>('token');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones Push</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setMode('token')} color={mode === 'token' ? 'primary' : 'medium'}>
              Por Token
            </IonButton>
            <IonButton onClick={() => setMode('topic')} color={mode === 'topic' ? 'primary' : 'medium'}>
              Por Topic
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {mode === 'token' ?   <PushNotificationSender /> : <PushNotificationTopic />}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
