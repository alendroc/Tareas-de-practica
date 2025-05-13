import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { useHistory } from "react-router-dom";
import { useCallback, useState } from "react";
import { IonButton, IonIcon, IonLoading } from "@ionic/react";
import { auth, authReady } from "../../services/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import {logoGoogle} from 'ionicons/icons';
const GoogleSignIn = () => {
  
    const [loading, setLoading] = useState(false);
  
    const history = useHistory();
  
    const signInWithGoogle = useCallback(async () => {
      try {
        setLoading(true);
        const result = await FirebaseAuthentication.signInWithGoogle();
        if (result?.user) {
          await authReady; 
          const credential = await GoogleAuthProvider.credential(result.credential?.idToken);
  
          const userCredential = await signInWithCredential(auth, credential);
          const user = userCredential.user;

          const docRef = doc(db, `userRol/${user.uid}`);
          const docSnap = await getDoc(docRef);
          
          if (!docSnap.exists()) {
            // Si no existe, crea el documento con rol general
            await setDoc(docRef, {
              name: user.displayName || "",
              correo: user.email || "",
              rol: "user", // rol por defecto
            });
          }
        
          setLoading(false);
          history.push("/home");
        } else {
          setLoading(false);
          alert("El inicio de sesión con Google falló o fue cancelado.");
        }
      } catch (error: any) {
        setLoading(false);
        alert("Error durante el inicio de sesión con Google: " + error.message);
      }
    }, [history]);
  
    if (loading) {
      return <IonLoading isOpen message='Cargando sesión...' />;
    }
  
    return (
      <IonButton onClick={signInWithGoogle} expand='block' >
        <IonIcon  icon={logoGoogle} color="white" style={{fontSize: "16px"}}></IonIcon>
        Google
      </IonButton>
    );
  };
  
  export default GoogleSignIn;
  