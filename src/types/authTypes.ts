export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  token: string | null;
  name: string | null;
  roles: string[] | null;
  status?: string | null;
  message?: string | null;
  loading?: boolean;
}
