import { UserProfile } from "./profile";
import { ResponseReport } from "./report";
import { ResponseAddRoom } from "./rooms";

export interface Device {
  id: number;
  ownerId: number;
  roomId: number;
  deviceSyncId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  owner: UserProfile;
  room: ResponseAddRoom;
  deviceSync: DeviceSync;
  reports: ResponseReport[];
}

export type ResponseListDevices = Device[];

export interface DeviceSync {
  id: 1;
  uid: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddDevice {
  name: string;
  uid: string;
  roomId: number;
}

export interface ResponseDeleteDevice {
  message: string;
  data: Device;
}
