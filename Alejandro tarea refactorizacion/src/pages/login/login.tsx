import { useState } from "react";
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useAuth } from "./contextoLogin";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
    const {login} = useAuth();
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const ruta = useHistory();

    const handleLogin = () => {
        const exito = login(user, password);
        if(exito){
            ruta.push("/tab1");
        } else{
            alert("Usuario o contraseña incorrectos");
        }
    }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Iniciar Sesión</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput placeholder="Usuario" onIonChange={e => setUser(e.detail.value!)} />
            <IonInput type="password" placeholder="Contraseña" onIonChange={e => setPassword(e.detail.value!)} />
            <IonButton expand="full" onClick={handleLogin}>Ingresar</IonButton>
          </IonContent>
        </IonPage>
      );
};

export default Login;
