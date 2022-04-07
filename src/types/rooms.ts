import { UserProfile } from "./profile";

export interface AddRoom {
  name: string;
}

export interface ResponseAddRoom {
  id: number;
  ownerId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  owner?: UserProfile;
}

export type ResponseListRooms = ResponseAddRoom[];
