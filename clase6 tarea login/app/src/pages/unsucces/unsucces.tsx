import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { userData } from '../../Router/seguridad';
const Unsucces: React.FC<{login: (user: userData) => void }> = ({login}) => {
 const history = useHistory();

 const rediceccionLogin = () => {
    login({ user: "", rol: "user" } as userData);
    history.push('/login')
  }

 
return (
    <IonPage>
    <IonContent className="ion-padding">
      <h1 style={{ textAlign: 'center', color: 'red' }}>
        Acceso restringido
      </h1>
      <p style={{ textAlign: 'center' }}>
        Usuario no permitido, inicia sesión con un perfil de administrador.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <IonButton onClick={() => rediceccionLogin()}>
          Ir a Login
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
)

};
export default Unsucces;