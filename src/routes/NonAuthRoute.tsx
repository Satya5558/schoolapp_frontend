import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { useAuthenticated } from "../hooks/authHook";
import { RootState } from "../store";
import { JwtPayloadData } from "../types/jwtPayloadData";

const NonAuthRoute = ({ component: Component, ...rest }) => {
  let redirectPath = "/";

  const token = useSelector((state: RootState) => state?.userReducer?.token) as
    | string
    | null;

  const decodedToken: JwtPayloadData | null = token
    ? jwtDecode<JwtPayloadData>(token)
    : null;

  const isAuthenticated = useAuthenticated();

  if (isAuthenticated) {
    if (decodedToken && decodedToken.roles.includes("ROLE_ADMIN")) {
      redirectPath = "/admin-dashboard";
    } else if (decodedToken) {
      redirectPath = "/dashboard";
    }
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectPath} />
        )
      }
    />
  );
};

export default NonAuthRoute;
