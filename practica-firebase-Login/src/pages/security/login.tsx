import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import LoginNormal from "../../components/firebase/loginNormal";
import "./login.css"
import { useState } from "react";
import Register from "../../components/firebase/register";
export const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () =>{ 
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setShowRegister(prev => !prev);}
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{showRegister ? "Registro" : "Ingreso"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="login-container">
          {showRegister ? 
            <Register onToggleForm={toggleForm} />
 : 
            <LoginNormal onToggleForm={toggleForm} />
          }
        </div>
      </IonContent>
    </IonPage>
  );
}