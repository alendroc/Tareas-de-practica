import {
    IonPage,
  } from '@ionic/react';
  import { useState } from 'react';
  import TopicSubscription from '../components/notification/TopicSubscription';
  import './Tab3.css';
  
  const Suscripcion: React.FC = () => {

    return (
      <IonPage>
        <TopicSubscription/>
      </IonPage>
    );
  };
  
  export default Suscripcion;
  