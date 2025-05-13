import {   IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig'; 

const PushNotificationSender: React.FC = () => {
    const [isSending, setIsSending] = useState(false);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [selectedToken, setSelectedToken] = useState<string>('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [data, setData] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchTokens = async () => {
          const snapshot = await getDocs(collection(db, 'deviceTokens'));
          const list = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              token: data.token, // aquí accedemos al campo `token` del documento
              id: doc.id         // esto por si necesitas mostrar el ID del usuario
            };
          });
          setUsuarios(list);
          console.log("tokens",list)
        };
        fetchTokens();
      }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending) return; 
    setIsSending(true);
    try {
      const payload = {
        token: selectedToken,
        title,
        body,
        data: data ? JSON.parse(data) : {}
      };
      console.log(payload)
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
   
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
          <IonLabel position="stacked">Usuarios a notificar</IonLabel>
          <IonSelect
                value={selectedToken}
                onIonChange={(e) => setSelectedToken(e.detail.value)}
                placeholder="Seleccionar usuario">
                     {usuarios.map((user) => (
                    <IonSelectOption key={user.id} value={user.token}>
                   {user.token}
                 </IonSelectOption>
                 ))}
            </IonSelect>
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