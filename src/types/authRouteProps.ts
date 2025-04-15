import { ComponentType } from "react";
import { RouteProps } from "react-router-dom";

export interface AuthRouteProps extends RouteProps {
  component: ComponentType<any>;
  roles: string[];
}
