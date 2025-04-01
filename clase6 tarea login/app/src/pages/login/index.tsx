import { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { userData } from '../../Router/seguridad';
import { useHistory } from 'react-router';
import './login.css'
import { text } from 'ionicons/icons';
interface usuario{
    login: (user : userData)=>void
}

const Login: React.FC<usuario> = ({login} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [readyToLogin, setReadyToLogin] = useState(false); // Estado para validar cuando ambos inputs estén listos

  const history = useHistory();
  
  const users = [
    { user: 'admin', rol: 'admin', password: 'admin123', name: 'Admin User' },
    { user: 'user1', rol: 'user', password: 'user123', name: 'User One' },
];

useEffect(() => {
  console.log("Username:", username, "Password:", password);
  if (username !== '' && password !== '') {
    setReadyToLogin(true);
  }
}, [username, password]); // Se ejecuta cada vez que `username` o `password` cambian

const handleLogin = () => {
  if (!readyToLogin) {
    setError('Por favor, completa ambos campos antes de iniciar sesión.');
    return;
  }

  console.log("Verificando usuario:", username, password);
  const foundUser = users.find((u) => u.user === username && u.password === password);

  if (foundUser) {
    login({ user: foundUser.user, rol: foundUser.rol } as userData);
    history.push('/tab1');
  } else {
    setError('Credenciales incorrectas');
  }
};

    // useEffect( ()=>{
        
    //     login({user: "", rol: "admin"} as userData)

    //     },[])

  return (
    <IonPage>

       
        <div style={{ padding: '20px', display: 'flex', 
    flexDirection: 'column',
    
    alignItems: 'center', 
    height: '100vh' }}>
      <div className='estilo' >
            <h1>Login</h1>
            <IonInput className="input-custom"
                value={username}
                onInput={(e: any) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
            />
            <IonInput
              className="input-custom"
                type="password"
                value={password}
                onInput={(e: any) => setPassword(e.target.value)}
                placeholder="Contraseña"
            />
            <IonButton
            style={{width: '100%', marginTop: '10px', color: "white"}}
             onClick={handleLogin}>Iniciar sesión
             </IonButton>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>

</IonPage>
  );
};

export default Login;
