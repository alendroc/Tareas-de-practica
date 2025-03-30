import { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { userData } from '../../Router/seguridad';

interface usuario{
    login: (user : userData)=>void
}

const Login: React.FC<usuario> = ({login} ) => {
 
    useEffect( ()=>{
        
        login({user: "", rol: "admin"} as userData)

        },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader> 

        Estamos en el login
      </IonContent>
    </IonPage>
  );
};

export default Login;
