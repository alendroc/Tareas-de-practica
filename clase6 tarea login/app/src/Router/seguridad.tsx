import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export interface userData{
    user: string;
    rol: "admin" | "user";
}

 interface seguridadPagina extends RouteProps {
    rolPermitido: Array<"admin" | "user">;
    user? : userData;
}
 const Seguridad : React.FC<seguridadPagina> = 
({rolPermitido, user, ...props}) => {

    if(!user){
        return <Redirect to="/login" />
    }
    if( rolPermitido && !rolPermitido.includes(user?.rol || "" )){
        return <Redirect to="/nopermitido" />
    }

    return <Route {...props} />
}

export default Seguridad;