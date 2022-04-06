export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  address?: string;
  updatedAt: string;
  createdAt: string;
}

export type UserRole = "CLIENT" | "GUARD";
