import { UserRole } from "./profile";

export interface SignIn {
  email: string;
  password: string;
}

export interface ResponseSignIn {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  updatedAt: string;
  createdAt: string;
  token: string;
  tokenExpiredIn: string;
}
