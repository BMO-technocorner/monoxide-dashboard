export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  updatedAt: string;
  createdAt: string;
  token: string;
  tokenExpiredIn: string;
};

export type UserRole = "CLIENT" | "GUARD";
