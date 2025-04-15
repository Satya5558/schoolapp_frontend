import { JwtPayload } from "jwt-decode";

export interface JwtPayloadData extends JwtPayload {
  roles: string[];
}
