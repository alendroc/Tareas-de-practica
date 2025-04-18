import { createContext, useContext, useState, useEffect } from "react";

export interface userData {
    user: string;
    password: string;
    rol: "admin" | "user";
  }
  
  const usersDB: userData[] = [
    { user: "admin", password: "1234", rol: "admin" },
    { user: "user", password: "5678", rol: "user" }
  ];

  interface ContextLogin{ 
    //Nos permitira definir el tipo de datos que se guardaran en el contexto
    //Contexto es un objeto que contiene el estado y la funcion para actualizarlo
    // poder acceder a los datos del contexto desde cualquier componente
    user: userData | null;
    login: (user: string, password: string) => boolean; //devuelve true o false si el login es correcto o no
    logout: () => void; //funcion para cerrar sesion, reinicia el estado del contexto osea el usuario a null
  }

    //nos permite crear un contexto con un valor inicial de undefined
    //comparte el estado y la funcion para actualizarlo gracias al createContext
  const ContextoLogin = createContext<ContextLogin | undefined>(undefined);

  // Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(ContextoLogin);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
  };

  //Acordarse que esta funcion es un hook que nos permite acceder al contexto
  //nos permite comparar datos del usuario qeue se logea con los datos de la base de datos
  //el children es el componente que se va a renderizar
  export const ProviderLogin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    //estado inicial del contexto es null pues no hay usuario logeado
    const [user, setUser] = useState<userData | null>(null);

    const login = (usernmae: string, password: string): boolean => {
        const userFound = usersDB.find( e => e.user === usernmae && e.password === password);
        if(userFound){
            setUser(userFound);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return(
        <ContextoLogin.Provider value={{ user, login, logout }}>
            {children}
        </ContextoLogin.Provider>
    )

  };