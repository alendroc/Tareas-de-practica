import { useEffect, useState } from "react";
import { IonText } from "@ionic/react";
import { auth } from "../../services/firebase/firebaseConfig";

import { onAuthStateChanged, User } from "firebase/auth";

export const MostrarDatosUsuario = () => {
  const [user, setUser] = useState<User | undefined>();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {user ? (
        <div>
          <IonText>
            <h2>Welcome, {user?.displayName}</h2>
            <p>Email: {user?.email}</p>
            <p>UID: {user?.uid}</p>
          </IonText>
        </div>
      ) : (
        <IonText>
          <p>No user is currently signed in.</p>
        </IonText>
      )}
    </>
  );
};
