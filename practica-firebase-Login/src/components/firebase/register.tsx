import React from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../services/firebase/firebaseConfig';
import { doc,setDoc } from 'firebase/firestore';
import { IonToast } from "@ionic/react"; 

const Register: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [showToast, setShowToast] = React.useState(false);

    async function registerUser(name:string, email: string, password: string, rol: string) {
        try {
          const infoUsuario = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(infoUsuario.user, {
            displayName: name,
          });
            const docuRef = doc(db,`userRol/${infoUsuario.user.uid}` );
            await  setDoc(docuRef, { name: name, correo: email, rol: rol });
            // Verificar si realmente existe
            
          } catch (error: any) {
            let mensaje = "Ocurrió un error al registrar el usuario.";
            switch (error.code) {
              case "auth/email-already-in-use":
                mensaje = "El correo ya está registrado.";
                break;
              case "auth/invalid-email":
                mensaje = "El correo no es válido.";
                break;
              case "auth/weak-password":
                mensaje = "La contraseña debe tener al menos 6 caracteres.";
                break;
              default:
                mensaje = "Error desconocido: " + error.message;
            }
            setErrorMessage(mensaje);
            setShowToast(true);
          }
        }
      
    
    function sumitHandler(event: React.FormEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const rol = (form.elements.namedItem('rol') as HTMLInputElement).value;
        console.log(email, password, rol);
        registerUser(name, email, password, rol).then(() => {
            console.log("Usuario registrado");
        }).catch((error) => {
            console.error("Error al registrar el usuario:", error);
        });
    }

return (
    <div className="login-access">
      <form onSubmit={sumitHandler}>
      <IonItem>
    <IonInput

      name="name"
      required
      placeholder="Firs name"
    ></IonInput>
  </IonItem>
      <IonItem>
    <IonInput
      type="email"
      name="email"
      required
      placeholder="Email"
    ></IonInput>
  </IonItem>
  <IonItem>
    <IonInput
      type="password"
      name="password"
      required
      placeholder="Password"
    ></IonInput>
  </IonItem>
  <IonItem>
  <IonSelect aria-label="rol" name='rol' interface="popover" placeholder="Select rol" required>
          <IonSelectOption value="admin">Admin</IonSelectOption>
          <IonSelectOption value="user">User</IonSelectOption>
        </IonSelect>
  </IonItem>
        <div className="login-button">
          <IonButton expand='block' type='submit'>
            Register
          </IonButton>
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <IonText color="medium">
            ¿Ya tienes una cuenta?{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={onToggleForm}
            >
              Inicia sesión
            </span>
          </IonText>
        </div>

      </form>
      <IonToast
        position="top"
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={errorMessage}
        duration={3000}
        color="warning"
      />
    </div>
)
}
export default Register;