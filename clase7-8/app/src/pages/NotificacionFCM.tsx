import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonTextarea, IonInput, IonLabel, IonItem } from '@ionic/react';
import React, { useState } from 'react';

const PushNotificationSender: React.FC = () => {
    const [isSending, setIsSending] = useState(false);
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [data, setData] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending) return; 
    setIsSending(true);
    try {
      const payload = {
        token,
        title,
        body,
        data: data ? JSON.parse(data) : {}
      };

      const res = await fetch('http://10.0.2.2:3000/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();
      setResponse(JSON.stringify(resData, null, 1));
    } catch (err: any) {
      setResponse('Error al enviar la notificación: ' + err.message);
    }finally {
    setIsSending(false);
  }
  };

  return (
     <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enviar Notificación Push</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Token del dispositivo</IonLabel>
            <IonTextarea value={token} onIonChange={(e) => setToken(e.detail.value!)} required />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Título</IonLabel>
            <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)} required />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Mensaje</IonLabel>
            <IonTextarea value={body} onIonChange={(e) => setBody(e.detail.value!)} required />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Datos adicionales (JSON - opcional)</IonLabel>
            <IonTextarea value={data} onIonChange={(e) => setData(e.detail.value!)} placeholder='{"key1": "value1"}' />
          </IonItem>

          <IonButton expand="block" type="submit" className="ion-margin-top" disabled={isSending}>
                 {isSending ? 'Enviando...' : 'Enviar Notificación'}
            </IonButton>
        </form>

        {response && (
          <div className="ion-margin-top">
            <h3>Respuesta</h3>
            <pre>{response}</pre>
          </div>
        )}
      </IonContent>
      </>
  );
};

export default PushNotificationSender;