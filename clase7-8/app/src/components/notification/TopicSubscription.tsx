import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonToast,
} from '@ionic/react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { PushNotifications } from '@capacitor/push-notifications';
import { db } from '../../Services/firebase/config/firebaseConfig';

interface Topic {
  id: string;
  name: string;
  subscribed: boolean;
}

const TopicSubscription: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    { id: 'sports', name: 'Deportes', subscribed: false },
    { id: 'challenges', name: 'Nuevos Retos', subscribed: false },
  ]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    // Escuchar token recibido
    PushNotifications.addListener('registration', async (token) => {
      console.log('Token FCM obtenido:', token.value);
      setFcmToken(token.value);
      await loadUserSubscriptions(token.value);
    });

    // Escuchar error de registro
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Error al registrar el dispositivo:', error);
      setToastMessage('Error al registrar el dispositivo');
      setShowToast(true);
    });

    // Solicitar permisos y registrar
    const init = async () => {
      try {
        const permStatus = await PushNotifications.requestPermissions();
        if (permStatus.receive === 'granted') {
          await PushNotifications.register();
        } else {
          console.warn('Permiso para notificaciones no concedido');
        }
      } catch (error) {
        console.error('Error inicializando notificaciones:', error);
      }
    };

    init();
  }, []);

  const loadUserSubscriptions = async (token: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'userTopic', token));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setTopics(prevTopics =>
          prevTopics.map(topic => ({
            ...topic,
            subscribed: userData.topics?.includes(topic.id) || false
          }))
        );
      }
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    }
  };

  const handleToggle = async (topicId: string) => {
    if (!fcmToken) {
      setToastMessage('Error: No se pudo obtener el token de registro');
      setShowToast(true);
      return;
    }

    const topic = topics.find(t => t.id === topicId);
    const willSubscribe = !topic?.subscribed;
    const action = willSubscribe ? 'subscribe' : 'unsubscribe';

    try {
      // Llama a tu API backend para suscribir/desuscribir
      const response = await fetch('http://10.0.2.2:3000/api/manage-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: fcmToken, topic: topicId, action }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Error en la suscripci贸n');
      }

      // Actualiza local y en Firestore si fue exitoso
      const updatedTopics = topics.map(t =>
        t.id === topicId ? { ...t, subscribed: willSubscribe } : t
      );
      setTopics(updatedTopics);

      await setDoc(doc(db, 'userTopic', fcmToken), {
        topics: updatedTopics.filter(t => t.subscribed).map(t => t.id),
        token: fcmToken,
        lastUpdated: new Date().toISOString(),
      }, { merge: true });

      setToastMessage(`${willSubscribe ? 'Suscrito a' : 'Desuscrito de'} ${topic?.name}`);
    } catch (error) {
      console.error('Error actualizando suscripcion:', error);
      setToastMessage('Error al actualizar la suscripci贸n');
    }

    setShowToast(true);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Suscripcion a Temas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {topics.map((topic) => (
            <IonItem key={topic.id}>
              <IonLabel>{topic.name}</IonLabel>
              <IonToggle
                checked={topic.subscribed}
                onIonChange={() => handleToggle(topic.id)}
              />
            </IonItem>
          ))}
        </IonList>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </>
  );
};

export default TopicSubscription;