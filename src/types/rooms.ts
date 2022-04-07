import { UserProfile } from "./profile";

export interface Room {
  id: number;
  ownerId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  owner?: UserProfile;
}

export type ResponseListRooms = Room[];
