import { initializeApp } from "firebase/app";
import { getAuth , setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyDSeuDktyICaP1jUk_XM1q0BgtOS0BsXec",
  authDomain: "practica-7c621.firebaseapp.com",
  projectId: "practica-7c621",
  storageBucket: "practica-7c621.firebasestorage.app",
  messagingSenderId: "190466759683",
  appId: "1:190466759683:web:89a01058da62f1a67c4236",
  measurementId: "G-6BKJBVJNSQ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

const authReady = setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistencia configurada correctamente.");
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia:", error);
  });
 
export { auth, db, messaging, authReady };