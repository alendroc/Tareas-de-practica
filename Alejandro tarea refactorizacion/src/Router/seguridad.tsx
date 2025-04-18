import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../pages/login/contextoLogin";

interface seguridadPagina extends RouteProps {
    rolPermitido: Array<"admin" | "user">;
}
 const Seguridad : React.FC<seguridadPagina> = 
({rolPermitido, ...props}) => {
    const {user} = useAuth()
    console.log(user)

    if(!user){
        console.log("No hay usuario logeado")
        return <Redirect to="/login" />
    }
    if(!rolPermitido.includes(user.rol || :)){
        return <Redirect to="/nopermitido" />
    }

    return <Route {...props} />
}

export default Seguridad;