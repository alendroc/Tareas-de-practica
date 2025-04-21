import {  IonLabel, IonTabButton, IonIcon, } from "@ionic/react";
import {logOut } from 'ionicons/icons';
import { useHistory } from "react-router-dom";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { auth } from "../../services/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { IonAlert, IonButton } from '@ionic/react';
import { useState } from "react";


export const LogoutButton = () => {
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await FirebaseAuthentication.signOut();
      history.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <IonTabButton style={{width: "100%"}} tab="logout-action" onClick={() => setShowAlert(true)}>
        <IonIcon icon={logOut} color="danger" />
        <IonLabel color="danger">Logout</IonLabel>
      </IonTabButton>

      <IonAlert
        isOpen={showAlert}
        header="sure you want to log out?"
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
          },
          {
            text: "Sí",
            handler: handleLogout,
          },
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </>
  );
};