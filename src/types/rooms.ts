import { UserProfile } from "./profile";

export interface AddRoom {
  name: string;
}

export interface EditRoom {
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

export interface ResponseDeleteRoom {
  message: string;
  data: ResponseAddRoom;
}

export type ResponseListRooms = ResponseAddRoom[];
