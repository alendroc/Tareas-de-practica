import React from "react";
import { Route, Redirect, RouteProps } from "react-router";

export interface userdata {
  usuario: string;
  rol: "admin" | "user";
}

interface seguridadProps extends RouteProps {
  rolesPermitidos?: Array<"admin" | "user">;
  user?: userdata;
}
const Seguridad: React.FC<seguridadProps> = ({ rolesPermitidos, user, ...rest }) => {
  if (!user) {
    return <Redirect to={`/login`} />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user?.rol || "user")) {
    return <Redirect to={`/unauthorized`} />;
  }

  return <Route {...rest} />;
};

export default Seguridad;
