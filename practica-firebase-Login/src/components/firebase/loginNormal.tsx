import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IonInput, IonButton, IonItem, IonLabel, IonText, IonLoading, IonIcon } from "@ionic/react";
import { auth, authReady } from "../../services/firebase/firebaseConfig";
import GoogleSignIn from "./loginGoogle";
import { personOutline,lockClosedOutline } from 'ionicons/icons';

const LoginNormal: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();
    
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
          await authReady;
          await signInWithEmailAndPassword(auth, email, password).then(() => {
            setLoading(false);
            history.replace("/home");
          });
        } catch (error: any) {
          setLoading(false);
          setError(error.message);
        }
      };
    
      if (loading) {
        return <IonLoading isOpen message='Cargando sesión...' />;
      }
    
    
    return (
        <div className="login-access">
          <form onSubmit={handleLogin}>
        <IonItem>
          <IonIcon aria-hidden="true" icon={personOutline} color="white" />
          <IonInput type='email' value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
        </IonItem>
        <IonItem>
          <IonIcon aria-hidden="true" icon={lockClosedOutline} color="white"/>
          <IonInput type='password' value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
        </IonItem>
        {error && (
          <IonText color='danger'>
            <p>Error in password or email</p>
          </IonText>
        )}
        <div  className="login-button">
        <IonButton expand='block' type='submit' >
          Login
        </IonButton>
        <GoogleSignIn />
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <IonText color="medium">
            ¿No tienes una cuenta?{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={onToggleForm}
            >
              Regístrate aquí
            </span>
          </IonText>
        </div>
         </form>
        </div>
    );
}

export default LoginNormal;