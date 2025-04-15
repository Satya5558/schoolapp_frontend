import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import LayoutComponent from "../components/LayoutComponent";
import { useAuthenticated, useAuthroization } from "../hooks/authHook";
import { AuthRouteProps } from "../types/authRouteProps";

const AuthRoute = ({
  component: Component,
  roles,
  ...rest
}: AuthRouteProps) => {
  const isAuthenticated = useAuthenticated();
  const isAuthorized = useAuthroization(roles);
  const history = useHistory();

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (!isAuthorized) {
    return <Redirect to="/unauthorized" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <LayoutComponent>
          <Component {...props} />
        </LayoutComponent>
      )}
    />
  );
};

export default AuthRoute;
