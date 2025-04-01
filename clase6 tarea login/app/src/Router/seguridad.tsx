import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export interface userData{
    user: string;
    rol: "admin" | "user";
    password: string;
    name: string;
}

 interface seguridadPagina extends RouteProps {
    rolPermitido: Array<"admin" | "user">;
    user? : userData;
}
 const Seguridad : React.FC<seguridadPagina> = 
({rolPermitido, user, ...props}) => {

    useEffect(() => {
        if (user && rolPermitido && !rolPermitido.includes(user.rol)) {
          // Esto asegurará que la redirección ocurra inmediatamente si el rol no es permitido
          console.log("Acceso restringido: redirigiendo...");
        }
      }, [user, rolPermitido]);

    if(!user){
        return <Redirect to="/login" />
    }
    if(!rolPermitido.includes(user?.rol)){
        return <Redirect to="/unsucces" />
    }

    return <Route {...props} />
}

export default Seguridad;